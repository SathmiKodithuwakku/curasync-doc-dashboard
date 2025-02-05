'use client'

import { useState, useEffect } from 'react'
import { Doctor } from '@/types'

interface Message {
  id: string
  text: string
  sender: {
    id: string
    name: string
    role: 'doctor'
    specialization: string
    avatar: string
  } | {
    id: string
    name: string
    role: 'patient'
    avatar: string
  }
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
}

// Mock doctors data - in a real app, this would come from your backend
const mockDoctors: { [key: string]: Doctor } = {
  'dr-sarah': {
    id: 'dr-sarah',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: '12 years',
    education: [],
    certifications: [],
    contact: {
      email: '',
      phone: '',
      address: ''
    },
    availability: {
      days: [],
      hours: ''
    },
    rating: 4.8,
    totalPatients: 1200
  },
  'dr-michael': {
    id: 'dr-michael',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    experience: '15 years',
    education: [],
    certifications: [],
    contact: {
      email: '',
      phone: '',
      address: ''
    },
    availability: {
      days: [],
      hours: ''
    },
    rating: 4.5,
    totalPatients: 1000
  }
}

// Current doctor info (the logged-in doctor)
const currentDoctor: Doctor = {
  id: 'dr-james',
  name: 'Dr. James Martin',
  specialization: 'General Surgeon',
  experience: '15 years',
  education: [],
  certifications: [],
  contact: {
    email: '',
    phone: '',
    address: ''
  },
  availability: {
    days: [],
    hours: ''
  },
  rating: 4.8,
  totalPatients: 1200
}

export default function DoctorChatPage({ params }: { params: { doctorId: string } }) {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [recipientDoctor, setRecipientDoctor] = useState<Doctor | null>(null)

  useEffect(() => {
    // Get recipient doctor info based on the URL parameter
    const doctor = mockDoctors[params.doctorId]
    if (!doctor) return
    
    setRecipientDoctor(doctor)
    
    // Initialize messages
    setMessages([
      {
        id: '1',
        text: 'Hello! How can I help you today?',
        sender: {
          id: doctor.id,
          name: doctor.name,
          role: 'doctor',
          specialization: doctor.specialization,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}`
        },
        timestamp: '09:30 AM',
        status: 'read'
      },
      {
        id: '2',
        text: 'I would like to discuss a patient case with you.',
        sender: {
          id: currentDoctor.id,
          name: currentDoctor.name,
          role: 'doctor',
          specialization: currentDoctor.specialization,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(currentDoctor.name)}`
        },
        timestamp: '09:32 AM',
        status: 'read'
      }
    ])
  }, [params.doctorId])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !recipientDoctor) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: {
        id: currentDoctor.id,
        name: currentDoctor.name,
        role: 'doctor',
        specialization: currentDoctor.specialization,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(currentDoctor.name)}`
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
  }

  if (!recipientDoctor) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Doctor Not Found</h2>
          <p className="text-gray-600">The doctor you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="bg-[#B3E5FC] p-4">
        <div className="flex items-center space-x-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(recipientDoctor.name)}`}
            alt={recipientDoctor.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-gray-800">{recipientDoctor.name}</h2>
            <p className="text-sm text-gray-600">{recipientDoctor.specialization}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FDFF]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender.id === currentDoctor.id ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender.id !== currentDoctor.id && (
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div className={`max-w-[70%] ${message.sender.id !== currentDoctor.id ? 'ml-2' : 'mr-2'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-gray-600">
                  {message.sender.name}
                  {message.sender.role === 'doctor' && (
                    <span className="text-xs text-gray-500 ml-1">
                      ({message.sender.specialization})
                    </span>
                  )}
                </span>
              </div>
              <div className={`rounded-lg px-4 py-2 ${
                message.sender.id === currentDoctor.id
                  ? 'bg-[#B3E5FC] text-gray-800 rounded-br-none'
                  : 'bg-[#E3F2FD] text-gray-800 rounded-bl-none'
              }`}>
                <p>{message.text}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <p className="text-xs text-gray-500">{message.timestamp}</p>
                  {message.sender.id === currentDoctor.id && (
                    <span className="text-xs text-gray-500">
                      {message.status === 'sent' && '✓'}
                      {message.status === 'delivered' && '✓✓'}
                      {message.status === 'read' && <span className="text-blue-500">✓✓</span>}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {message.sender.id === currentDoctor.id && (
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-[#B3E5FC] p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Attach Report
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Message"
            className="flex-1 px-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="p-2 bg-white text-blue-500 rounded-full hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}