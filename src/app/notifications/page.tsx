'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FriendRequest } from '@/types'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const initialRequests: FriendRequest[] = [
  {
    id: '1',
    from: {
      id: '4',
      name: 'Dr. Robert Smith',
      specialization: 'Orthopedic Surgeon',
      image: 'https://ui-avatars.com/api/?name=Robert+Smith'
    },
    status: 'pending',
    timestamp: '2024-02-15T10:30:00Z'
  },
  {
    id: '2',
    from: {
      id: '5',
      name: 'Dr. Lisa Anderson',
      specialization: 'Dermatologist',
      image: 'https://ui-avatars.com/api/?name=Lisa+Anderson'
    },
    status: 'pending',
    timestamp: '2024-02-14T15:45:00Z'
  }
]

export default function NotificationsPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<FriendRequest[]>(initialRequests)

  const handleAccept = (request: FriendRequest) => {
    setRequests(requests.map(r =>
      r.id === request.id
        ? { ...r, status: 'accepted' as const }
        : r
    ))
    
    // Add the doctor to your friends list
    const newDoctor = {
      id: request.from.id,
      name: request.from.name,
      specialization: request.from.specialization,
      image: request.from.image,
      isFriend: true
    }
    
    // Here you would typically update your friends list in the backend
    alert(`${request.from.name} has been added to your friends list!`)
  }

  const handleReject = (requestId: string) => {
    setRequests(requests.map(request =>
      request.id === requestId
        ? { ...request, status: 'rejected' as const }
        : request
    ))
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
      
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-3 border-b">
          <h3 className="font-medium">Friend Requests</h3>
        </div>
        
        <div className="divide-y">
          {requests.map((request) => (
            <div key={request.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={request.from.image}
                  alt={request.from.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{request.from.name}</h4>
                  <p className="text-sm text-gray-600">{request.from.specialization}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(request.timestamp)}
                  </p>
                </div>
              </div>
              
              {request.status === 'pending' ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAccept(request)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    title="Accept"
                  >
                    <CheckIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Reject"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <span className={`text-sm ${
                  request.status === 'accepted' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {request.status === 'accepted' ? 'Accepted' : 'Rejected'}
                </span>
              )}
            </div>
          ))}
          
          {requests.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No friend requests
            </div>
          )}
        </div>
      </div>
    </div>
  )
}