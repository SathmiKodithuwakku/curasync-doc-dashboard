'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface SearchPatientModalProps {
  isOpen: boolean
  onClose: () => void
  onInvite: (patientNumber: string) => void
}

export default function SearchPatientModal({ isOpen, onClose, onInvite }: SearchPatientModalProps) {
  const [patientNumber, setPatientNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onInvite(patientNumber)
    setPatientNumber('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search Patient</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="patientNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Patient Number
            </label>
            <input
              type="text"
              id="patientNumber"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter patient number"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}