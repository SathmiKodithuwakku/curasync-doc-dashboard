'use client'

import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import TimelineTile from './TimelineTile'
import { TimelineEntry } from '@/types'

interface VerticalTimelineProps {
  entries: TimelineEntry[]
  onAddEntry?: (entry: Partial<TimelineEntry>) => void
  onUpdateEntry?: (id: string, data: Partial<TimelineEntry>) => void
  onAddNote?: (entryId: string, note: any) => void
}

export default function VerticalTimeline({
  entries,
  onAddEntry,
  onUpdateEntry,
  onAddNote
}: VerticalTimelineProps) {
  const handleAddEntry = () => {
    onAddEntry?.({
      type: 'note',
      title: 'New Entry',
      date: new Date().toISOString(),
      side: entries.length % 2 === 0 ? 'left' : 'right'
    })
  }

  return (
    <div className="relative min-h-screen p-6">
      {/* Central timeline */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 transform -translate-x-1/2" />

      {/* Timeline content */}
      <div className="relative">
        {entries.map((entry, index) => (
          <div key={entry.id} className="mb-8">
            {/* Month marker */}
            {entry.month && (
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                  {entry.month}
                </div>
              </div>
            )}

            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />

            <TimelineTile
              {...entry}
              onSave={(data) => onUpdateEntry?.(entry.id, data)}
              onAddNote={(note) => onAddNote?.(entry.id, note)}
            />
          </div>
        ))}

        {/* Add new entry button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleAddEntry}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New Entry</span>
          </button>
        </div>
      </div>
    </div>
  )
}