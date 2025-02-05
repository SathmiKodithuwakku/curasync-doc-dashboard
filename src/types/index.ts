export interface TimelineEntry {
  id: string;
  patientId: string;
  type: 'report' | 'note' | 'document';
  title: string;
  content: string;
  uploadDate: string;
  author: {
    id: string;
    name: string;
    role: 'doctor' | 'patient' | 'staff';
  };
  visibility: 'public' | 'private';
  category: 'general' | 'lab' | 'imaging' | 'prescription' | 'other';
  importance: 'high' | 'medium' | 'low';
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
    thumbnailUrl?: string;
  }[];
  visualizationData?: {
    type: 'graph' | 'chart' | 'table';
    data: any;
  };
  notes: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      role: 'doctor' | 'staff';
    };
    visibility: 'public' | 'private';
    timestamp: string;
  }[];
}

export interface TimelineAuditLog {
  id: string;
  action: 'create' | 'view' | 'edit' | 'delete';
  entryId: string;
  userId: string;
  userRole: 'doctor' | 'patient' | 'staff';
  timestamp: string;
  details: string;
}

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
  chatEnabled: boolean;
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

export interface ChatPermissionLog {
  id: string;
  patientId: string;
  patientName: string;
  enabled: boolean;
  timestamp: string;
  changedBy: {
    id: string;
    name: string;
  };
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
  patients: string[];
}

export interface FriendRequest {
  id: string;
  from: {
    id: string;
    name: string;
    specialization: string;
    hospital: string;
    image: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}

export interface TransferRequest {
  id: string;
  patientId: string;
  patientName: string;
  fromDoctor: {
    id: string;
    name: string;
    specialization: string;
    hospital: string;
  };
  reason: string;
  urgency: 'high' | 'medium' | 'low';
  medicalSummary: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}