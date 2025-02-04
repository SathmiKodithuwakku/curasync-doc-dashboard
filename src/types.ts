export interface Patient {
  visitNo: string;
  patientName: string;
  patientNumber: string;
  gender: 'Male' | 'Female';
  lastVisit: string;
  timeOfVisit: string;
  reason: string;
  status?: 'online' | 'offline';
  medicalHistory?: {
    condition: string;
    date: string;
    treatment: string;
  }[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  education: string[];
  certifications: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  availability: {
    days: string[];
    hours: string;
  };
  rating: number;
  totalPatients: number;
}