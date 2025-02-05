'use client'

import { useState, useEffect } from 'react'
import { Patient, TimelineEntry } from '@/types'
import VerticalTimeline from '@/components/VerticalTimeline'

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
    priority: 'high',
    assignedDoctor: 'dr-james',
    status: 'online'
  },
  '348745': {
    id: '348745',
    patientName: 'Varun P',
    patientNumber: '4782640981',
    gender: 'Male',
    lastVisit: '04/10/2023',
    timeOfVisit: '01:00 pm',
    reason: 'Consultation',
    priority: 'medium',
    assignedDoctor: 'dr-james',
    status: 'offline'
  }
}

const initialEntries: TimelineEntry[] = [
  {
    id: '1',
    date: '2024-02-15T10:30:00Z',
    month: 'February',
    side: 'left' as const,
    type: 'lab-result' as const,
    title: 'Complete Blood Count',
    content: {
      wbc: '10.32 ppm',
      llrc: '56.33 mm/gl',
      unitReading: '22/56'
    },
    document: {
      name: 'cbc_report.pdf',
      url: '#'
    },
    notes: []
  },
  {
    id: '2',
    date: '2024-02-15T09:00:00Z',
    month: '',
    side: 'right' as const,
    type: 'note' as const,
    title: 'Follow-up Consultation',
    content: {
      summary: 'Patient reports improvement in symptoms. Continue current medication regimen.'
    },
    notes: []
  }
]

export default function TimelinePage({ params }: { params: { id: string } }) {
  const [entries, setEntries] = useState<TimelineEntry[]>(initialEntries)
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    // Get patient info based on the ID
    const currentPatient = mockPatients[params.id]
    if (currentPatient) {
      setPatient(currentPatient)
    }
  }, [params.id])

  const handleAddEntry = (newEntry: Partial<TimelineEntry>) => {
    const entry = {
      ...newEntry,
      id: Date.now().toString(),
      notes: []
    } as TimelineEntry

    // Add new entry at the beginning of the array
    setEntries(prev => [entry, ...prev])
  }

  const handleUpdateEntry = (id: string, data: Partial<TimelineEntry>) => {
    setEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, content: { ...entry.content, ...data } } : entry
    ))
  }

  const handleAddNote = (entryId: string, note: any) => {
    setEntries(prev => prev.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          notes: [
            ...entry.notes,
            {
              id: Date.now().toString(),
              ...note,
              timestamp: new Date().toISOString()
            }
          ]
        }
      }
      return entry
    }))
  }

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Patient Info Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center space-x-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patient.patientName)}`}
              alt={patient.patientName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold">{patient.patientName}</h2>
              <p className="text-sm text-gray-600">Patient ID: {patient.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        <VerticalTimeline
          entries={entries}
          onAddEntry={handleAddEntry}
          onUpdateEntry={handleUpdateEntry}
          onAddNote={handleAddNote}
        />
      </div>
    </div>
  )
}