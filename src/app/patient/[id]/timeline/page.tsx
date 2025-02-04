'use client'

import { useState } from 'react'
import { Patient } from '@/types'

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'appointment' | 'test' | 'prescription' | 'note'
  attachments?: {
    name: string
    url: string
  }[]
}

export default function PatientTimelinePage({ params }: { params: { id: string } }) {
  // Mock patient data - in a real app, fetch this based on the ID
  const patient: Patient = {
    id: params.id,
    patientName: 'Nithya Kumar',
    patientNumber: '4782640981',
    gender: 'Female',
    lastVisit: '04/10/2023',
    timeOfVisit: '02:00pm',
    reason: 'Monthly checkup'
  }

  // Mock timeline events - in a real app, fetch these from your backend
  const [events] = useState<TimelineEvent[]>([
    {
      id: '1',
      date: '2024-02-15',
      title: 'Full Blood Count',
      description: 'WBC - 10.32 ppm\nLLRC - 56.33 mm/gl\nUnit Reading - 22/56',
      type: 'test',
      attachments: [
        {
          name: 'report21.pdf',
          url: '#'
        }
      ]
    },
    {
      id: '2',
      date: '2024-02-10',
      title: 'Regular Checkup',
      description: 'Patient reported mild fever and cough. Prescribed antibiotics.',
      type: 'appointment'
    },
    {
      id: '3',
      date: '2024-02-01',
      title: 'Prescription Update',
      description: 'Updated daily medication dosage.',
      type: 'prescription'
    }
  ])

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'appointment':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )
      case 'test':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        )
      case 'prescription':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{patient.patientName}'s Timeline</h1>
        <p className="text-gray-600">Patient ID: {patient.id}</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

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
                    event.type === 'appointment' ? 'bg-blue-100 text-blue-800' :
                    event.type === 'test' ? 'bg-green-100 text-green-800' :
                    event.type === 'prescription' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>

                <p className="text-gray-600 whitespace-pre-line">{event.description}</p>

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