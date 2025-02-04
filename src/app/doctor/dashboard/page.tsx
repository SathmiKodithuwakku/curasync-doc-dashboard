'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Patient } from '@/types'
import { ChatBubbleLeftIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

export default function DoctorDashboardPage() {
  const [recentPatients] = useState<Patient[]>([
    {
      id: '876364',
      patientName: 'Nithya kumar',
      patientNumber: '4782640981',
      gender: 'Female',
      lastVisit: '04/10/2023',
      timeOfVisit: '02:00pm',
      reason: 'Monthly checkup',
      priority: 'high',
      assignedDoctor: 'dr-james'
    },
    {
      id: '348745',
      patientName: 'Varun P',
      patientNumber: '4782640981',
      gender: 'Male',
      lastVisit: '04/10/2023',
      timeOfVisit: '01:00 pm',
      reason: 'Consultation',
      priority: 'medium',
      assignedDoctor: 'dr-james'
    }
  ])

  const [upcomingAppointments] = useState([
    {
      id: '1',
      patientName: 'John Doe',
      time: '10:00 AM',
      date: '2024-02-20',
      reason: 'Follow-up'
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      time: '11:30 AM',
      date: '2024-02-20',
      reason: 'Initial Consultation'
    }
  ])

  const [recentNotes] = useState([
    {
      id: '1',
      patientName: 'Mike Johnson',
      date: '2024-02-15',
      note: 'Patient reported improvement in symptoms after medication change.'
    },
    {
      id: '2',
      patientName: 'Sarah Wilson',
      date: '2024-02-14',
      note: 'Prescribed new medication for blood pressure management.'
    }
  ])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Patients</h2>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${patient.patientName}&size=32`}
                    alt={patient.patientName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{patient.patientName}</p>
                    <p className="text-sm text-gray-500">{patient.lastVisit}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/chat/${patient.id}`}
                    className="text-gray-600 hover:text-primary"
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/patient/${patient.id}/timeline`}
                    className="text-gray-600 hover:text-primary"
                  >
                    <ClockIcon className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Notes</h2>
          <div className="space-y-4">
            {recentNotes.map((note) => (
              <div key={note.id} className="flex items-center space-x-3">
                <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{note.patientName}</p>
                  <p className="text-sm text-gray-500">{new Date(note.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600 mt-1">{note.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}