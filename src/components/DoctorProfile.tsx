'use client'

import { useState } from 'react'
import { Doctor } from '@/types'

const initialDoctorData: Doctor = {
  id: "dr-james",
  name: "Dr. James Martin",
  specialization: "General Surgeon",
  experience: "15+ years",
  education: [
    "MBBS - Harvard Medical School",
    "MS General Surgery - Johns Hopkins University",
    "Fellowship in Advanced Surgery - Mayo Clinic"
  ],
  certifications: [
    "American Board of Surgery",
    "Advanced Trauma Life Support",
    "Advanced Cardiac Life Support"
  ],
  contact: {
    email: "james.martin@curasync.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Drive, Boston, MA 02115"
  },
  availability: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    hours: "9:00 AM - 5:00 PM"
  },
  rating: 4.8,
  totalPatients: 1500
}

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [doctor, setDoctor] = useState<Doctor>(initialDoctorData)
  const [editedDoctor, setEditedDoctor] = useState<Doctor>(initialDoctorData)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedDoctor(doctor)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedDoctor(doctor)
  }

  const handleSave = () => {
    setDoctor(editedDoctor)
    setIsEditing(false)
  }

  const handleChange = (field: keyof Doctor, value: any) => {
    setEditedDoctor(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleContactChange = (field: keyof Doctor['contact'], value: string) => {
    setEditedDoctor(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }))
  }

  const handleAvailabilityChange = (field: keyof Doctor['availability'], value: any) => {
    setEditedDoctor(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [field]: value
      }
    }))
  }

  const handleArrayChange = (field: 'education' | 'certifications', index: number, value: string) => {
    setEditedDoctor(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const handleAddArrayItem = (field: 'education' | 'certifications') => {
    setEditedDoctor(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const handleRemoveArrayItem = (field: 'education' | 'certifications', index: number) => {
    setEditedDoctor(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${doctor.name}&size=128`}
              alt={doctor.name}
              className="w-32 h-32 rounded-full"
            />
            <div className="ml-6">
              {isEditing ? (
                <input
                  type="text"
                  value={editedDoctor.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-3xl font-bold mb-2 px-2 py-1 border rounded"
                />
              ) : (
                <h1 className="text-3xl font-bold">{doctor.name}</h1>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editedDoctor.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                  className="text-xl text-gray-600 px-2 py-1 border rounded"
                />
              ) : (
                <p className="text-xl text-gray-600">{doctor.specialization}</p>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editedDoctor.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  className="text-gray-500 px-2 py-1 border rounded"
                />
              ) : (
                <p className="text-gray-500">{doctor.experience} Experience</p>
              )}
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-2">
              {(isEditing ? editedDoctor : doctor).education.map((edu, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={edu}
                        onChange={(e) => handleArrayChange('education', index, e.target.value)}
                        className="flex-1 px-2 py-1 border rounded"
                      />
                      <button
                        onClick={() => handleRemoveArrayItem('education', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-600">{edu}</p>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => handleAddArrayItem('education')}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  + Add Education
                </button>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Certifications</h2>
            <div className="space-y-2">
              {(isEditing ? editedDoctor : doctor).certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={cert}
                        onChange={(e) => handleArrayChange('certifications', index, e.target.value)}
                        className="flex-1 px-2 py-1 border rounded"
                      />
                      <button
                        onClick={() => handleRemoveArrayItem('certifications', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-600">{cert}</p>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => handleAddArrayItem('certifications')}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  + Add Certification
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedDoctor.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  <p className="text-gray-600">{doctor.contact.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedDoctor.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  <p className="text-gray-600">{doctor.contact.phone}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              {isEditing ? (
                <textarea
                  value={editedDoctor.contact.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-2 py-1 border rounded"
                />
              ) : (
                <p className="text-gray-600">{doctor.contact.address}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Availability</h2>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Days</label>
                <select
                  multiple
                  value={editedDoctor.availability.days}
                  onChange={(e) => handleAvailabilityChange('days', 
                    Array.from(e.target.selectedOptions, option => option.value)
                  )}
                  className="w-full px-2 py-1 border rounded"
                  size={5}
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Hours</label>
                <input
                  type="text"
                  value={editedDoctor.availability.hours}
                  onChange={(e) => handleAvailabilityChange('hours', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600">
                Days: {doctor.availability.days.join(", ")}
              </p>
              <p className="text-gray-600">Hours: {doctor.availability.hours}</p>
            </>
          )}
        </div>

        <div className="mt-6">
          <div>
            <p className="text-lg">
              Rating: <span className="font-semibold">{doctor.rating}/5.0</span>
            </p>
            <p className="text-lg">
              Total Patients: <span className="font-semibold">{doctor.totalPatients}+</span>
            </p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-end space-x-4 border-t pt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}