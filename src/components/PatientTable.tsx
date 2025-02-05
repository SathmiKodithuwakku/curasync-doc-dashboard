'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChatBubbleLeftIcon, MagnifyingGlassIcon, ClockIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'
import { Patient, ChatPermissionLog } from '@/types'
import SearchPatientModal from './SearchPatientModal'
import TransferPatientModal from './TransferPatientModal'

const patients: Patient[] = [
  {
    id: '876364',
    patientName: 'Nithya kumar',
    patientNumber: '4782640981',
    gender: 'Female',
    lastVisit: '04/10/2023',
    timeOfVisit: '02:00pm',
    reason: 'Monthly checkup',
    priority: 'high',
    assignedDoctor: 'dr-james',
    chatEnabled: true,
    unreadMessages: 1
  },
  {
    id: '348745',
    patientName: 'Varun P',
    patientNumber: '4782640981',
    gender: 'Male',
    lastVisit: '04/10/2023',
    timeOfVisit: '01:00 pm',
    reason: 'Consultation',
    priority: 'medium',
    assignedDoctor: 'dr-james',
    chatEnabled: false,
    unreadMessages: 0
  }
]

export default function PatientTable() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGender, setFilterGender] = useState<'all' | 'Male' | 'Female'>('all')
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'priority' | 'lastVisit'>('priority')
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patientsList, setPatientsList] = useState<Patient[]>(patients)
  const [chatLogs, setChatLogs] = useState<ChatPermissionLog[]>([])

  const handleChatClick = (patientId: string) => {
    const patient = patientsList.find(p => p.id === patientId)
    if (!patient?.chatEnabled) {
      alert('Chat is disabled for this patient')
      return
    }

    // Clear unread messages count when opening chat
    setPatientsList(prev => prev.map(p => 
      p.id === patientId 
        ? { ...p, unreadMessages: 0 }
        : p
    ))

    router.push(`/chat/${patientId}`)
  }

  const handleTimelineClick = (patientId: string) => {
    router.push(`/patient/${patientId}/timeline`)
  }

  const handleTransferClick = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsTransferModalOpen(true)
  }

  const handleInvitePatient = (patientNumber: string) => {
    alert(`Invitation sent to patient with number: ${patientNumber}`)
    setIsSearchModalOpen(false)
  }

  const handleTransferPatient = (doctorId: string) => {
    if (!selectedPatient) return
    alert(`Transfer request sent for patient ${selectedPatient.patientName} to doctor ${doctorId}`)
    setIsTransferModalOpen(false)
    setSelectedPatient(null)
  }

  const handleToggleChat = (patient: Patient) => {
    const newStatus = !patient.chatEnabled
    
    if (!confirm(`Are you sure you want to ${newStatus ? 'enable' : 'disable'} chat for ${patient.patientName}?`)) {
      return
    }

    setPatientsList(patients =>
      patients.map(p =>
        p.id === patient.id
          ? { ...p, chatEnabled: newStatus }
          : p
      )
    )

    const log: ChatPermissionLog = {
      id: Date.now().toString(),
      patientId: patient.id,
      patientName: patient.patientName,
      enabled: newStatus,
      timestamp: new Date().toISOString(),
      changedBy: {
        id: 'dr-james',
        name: 'Dr. James Martin'
      }
    }
    setChatLogs(prev => [log, ...prev])

    alert(`Chat ${newStatus ? 'enabled' : 'disabled'} for ${patient.patientName}`)
  }

  const sortedAndFilteredPatients = patientsList
    .filter(patient => {
      const matchesSearch = 
        patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.patientNumber.includes(searchTerm)
      
      const matchesGender = filterGender === 'all' || patient.gender === filterGender
      const matchesPriority = filterPriority === 'all' || patient.priority === filterPriority
      
      return matchesSearch && matchesGender && matchesPriority
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.patientName.localeCompare(b.patientName)
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case 'lastVisit':
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
        default:
          return 0
      }
    })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          Add New Patient
        </button>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search by name or number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 border rounded-lg bg-white focus:outline-none focus:border-primary"
            />
          </div>
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value as 'all' | 'Male' | 'Female')}
            className="p-2 border rounded-lg bg-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as 'all' | 'high' | 'medium' | 'low')}
            className="p-2 border rounded-lg bg-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'priority' | 'lastVisit')}
            className="p-2 border rounded-lg bg-white focus:outline-none focus:border-primary"
          >
            <option value="priority">Sort by Priority</option>
            <option value="name">Sort by Name</option>
            <option value="lastVisit">Sort by Last Visit</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="p-4 font-medium">Priority</th>
              <th className="p-4 font-medium">Patient Name</th>
              <th className="p-4 font-medium">Patient Number</th>
              <th className="p-4 font-medium">Gender</th>
              <th className="p-4 font-medium">Last Visit</th>
              <th className="p-4 font-medium">Time of Visit</th>
              <th className="p-4 font-medium">Reason</th>
              <th className="p-4 font-medium">Chat Status</th>
              <th className="p-4 font-medium">Profile</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedAndFilteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    patient.priority === 'high' ? 'bg-red-100 text-red-800' :
                    patient.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {patient.priority.charAt(0).toUpperCase() + patient.priority.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${patient.patientName}&size=32`}
                      alt={patient.patientName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-900">{patient.patientName}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">{patient.patientNumber}</td>
                <td className="p-4 text-gray-600">{patient.gender}</td>
                <td className="p-4 text-gray-600">{patient.lastVisit}</td>
                <td className="p-4 text-gray-600">{patient.timeOfVisit}</td>
                <td className="p-4 text-gray-600">{patient.reason}</td>
                <td className="p-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={patient.chatEnabled}
                      onChange={() => handleToggleChat(patient)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    <span className={`ml-3 text-sm font-medium ${patient.chatEnabled ? 'text-green-600' : 'text-red-600'}`}>
                      {patient.chatEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </td>
                <td className="p-4">
                  <Link
                    href={`/patient/${patient.id}`}
                    className="inline-flex items-center px-3 py-1 text-sm text-primary border border-primary rounded-full hover:bg-primary/10"
                  >
                    View Profile
                  </Link>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <button 
                      className={`text-gray-600 transition-colors relative ${
                        patient.chatEnabled ? 'hover:text-primary' : 'opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => handleChatClick(patient.id)}
                      title={patient.chatEnabled ? 'Chat with patient' : 'Chat is disabled'}
                      disabled={!patient.chatEnabled}
                    >
                      <ChatBubbleLeftIcon className="h-6 w-6" />
                      {patient.unreadMessages > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {patient.unreadMessages}
                        </span>
                      )}
                    </button>
                    <button 
                      className="text-gray-600 hover:text-primary transition-colors"
                      onClick={() => handleTimelineClick(patient.id)}
                      title="View timeline"
                    >
                      <ClockIcon className="h-6 w-6" />
                    </button>
                    <button 
                      className="text-gray-600 hover:text-primary transition-colors"
                      onClick={() => handleTransferClick(patient)}
                      title="Transfer patient"
                    >
                      <ArrowPathRoundedSquareIcon className="h-6 w-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SearchPatientModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onInvite={handleInvitePatient}
      />

      <TransferPatientModal
        isOpen={isTransferModalOpen}
        onClose={() => {
          setIsTransferModalOpen(false)
          setSelectedPatient(null)
        }}
        onTransfer={handleTransferPatient}
        patient={selectedPatient}
      />
    </div>
  )
}