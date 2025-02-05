'use client'

import { useState, useEffect } from 'react'
import { Doctor } from '@/types'

// Mock doctors data - in a real app, this would come from your backend
const mockDoctors: { [key: string]: Doctor } = {
  'dr-sarah': {
    id: 'dr-sarah',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: '12 years',
    education: [
      'MD - Stanford University School of Medicine',
      'Cardiology Fellowship - Mayo Clinic',
      'Internal Medicine Residency - Johns Hopkins'
    ],
    certifications: [
      'American Board of Internal Medicine',
      'Board Certified in Cardiovascular Disease',
      'Advanced Cardiac Life Support (ACLS)'
    ],
    contact: {
      email: 'sarah.johnson@curasync.com',
      phone: '+1 (555) 234-5678',
      address: '456 Cardiology Center, San Francisco, CA 94143'
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      hours: '9:00 AM - 5:00 PM'
    },
    rating: 4.8,
    totalPatients: 1200
  },
  'dr-michael': {
    id: 'dr-michael',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    experience: '15 years',
    education: [
      'MD - Harvard Medical School',
      'Neurology Residency - Massachusetts General Hospital',
      'Fellowship in Movement Disorders - UCSF'
    ],
    certifications: [
      'American Board of Psychiatry and Neurology',
      'Subspecialty Certification in Movement Disorders',
      'Basic Life Support (BLS)'
    ],
    contact: {
      email: 'michael.chen@curasync.com',
      phone: '+1 (555) 345-6789',
      address: '789 Neurology Institute, Boston, MA 02114'
    },
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '8:00 AM - 4:00 PM'
    },
    rating: 4.5,
    totalPatients: 1000
  }
}

export default function DoctorProfilePage({ params }: { params: { doctorId: string } }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  useEffect(() => {
    // Get doctor info based on the ID
    const currentDoctor = mockDoctors[params.doctorId]
    if (currentDoctor) {
      setDoctor(currentDoctor)
    }
  }, [params.doctorId])

  if (!doctor) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Doctor Not Found</h2>
          <p className="text-gray-600">The doctor you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&size=128`}
            alt={doctor.name}
            className="w-32 h-32 rounded-full"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{doctor.name}</h1>
            <p className="text-xl text-gray-600">{doctor.specialization}</p>
            <p className="text-gray-500">{doctor.experience} Experience</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <ul className="space-y-2">
              {doctor.education.map((edu, index) => (
                <li key={index} className="text-gray-600">{edu}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Certifications</h2>
            <ul className="space-y-2">
              {doctor.certifications.map((cert, index) => (
                <li key={index} className="text-gray-600">{cert}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Email: {doctor.contact.email}</p>
              <p className="text-gray-600">Phone: {doctor.contact.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Address: {doctor.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Availability</h2>
          <p className="text-gray-600">
            Days: {doctor.availability.days.join(", ")}
          </p>
          <p className="text-gray-600">Hours: {doctor.availability.hours}</p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-lg">
              Rating: <span className="font-semibold">{doctor.rating}/5.0</span>
            </p>
            <p className="text-lg">
              Total Patients: <span className="font-semibold">{doctor.totalPatients}+</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}