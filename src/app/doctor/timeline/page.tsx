'use client'

import { useState } from 'react'
import { Doctor } from '@/types'
import { PlusIcon, ChatBubbleLeftIcon, TagIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'note' | 'prescription' | 'report' | 'chat'
  tags?: string[]
  attachments?: {
    name: string
    url: string
  }[]
}

export default function DoctorTimelinePage() {
  const [doctor] = useState<Doctor>({
    id: "dr-james",
    name: "Dr. James Martin",
    specialization: "General Surgeon",
    experience: "15+ years",
    education: [],
    certifications: [],
    contact: {
      email: "",
      phone: "",
      address: ""
    },
    availability: {
      days: [],
      hours: ""
    },
    rating: 4.8,
    totalPatients: 1500,
    patients: []
  })

  const [events] = useState<TimelineEvent[]>([
    {
      id: '1',
      date: '2024-02-15',
      title: 'Patient Consultation - John Doe',
      description: 'Regular checkup. Patient reported mild fever.',
      type: 'note',
      tags: ['Follow-up', 'Fever']
    },
    {
      id: '2',
      date: '2024-02-15',
      title: 'Prescription Update - Sarah Smith',
      description: 'Updated blood pressure medication dosage.',
      type: 'prescription',
      attachments: [
        {
          name: 'prescription.pdf',
          url: '#'
        }
      ]
    },
    {
      id: '3',
      date: '2024-02-14',
      title: 'Lab Results Review - Mike Johnson',
      description: 'Blood test results analysis completed.',
      type: 'report',
      tags: ['Urgent', 'Lab Results'],
      attachments: [
        {
          name: 'lab_results.pdf',
          url: '#'
        }
      ]
    }
  ])

  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState({
    title: '',
    description: '',
    tags: [] as string[]
  })

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the note to your backend
    setIsAddingNote(false)
    setNewNote({ title: '', description: '', tags: [] })
  }

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'note':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <DocumentTextIcon className="h-5 w-5 text-blue-500" />
          </div>
        )
      case 'prescription':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )
      case 'report':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )
      case 'chat':
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <ChatBubbleLeftIcon className="h-5 w-5 text-yellow-500" />
          </div>
        )
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{doctor.name}'s Timeline</h1>
          <p className="text-gray-600">Track your activities and patient interactions</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsAddingNote(true)}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Add Note Form */}
        {isAddingNote && (
          <div className="relative pl-12 mb-8">
            <div className="absolute left-0 top-0">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <PlusIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <form onSubmit={handleAddNote}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newNote.description}
                    onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNote(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Timeline events */}
        <div className="space-y-8">
          {events.map((event) => (
            <div key={event.id} className="relative pl-12">
              {/* Event dot */}
              <div className="absolute left-0 top-0">
                {getEventIcon(event.type)}
              </div>

              {/* Event content */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.type === 'note' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'prescription' ? 'bg-green-100 text-green-800' :
                    event.type === 'report' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>

                <p className="text-gray-600">{event.description}</p>

                {event.tags && event.tags.length > 0 && (
                  <div className="mt-3 flex items-center space-x-2">
                    <TagIcon className="h-5 w-5 text-gray-400" />
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {event.attachments && event.attachments.length > 0 && (
                  <div className="mt-3 flex items-center space-x-2">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    {event.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        className="text-primary hover:text-primary/80 text-sm"
                      >
                        {attachment.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}