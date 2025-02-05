'use client'

import { useState } from 'react'
import VerticalTimeline from '@/components/VerticalTimeline'
import { TimelineEntry } from '@/types'

const initialEntries = [
  {
    id: '1',
    date: '11/10/2024',
    month: 'October',
    side: 'left' as const,
    type: 'note' as const,
    notes: []
  },
  {
    id: '2',
    date: '11/10/2024',
    month: '',
    side: 'right' as const,
    type: 'lab-result' as const,
    title: 'Full Blood Count',
    content: {
      wbc: '10.32 ppm',
      llrc: '56.33 mm/gl',
      unitReading: '22/56'
    },
    document: {
      name: 'report21.pdf',
      url: '#'
    },
    notes: []
  },
  {
    id: '3',
    date: '11/10/2024',
    month: 'November',
    side: 'left' as const,
    type: 'note' as const,
    notes: []
  },
  {
    id: '4',
    date: '11/10/2024',
    month: '',
    side: 'right' as const,
    type: 'lab-result' as const,
    notes: []
  }
]

export default function TimelinePage() {
  const [entries, setEntries] = useState(initialEntries)

  const handleAddEntry = (newEntry: Partial<TimelineEntry>) => {
    setEntries(prev => [...prev, {
      ...newEntry,
      id: Date.now().toString(),
      notes: []
    } as TimelineEntry])
  }

  const handleUpdateEntry = (id: string, data: Partial<TimelineEntry>) => {
    setEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, ...data } : entry
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center space-x-4">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt="Dr. John Doe"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold">Dr. John Doe</h2>
              <p className="text-sm text-gray-600">Surgeon</p>
            </div>
          </div>
          <h1 className="text-xl font-semibold">My Timeline</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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