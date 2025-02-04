import { useState } from 'react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Doctor } from '@/types'

interface SearchDoctorModalProps {
  isOpen: boolean
  onClose: () => void
  onSendRequest: (doctorId: string) => void
}

const allDoctors: Doctor[] = [
  {
    id: 'dr-smith',
    name: 'Dr. John Smith',
    specialization: 'Neurologist',
    experience: '10 years',
    education: [],
    certifications: [],
    contact: { email: '', phone: '', address: '' },
    availability: { days: [], hours: '' },
    rating: 4.5,
    totalPatients: 1000,
    patients: []
  },
  {
    id: 'dr-patel',
    name: 'Dr. Priya Patel',
    specialization: 'Cardiologist',
    experience: '15 years',
    education: [],
    certifications: [],
    contact: { email: '', phone: '', address: '' },
    availability: { days: [], hours: '' },
    rating: 4.8,
    totalPatients: 1500,
    patients: []
  },
  {
    id: 'dr-wilson',
    name: 'Dr. Emma Wilson',
    specialization: 'Pediatrician',
    experience: '8 years',
    education: [],
    certifications: [],
    contact: { email: '', phone: '', address: '' },
    availability: { days: [], hours: '' },
    rating: 4.6,
    totalPatients: 800,
    patients: []
  }
]

export default function SearchDoctorModal({ isOpen, onClose, onSendRequest }: SearchDoctorModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredDoctors = allDoctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search Doctors</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mb-6 relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Search by name or specialization..."
          />
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${doctor.name}`}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  <p className="text-sm text-gray-500">Experience: {doctor.experience}</p>
                </div>
              </div>
              <button
                onClick={() => onSendRequest(doctor.id)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Send Request
              </button>
            </div>
          ))}
          
          {filteredDoctors.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No doctors found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  )
}