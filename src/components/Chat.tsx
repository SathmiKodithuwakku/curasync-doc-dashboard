'use client'

import { useState } from 'react'
import { Patient } from '@/types'

interface Message {
  id: string
  text: string
  sender: 'doctor' | 'patient'
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  attachments?: string[]
}

interface ChatProps {
  patientId: string
}

export default function Chat({ patientId }: ChatProps) {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Blood pleasure report.',
      sender: 'patient',
      timestamp: '12:04',
      status: 'read'
    },
    {
      id: '2',
      text: 'Thank You.',
      sender: 'doctor',
      timestamp: '12:45',
      status: 'read'
    }
  ])

  // Simulated patient data - in real app, fetch this based on patientId
  const patient: Patient = {
    visitNo: `#${patientId}`,
    patientName: 'Nina Conner',
    patientNumber: '4782640981',
    gender: 'Female',
    lastVisit: '04/10/2023',
    timeOfVisit: '02:00pm',
    reason: 'Monthly checkup',
    status: 'online'
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'doctor',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="bg-[#B3E5FC] p-4">
        <div className="flex items-center space-x-3">
          <img
            src={`https://ui-avatars.com/api/?name=${patient.patientName}`}
            alt={patient.patientName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-gray-800">{patient.patientName}</h2>
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${patient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              <p className="text-sm text-gray-600">{patient.status === 'online' ? 'Online' : 'Offline'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FDFF]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender === 'doctor'
                  ? 'bg-[#B3E5FC] text-gray-800 rounded-br-none'
                  : 'bg-[#E3F2FD] text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <p className="text-xs text-gray-500">{message.timestamp}</p>
                {message.sender === 'doctor' && (
                  <span className="text-xs text-gray-500">
                    {message.status === 'sent' && '✓'}
                    {message.status === 'delivered' && '✓✓'}
                    {message.status === 'read' && <span className="text-blue-500">✓✓</span>}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input - Fixed at bottom */}
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