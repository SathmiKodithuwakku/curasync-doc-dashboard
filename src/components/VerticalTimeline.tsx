'use client'

import { useState, useRef, useEffect } from 'react'
import { PlusIcon, MagnifyingGlassIcon, CalendarIcon } from '@heroicons/react/24/outline'
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
  const [showTypeSelector, setShowTypeSelector] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const entryRefs = useRef<{ [key: string]: HTMLDivElement }>({})

  // Group entries by month and year
  const groupEntriesByDate = (entries: TimelineEntry[]) => {
    const groups: { [key: string]: TimelineEntry[] } = {}
    
    entries.forEach(entry => {
      const date = new Date(entry.date)
      const key = `${date.getFullYear()}-${date.getMonth()}`
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(entry)
    })

    return Object.entries(groups)
      .sort(([keyA], [keyB]) => keyB.localeCompare(keyA))
      .map(([key, groupEntries]) => ({
        date: key,
        entries: groupEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }))
  }

  // Filter entries by text and date
  const filteredAndGroupedEntries = groupEntriesByDate(
    entries.filter(entry => {
      const matchesText = searchTerm ? (
        entry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content?.specialInstructions?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content?.medicines?.some(med => 
          med.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) : true

      const matchesDate = searchDate ? (
        new Date(entry.date).toLocaleDateString() === new Date(searchDate).toLocaleDateString()
      ) : true

      return matchesText && matchesDate
    })
  )

  const formatMonthYear = (dateKey: string) => {
    const [year, month] = dateKey.split('-')
    const date = new Date(parseInt(year), parseInt(month))
    return date.toLocaleString('default', { 
      month: 'long',
      year: 'numeric',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('default', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
  }

  // Scroll to entry by date
  const scrollToDate = (date: string) => {
    const targetDate = new Date(date).toLocaleDateString()
    
    // Find the first entry matching the date
    const targetEntry = entries.find(entry => 
      new Date(entry.date).toLocaleDateString() === targetDate
    )

    if (targetEntry && entryRefs.current[targetEntry.id]) {
      entryRefs.current[targetEntry.id].scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSearchDate(date)
    setShowDatePicker(false)
    scrollToDate(date)
  }

  const handleAddEntry = (type: 'note' | 'prescription' | 'lab-result') => {
    onAddEntry?.({
      type,
      title: type === 'prescription' ? 'New Prescription' : 'New Entry',
      date: new Date().toISOString(),
      side: entries.length % 2 === 0 ? 'left' : 'right',
      content: type === 'prescription' ? {
        medicines: [],
        specialInstructions: ''
      } : {}
    })
    setShowTypeSelector(false)

    // Scroll to top after adding new entry
    setTimeout(() => {
      if (timelineRef.current) {
        timelineRef.current.scrollTop = 0
      }
    }, 100)
  }

  // Update center line height when content changes
  useEffect(() => {
    if (contentRef.current && timelineRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      const containerHeight = timelineRef.current.clientHeight
      const centerLine = timelineRef.current.querySelector('.center-line') as HTMLElement
      if (centerLine) {
        centerLine.style.height = `${Math.max(contentHeight, containerHeight)}px`
      }
    }
  }, [entries, filteredAndGroupedEntries])

  return (
    <div className="relative h-screen flex flex-col p-6">
      {/* Fixed search bar and add button at the top */}
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-gray-50 z-20 pb-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-96">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search timeline entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <span>{searchDate ? new Date(searchDate).toLocaleDateString() : 'Select Date'}</span>
            </button>

            {showDatePicker && (
              <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg border p-4 z-30">
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => handleDateSelect(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
          </div>

          {searchDate && (
            <button
              onClick={() => setSearchDate('')}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear Date
            </button>
          )}
        </div>

        <div>
          {showTypeSelector ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleAddEntry('note')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Note
              </button>
              <button
                onClick={() => handleAddEntry('prescription')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Prescription
              </button>
              <button
                onClick={() => handleAddEntry('lab-result')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Add Lab Result
              </button>
              <button
                onClick={() => setShowTypeSelector(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowTypeSelector(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add New Entry</span>
            </button>
          )}
        </div>
      </div>

      {/* Timeline content */}
      <div 
        ref={timelineRef}
        className="flex-1 overflow-y-auto relative scroll-smooth"
        style={{ height: 'calc(100vh - 8rem)' }}
      >
        {/* Central timeline */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 transform -translate-x-1/2 center-line" />

        {/* Timeline entries */}
        <div ref={contentRef} className="relative min-h-full pb-16">
          {filteredAndGroupedEntries.map(({ date, entries: groupEntries }) => (
            <div key={date} className="mb-8">
              {/* Month-Year marker */}
              <div className="relative z-10 mb-8">
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                    {formatMonthYear(date)}
                  </div>
                </div>
              </div>
              
              {groupEntries.map((entry) => (
                <div 
                  key={entry.id} 
                  className="mb-16"
                  ref={el => {
                    if (el) entryRefs.current[entry.id] = el
                  }}
                >
                  <TimelineTile
                    {...entry}
                    date={formatDate(entry.date)}
                    onSave={(data) => onUpdateEntry?.(entry.id, data)}
                    onAddNote={(note) => onAddNote?.(entry.id, note)}
                  />
                </div>
              ))}
            </div>
          ))}

          {filteredAndGroupedEntries.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              No entries found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  )
}