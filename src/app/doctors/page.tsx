'use client'

import { useState } from 'react'
import { ChatBubbleLeftIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

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

// Initial doctors list
const initialDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: '12 years',
    patients: 1200,
    status: 'online',
    image: 'https://ui-avatars.com/api/?name=Sarah+Johnson'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    experience: '15 years',
    patients: 1500,
    status: 'offline',
    image: 'https://ui-avatars.com/api/?name=Michael+Chen',
    isFriend: true
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialization: 'Pediatrician',
    experience: '8 years',
    patients: 900,
    status: 'online',
    image: 'https://ui-avatars.com/api/?name=Emily+Williams'
  }
]

export default function DoctorsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [doctors, setDoctors] = useState(initialDoctors)

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Doctors</h2>
        <input
          type="search"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary"
        />
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
                  className="text-gray-600 hover:text-primary"
                >
                  <ChatBubbleLeftIcon className="h-6 w-6" />
                </button>
                {!doctor.isFriend && (
                  <button
                    onClick={() => handleSendFriendRequest(doctor.id)}
                    className="text-gray-600 hover:text-primary"
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
    </div>
  )
}