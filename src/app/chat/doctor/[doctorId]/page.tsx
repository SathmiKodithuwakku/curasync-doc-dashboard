'use client'

import { useState } from 'react'
import { Doctor } from '@/types'

interface Message {
  id: string
  text: string
  sender: 'me' | 'doctor'
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
}

export default function DoctorChatPage({ params }: { params: { doctorId: string } }) {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'doctor',
      timestamp: '09:30 AM',
      status: 'read'
    },
    {
      id: '2',
      text: 'I would like to discuss a patient case with you.',
      sender: 'me',
      timestamp: '09:32 AM',
      status: 'read'
    }
  ])

  // Mock doctor data - in a real app, fetch this based on doctorId
  const doctor: Doctor = {
    id: params.doctorId,
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
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b p-4 flex items-center space-x-4">
        <img
          src={`https://ui-avatars.com/api/?name=${doctor.name}`}
          alt={doctor.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-lg">{doctor.name}</h2>
          <p className="text-gray-600 text-sm">{doctor.specialization}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === 'me'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <span className="text-xs opacity-75">{message.timestamp}</span>
                {message.sender === 'me' && (
                  <span className="text-xs opacity-75">
                    {message.status === 'sent' && '✓'}
                    {message.status === 'delivered' && '✓✓'}
                    {message.status === 'read' && <span className="text-blue-200">✓✓</span>}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="bg-white border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white rounded-full p-2 hover:bg-primary/90"
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
        </div>
      </form>
    </div>
  )
}