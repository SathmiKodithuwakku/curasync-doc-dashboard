import { Doctor } from '../types';

const doctorData: Doctor = {
  id: "1",
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
};

export default function DoctorProfile() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <img
            src="https://ui-avatars.com/api/?name=James+Martin&size=128"
            alt="Dr. James Martin"
            className="w-32 h-32 rounded-full"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{doctorData.name}</h1>
            <p className="text-xl text-gray-600">{doctorData.specialization}</p>
            <p className="text-gray-500">{doctorData.experience} Experience</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <ul className="space-y-2">
              {doctorData.education.map((edu, index) => (
                <li key={index} className="text-gray-600">{edu}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Certifications</h2>
            <ul className="space-y-2">
              {doctorData.certifications.map((cert, index) => (
                <li key={index} className="text-gray-600">{cert}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Email: {doctorData.contact.email}</p>
              <p className="text-gray-600">Phone: {doctorData.contact.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Address: {doctorData.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Availability</h2>
          <p className="text-gray-600">
            Days: {doctorData.availability.days.join(", ")}
          </p>
          <p className="text-gray-600">Hours: {doctorData.availability.hours}</p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-lg">
              Rating: <span className="font-semibold">{doctorData.rating}/5.0</span>
            </p>
            <p className="text-lg">
              Total Patients: <span className="font-semibold">{doctorData.totalPatients}+</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}