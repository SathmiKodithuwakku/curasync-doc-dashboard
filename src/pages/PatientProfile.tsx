import { useParams } from 'react-router-dom';
import { Patient } from '../types';

const patientData: Patient = {
  visitNo: "#876364",
  patientName: "Nithya Kumar",
  patientNumber: "4782640981",
  gender: "Female",
  lastVisit: "04/10/2023",
  timeOfVisit: "02:00pm",
  reason: "Monthly checkup",
  medicalHistory: [
    {
      condition: "Hypertension",
      date: "01/15/2023",
      treatment: "Prescribed Lisinopril 10mg"
    },
    {
      condition: "Annual Physical",
      date: "03/20/2023",
      treatment: "Regular checkup - all normal"
    }
  ]
};

export default function PatientProfile() {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold mb-2">Patient Information</h1>
          <p className="text-gray-500">Patient ID: {id}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {patientData.patientName}</p>
              <p><span className="font-medium">Gender:</span> {patientData.gender}</p>
              <p><span className="font-medium">Contact:</span> {patientData.patientNumber}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Visit Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Last Visit:</span> {patientData.lastVisit}</p>
              <p><span className="font-medium">Time:</span> {patientData.timeOfVisit}</p>
              <p><span className="font-medium">Reason:</span> {patientData.reason}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Medical History</h2>
          <div className="space-y-4">
            {patientData.medicalHistory?.map((record, index) => (
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
  );
}