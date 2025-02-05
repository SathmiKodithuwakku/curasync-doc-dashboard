'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChatBubbleLeftIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import SearchDoctorModal from '@/components/SearchDoctorModal'

interface Doctor {
  id: string
  name: string
  specialization: string
  experience: string
  patients: number
  status: 'online' | 'offline'
  image: string
  isFriend?: boolean
}

// Initial doctors list - using the same IDs as in the chat component
const initialDoctors: Doctor[] = [
  {
    id: 'dr-sarah',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: '12 years',
    patients: 1200,
    status: 'online',
    image: 'https://ui-avatars.com/api/?name=Sarah+Johnson'
  },
  {
    id: 'dr-michael',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    experience: '15 years',
    patients: 1500,
    status: 'offline',
    image: 'https://ui-avatars.com/api/?name=Michael+Chen',
    isFriend: true
  }
]

export default function DoctorsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [doctors, setDoctors] = useState(initialDoctors)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendFriendRequest = (doctorId: string) => {
    alert('Friend request sent!')
  }

  const handleChat = (doctorId: string) => {
    router.push(`/chat/doctor/${doctorId}`)
  }

  const handleSearchDoctorRequest = (doctorId: string) => {
    alert(`Friend request sent to doctor with ID: ${doctorId}`)
    setIsSearchModalOpen(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Doctors</h2>
        <div className="flex space-x-4">
          <input
            type="search"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Add New Doctor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialization}</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-gray-600">Experience: {doctor.experience}</p>
              <p className="text-gray-600">Patients: {doctor.patients}</p>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${doctor.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-gray-600">{doctor.status}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => router.push(`/doctor/${doctor.id}`)}
                className="text-primary hover:text-primary/80"
              >
                View Profile
              </button>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleChat(doctor.id)}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <ChatBubbleLeftIcon className="h-6 w-6" />
                </button>
                {!doctor.isFriend && (
                  <button 
                    onClick={() => handleSendFriendRequest(doctor.id)}
                    className="text-gray-600 hover:text-primary transition-colors"
                    title="Send friend request"
                  >
                    <UserPlusIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SearchDoctorModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSendRequest={handleSearchDoctorRequest}
      />
    </div>
  )
}