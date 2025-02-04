'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Patient } from '@/types'

interface TransferPatientModalProps {
  isOpen: boolean
  onClose: () => void
  onTransfer: (doctorId: string) => void
  patient: Patient | null
}

const mockDoctors = [
  {
    id: 'dr-sarah',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist'
  },
  {
    id: 'dr-michael',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist'
  },
  {
    id: 'dr-emily',
    name: 'Dr. Emily Williams',
    specialization: 'Pediatrician'
  }
]

export default function TransferPatientModal({ isOpen, onClose, onTransfer, patient }: TransferPatientModalProps) {
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [reason, setReason] = useState('')

  if (!isOpen || !patient) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDoctor || !reason) return
    onTransfer(selectedDoctor)
    setSelectedDoctor('')
    setReason('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Transfer Patient</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              Transferring patient: <span className="font-medium">{patient.patientName}</span>
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor
            </label>
            <select
              id="doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select a doctor</option>
              {mockDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Transfer
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              rows={3}
              placeholder="Please provide a reason for the transfer"
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
              Send Transfer Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}