'use client'

import { useState, useEffect } from 'react'
import { Patient } from '@/types'

interface PatientProfileProps {
  id: string
}

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
    status: 'online',
    medicalHistory: [
      {
        condition: 'Hypertension',
        date: '01/15/2023',
        treatment: 'Prescribed Lisinopril 10mg'
      },
      {
        condition: 'Annual Physical',
        date: '03/20/2023',
        treatment: 'Regular checkup - all normal'
      }
    ]
  },
  '348745': {
    id: '348745',
    patientName: 'Varun P',
    patientNumber: '4782640981',
    gender: 'Male',
    lastVisit: '04/10/2023',
    timeOfVisit: '01:00 pm',
    reason: 'Consultation',
    status: 'offline',
    medicalHistory: [
      {
        condition: 'Diabetes Type 2',
        date: '02/10/2023',
        treatment: 'Prescribed Metformin 500mg'
      },
      {
        condition: 'Regular Checkup',
        date: '04/10/2023',
        treatment: 'Blood sugar levels stable'
      }
    ]
  }
}

export default function PatientProfile({ id }: PatientProfileProps) {
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    // Get patient info based on the ID
    const currentPatient = mockPatients[id]
    if (currentPatient) {
      setPatient(currentPatient)
    }
  }, [id])

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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(patient.patientName)}`}
              alt={patient.patientName}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{patient.patientName}</h1>
              <p className="text-gray-500">Patient ID: {patient.id}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {patient.patientName}</p>
              <p><span className="font-medium">Gender:</span> {patient.gender}</p>
              <p><span className="font-medium">Contact:</span> {patient.patientNumber}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-2 inline-flex items-center ${
                  patient.status === 'online' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-1 ${
                    patient.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                  {patient.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Visit Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Last Visit:</span> {patient.lastVisit}</p>
              <p><span className="font-medium">Time:</span> {patient.timeOfVisit}</p>
              <p><span className="font-medium">Reason:</span> {patient.reason}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Medical History</h2>
          <div className="space-y-4">
            {patient.medicalHistory?.map((record, index) => (
              <div key={index} className="border-l-4 border-primary pl-4 py-2">
                <p className="font-medium">{record.condition}</p>
                <p className="text-sm text-gray-600">Date: {record.date}</p>
                <p className="text-sm text-gray-600">Treatment: {record.treatment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}