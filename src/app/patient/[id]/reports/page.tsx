'use client'

import { useState } from 'react'
import { Patient } from '@/types'

interface Report {
  id: string
  date: string
  type: string
  content: string
  aiSuggestions?: string[]
}

export default function PatientReportsPage({ params }: { params: { id: string } }) {
  const [patient] = useState<Patient>({
    id: params.id,
    patientName: 'Nithya Kumar',
    patientNumber: '4782640981',
    gender: 'Female',
    lastVisit: '04/10/2023',
    timeOfVisit: '02:00pm',
    reason: 'Monthly checkup',
    priority: 'high',
    assignedDoctor: 'dr-james'
  })

  const [reports] = useState<Report[]>([
    {
      id: '1',
      date: '2024-02-15',
      type: 'Blood Test',
      content: 'WBC: 10.32 ppm\nRBC: 4.5 million/mcL\nHemoglobin: 14.2 g/dL\nHematocrit: 42%',
      aiSuggestions: [
        'WBC count is slightly elevated, suggesting possible infection',
        'Other parameters are within normal range',
        'Recommend follow-up test in 2 weeks'
      ]
    },
    {
      id: '2',
      date: '2024-02-01',
      type: 'X-Ray Report',
      content: 'Chest X-ray shows clear lung fields. No abnormalities detected.',
      aiSuggestions: [
        'No signs of pneumonia or other lung conditions',
        'Regular monitoring recommended for high-risk patients'
      ]
    }
  ])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{patient.patientName}'s Reports</h1>
        <p className="text-gray-600">Patient ID: {patient.id}</p>
      </div>

      <div className="space-y-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{report.type}</h2>
                <p className="text-gray-500">{new Date(report.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium mb-2">Report Content</h3>
              <pre className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
                {report.content}
              </pre>
            </div>

            {report.aiSuggestions && (
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Analysis
                </h3>
                <ul className="space-y-2">
                  {report.aiSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}