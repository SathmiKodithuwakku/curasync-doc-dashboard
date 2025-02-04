export interface Patient {
  id: string;
  patientName: string;
  patientNumber: string;
  gender: 'Male' | 'Female';
  lastVisit: string;
  timeOfVisit: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  assignedDoctor: string;
  medicalHistory?: {
    condition: string;
    date: string;
    treatment: string;
  }[];
  reports?: {
    id: string;
    date: string;
    type: string;
    content: string;
    aiSuggestions?: string[];
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
  patients: string[]; // Array of patient IDs
}

export interface FriendRequest {
  id: string;
  from: {
    id: string;
    name: string;
    specialization: string;
    image: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}

export interface TransferRequest {
  id: string;
  patientId: string;
  fromDoctorId: string;
  toDoctorId: string;
  reason: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}