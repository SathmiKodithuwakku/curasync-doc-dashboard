'use client'

import { useState } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { FriendRequest, TransferRequest, Doctor, Patient } from '@/types'

// Toast notification component
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  return (
    <div className={`fixed bottom-4 right-4 flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white z-50 animate-fadeIn`}>
      <p>{message}</p>
      <button onClick={onClose} className="ml-2 hover:text-gray-200">
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  )
}

// Mock data for doctor friend requests
const initialFriendRequests: FriendRequest[] = [
  {
    id: '1',
    from: {
      id: 'dr-robert',
      name: 'Dr. Robert Smith',
      specialization: 'Orthopedic Surgeon',
      hospital: 'Central Medical Center',
      image: 'https://ui-avatars.com/api/?name=Robert+Smith'
    },
    status: 'pending',
    timestamp: '2024-02-15T10:30:00Z'
  },
  {
    id: '2',
    from: {
      id: 'dr-lisa',
      name: 'Dr. Lisa Anderson',
      specialization: 'Dermatologist',
      hospital: 'Skin Care Clinic',
      image: 'https://ui-avatars.com/api/?name=Lisa+Anderson'
    },
    status: 'pending',
    timestamp: '2024-02-14T15:45:00Z'
  }
]

// Mock data for patient transfer requests
const initialTransferRequests: TransferRequest[] = [
  {
    id: '1',
    patientId: 'p123',
    patientName: 'John Doe',
    fromDoctor: {
      id: 'dr6',
      name: 'Dr. Michael Brown',
      specialization: 'General Practitioner',
      hospital: 'City Hospital'
    },
    reason: 'Requires specialized cardiac care',
    urgency: 'high',
    medicalSummary: 'Patient has a history of cardiac issues and requires immediate specialized care.',
    status: 'pending',
    timestamp: '2024-02-15T09:00:00Z'
  },
  {
    id: '2',
    patientId: 'p124',
    patientName: 'Sarah Wilson',
    fromDoctor: {
      id: 'dr7',
      name: 'Dr. Emma Davis',
      specialization: 'Internal Medicine',
      hospital: 'Medical Center'
    },
    reason: 'Follow-up care for chronic condition',
    urgency: 'medium',
    medicalSummary: 'Patient with diabetes requiring ongoing specialized care and monitoring.',
    status: 'pending',
    timestamp: '2024-02-14T14:30:00Z'
  }
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'doctors' | 'transfers'>('doctors')
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(initialFriendRequests)
  const [transferRequests, setTransferRequests] = useState<TransferRequest[]>(initialTransferRequests)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const pendingFriendRequests = friendRequests.filter(req => req.status === 'pending').length
  const pendingTransferRequests = transferRequests.filter(req => req.status === 'pending').length

  const handleAcceptFriendRequest = (request: FriendRequest) => {
    // Update request status
    setFriendRequests(requests =>
      requests.map(r => r.id === request.id ? { ...r, status: 'accepted' } : r)
    )

    // Add doctor to the network
    const newDoctor: Doctor = {
      id: request.from.id,
      name: request.from.name,
      specialization: request.from.specialization,
      experience: '',
      education: [],
      certifications: [],
      contact: {
        email: '',
        phone: '',
        address: request.from.hospital
      },
      availability: {
        days: [],
        hours: ''
      },
      rating: 0,
      totalPatients: 0
    }

    setDoctors(prev => [...prev, newDoctor])
    
    // Show success notification
    setToast({
      message: `Dr. ${request.from.name} has been added to your network`,
      type: 'success'
    })
  }

  const handleDeclineFriendRequest = (requestId: string) => {
    setFriendRequests(requests =>
      requests.map(r => r.id === requestId ? { ...r, status: 'rejected' } : r)
    )

    // Show error notification
    setToast({
      message: 'Friend request declined',
      type: 'error'
    })
  }

  const handleAcceptTransfer = (request: TransferRequest) => {
    // Update request status
    setTransferRequests(requests =>
      requests.map(r => r.id === request.id ? { ...r, status: 'accepted' } : r)
    )

    // Add patient to your list
    const newPatient: Patient = {
      id: request.patientId,
      patientName: request.patientName,
      patientNumber: '', // This would come from the actual patient data
      gender: 'Male', // This would come from the actual patient data
      lastVisit: new Date().toLocaleDateString(),
      timeOfVisit: new Date().toLocaleTimeString(),
      reason: request.reason,
      priority: request.urgency,
      assignedDoctor: 'dr-james', // Current doctor's ID
      chatEnabled: true,
      unreadMessages: 0
    }

    setPatients(prev => [...prev, newPatient])
    
    // Show success notification
    setToast({
      message: `Patient ${request.patientName} has been added to your patient list`,
      type: 'success'
    })
  }

  const handleDeclineTransfer = (requestId: string) => {
    setTransferRequests(requests =>
      requests.map(r => r.id === requestId ? { ...r, status: 'rejected' } : r)
    )

    // Show error notification
    setToast({
      message: 'Transfer request declined',
      type: 'error'
    })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('doctors')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'doctors'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Doctor Requests
          {pendingFriendRequests > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {pendingFriendRequests}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('transfers')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'transfers'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Transfer Requests
          {pendingTransferRequests > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {pendingTransferRequests}
            </span>
          )}
        </button>
      </div>

      {/* Doctor Requests Tab */}
      {activeTab === 'doctors' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b">
            <h3 className="font-medium">Friend Requests from Doctors</h3>
          </div>
          
          <div className="divide-y">
            {friendRequests.map((request) => (
              <div key={request.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={request.from.image}
                      alt={request.from.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">{request.from.name}</h4>
                      <p className="text-sm text-gray-600">{request.from.specialization}</p>
                      <p className="text-sm text-gray-600">{request.from.hospital}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(request.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  {request.status === 'pending' ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAcceptFriendRequest(request)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        title="Accept"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeclineFriendRequest(request.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Decline"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <span className={`text-sm ${
                      request.status === 'accepted' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {friendRequests.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No friend requests
              </div>
            )}
          </div>
        </div>
      )}

      {/* Transfer Requests Tab */}
      {activeTab === 'transfers' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b">
            <h3 className="font-medium">Patient Transfer Requests</h3>
          </div>
          
          <div className="divide-y">
            {transferRequests.map((request) => (
              <div key={request.id} className="p-4">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{request.patientName}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.urgency === 'high' ? 'bg-red-100 text-red-800' :
                        request.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)} Priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      From: {request.fromDoctor.name} ({request.fromDoctor.specialization})
                    </p>
                    <p className="text-sm text-gray-600">Hospital: {request.fromDoctor.hospital}</p>
                    <p className="text-sm text-gray-600">Reason: {request.reason}</p>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-sm text-gray-600">{request.medicalSummary}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Requested on: {formatDate(request.timestamp)}
                    </p>
                  </div>
                  
                  {request.status === 'pending' ? (
                    <div className="flex items-start space-x-2">
                      <button
                        onClick={() => handleAcceptTransfer(request)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                        title="Accept"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeclineTransfer(request.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Decline"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <span className={`text-sm ${
                      request.status === 'accepted' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {transferRequests.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No transfer requests
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}