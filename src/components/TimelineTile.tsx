'use client'

import { useState } from 'react'
import { DocumentIcon, EyeIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface Note {
  id: string
  content: string
  type: 'general' | 'restricted'
  author: {
    id: string
    name: string
    role: 'doctor' | 'staff'
  }
  timestamp: string
}

interface TimelineTileProps {
  id: string
  date: string
  side: 'left' | 'right'
  type: 'note' | 'lab-result'
  title?: string
  content?: {
    wbc?: string
    llrc?: string
    unitReading?: string
  }
  document?: {
    name: string
    url: string
  }
  notes?: Note[]
  onSave?: (data: any) => void
  onAddNote?: (note: Omit<Note, 'id' | 'timestamp'>) => void
}

export default function TimelineTile({
  id,
  date,
  side,
  type,
  title,
  content,
  document,
  notes = [],
  onAddNote
}: TimelineTileProps) {
  const [newNote, setNewNote] = useState('')
  const [noteType, setNoteType] = useState<'general' | 'restricted'>('general')
  const [activeTab, setActiveTab] = useState<'details' | 'notes'>('details')
  const [showPdfModal, setShowPdfModal] = useState(false)

  const handleAddNote = () => {
    if (!newNote.trim()) return

    onAddNote?.({
      content: newNote,
      type: noteType,
      author: {
        id: 'current-doctor-id',
        name: 'Dr. John Doe',
        role: 'doctor'
      }
    })

    setNewNote('')
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      <div className={`flex ${side === 'left' ? 'justify-end pr-8' : 'justify-start pl-8'} items-center`}>
        <div className={`relative w-[400px] rounded-lg shadow-md ${
          type === 'lab-result' ? 'bg-red-200' : 'bg-blue-200'
        }`}>
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                activeTab === 'details'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                activeTab === 'notes'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'details' ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{title}</h3>
                </div>

                {type === 'lab-result' && (
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-3 space-y-2">
                      <p className="text-sm flex justify-between">
                        <span className="text-gray-700">WBC:</span>
                        <span className="font-medium">{content?.wbc}</span>
                      </p>
                      <p className="text-sm flex justify-between">
                        <span className="text-gray-700">LLRC:</span>
                        <span className="font-medium">{content?.llrc}</span>
                      </p>
                      <p className="text-sm flex justify-between">
                        <span className="text-gray-700">Unit Reading:</span>
                        <span className="font-medium">{content?.unitReading}</span>
                      </p>
                    </div>

                    {document && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <DocumentIcon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm">{document.name}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setShowPdfModal(true)}
                            className="text-xs bg-white px-2 py-1 rounded border hover:bg-gray-50"
                          >
                            View
                          </button>
                          <a
                            href={document.url}
                            download={document.name}
                            className="text-xs bg-white px-2 py-1 rounded border hover:bg-gray-50"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                {/* Add new note */}
                <div className="space-y-2">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full px-3 py-2 rounded border resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <select
                      value={noteType}
                      onChange={(e) => setNoteType(e.target.value as 'general' | 'restricted')}
                      className="text-sm border rounded px-2 py-1"
                    >
                      <option value="general">General Note</option>
                      <option value="restricted">Restricted Note</option>
                    </select>
                    <button
                      onClick={handleAddNote}
                      className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
                    >
                      Add Note
                    </button>
                  </div>
                </div>

                {/* Notes list */}
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className={`p-3 rounded ${
                        note.type === 'restricted' ? 'bg-yellow-100' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {note.type === 'restricted' ? (
                            <LockClosedIcon className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-600" />
                          )}
                          <span className="text-sm font-medium">{note.author.name}</span>
                        </div>
                        <span className="text-xs text-gray-600">
                          {formatTimestamp(note.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-600 mt-4">{date}</div>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPdfModal && document && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">{document.name}</h3>
              <button
                onClick={() => setShowPdfModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={document.url}
                className="w-full h-full rounded border"
                title={document.name}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}