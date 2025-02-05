'use client'

import { useState, useEffect, useRef } from 'react'
import { Patient } from '@/types'

interface Message {
  id: string
  text: string
  sender: {
    id: string
    name: string
    role: 'doctor' | 'patient'
    specialization?: string
    avatar: string
  }
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
  attachments?: string[]
}

interface ChatProps {
  patientId: string
}

// Mock patients data - in a real app, this would come from your backend
const mockPatients: { [key: string]: Patient } = {
  '876364': {
    id: '876364',
    patientName: 'Nithya Kumar',
    patientNumber: '4782640981',
    gender: 'Female',
    lastVisit: '04/10/2023',
    timeOfVisit: '02:00pm',
    reason: 'Monthly checkup',
    status: 'online',
    unreadMessages: 1
  },
  '348745': {
    id: '348745',
    patientName: 'Varun P',
    patientNumber: '4782640981',
    gender: 'Male',
    lastVisit: '04/10/2023',
    timeOfVisit: '01:00 pm',
    reason: 'Consultation',
    status: 'offline',
    unreadMessages: 0
  }
}

export default function Chat({ patientId }: ChatProps) {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [patient, setPatient] = useState<Patient | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'patient' | 'doctor'>('all')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Current doctor info
  const currentDoctor = {
    id: 'dr-james',
    name: 'Dr. James Martin',
    specialization: 'General Surgeon',
    avatar: 'https://ui-avatars.com/api/?name=James+Martin'
  }

  useEffect(() => {
    // Get patient info based on the patientId
    const currentPatient = mockPatients[patientId]
    if (!currentPatient) return
    
    setPatient(currentPatient)
    
    // Initialize messages
    setMessages([
      {
        id: '1',
        text: 'Blood pressure report.',
        sender: {
          id: currentPatient.id,
          name: currentPatient.patientName,
          role: 'patient',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(currentPatient.patientName)}`
        },
        timestamp: '12:04',
        status: 'read'
      },
      {
        id: '2',
        text: 'Thank you, I will review it.',
        sender: {
          id: currentDoctor.id,
          name: currentDoctor.name,
          role: 'doctor',
          specialization: currentDoctor.specialization,
          avatar: currentDoctor.avatar
        },
        timestamp: '12:45',
        status: 'read'
      }
    ])

    // Mark messages as read when opening the chat
    if (currentPatient.unreadMessages > 0) {
      currentPatient.unreadMessages = 0
    }
  }, [patientId])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !patient) return

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: {
        id: currentDoctor.id,
        name: currentDoctor.name,
        role: 'doctor',
        specialization: currentDoctor.specialization,
        avatar: currentDoctor.avatar
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const filteredMessages = messages.filter(message => {
    if (activeTab === 'all') return true
    if (activeTab === 'patient') return message.sender.role === 'patient'
    if (activeTab === 'doctor') return message.sender.role === 'doctor'
    return true
  })

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Patient Not Found</h2>
          <p className="text-gray-600">The patient you're looking for doesn't exist.</p>
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
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patient.patientName)}`}
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

        {/* Message Filter Tabs */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-primary'
                : 'text-gray-600 hover:bg-white/10'
            }`}
          >
            All Messages
          </button>
          <button
            onClick={() => setActiveTab('patient')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'patient'
                ? 'bg-white text-primary'
                : 'text-gray-600 hover:bg-white/10'
            }`}
          >
            Patient Messages
          </button>
          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'doctor'
                ? 'bg-white text-primary'
                : 'text-gray-600 hover:bg-white/10'
            }`}
          >
            Doctor Messages
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FDFF]">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender.role === 'doctor' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender.role === 'patient' && (
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div className={`max-w-[70%] ${message.sender.role === 'patient' ? 'ml-2' : 'mr-2'}`}>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-gray-600">
                  {message.sender.name}
                  {message.sender.role === 'doctor' && message.sender.specialization && (
                    <span className="text-xs text-gray-500 ml-1">
                      ({message.sender.specialization})
                    </span>
                  )}
                </span>
              </div>
              <div className={`rounded-lg px-4 py-2 ${
                message.sender.role === 'doctor'
                  ? 'bg-[#B3E5FC] text-gray-800 rounded-br-none'
                  : 'bg-[#E3F2FD] text-gray-800 rounded-bl-none'
              }`}>
                <p>{message.text}</p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <p className="text-xs text-gray-500">{message.timestamp}</p>
                  {message.sender.role === 'doctor' && (
                    <span className="text-xs text-gray-500">
                      {message.status === 'sent' && '✓'}
                      {message.status === 'delivered' && '✓✓'}
                      {message.status === 'read' && <span className="text-blue-500">✓✓</span>}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {message.sender.role === 'doctor' && (
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
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