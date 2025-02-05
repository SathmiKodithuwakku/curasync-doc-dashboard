// Add these new types to the existing types file

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
  status?: 'online' | 'offline';
  chatEnabled?: boolean;
  unreadMessages?: number;
  medicalHistory?: {
    condition: string;
    date: string;
    treatment: string;
  }[];
}

export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    role: 'doctor' | 'patient';
    avatar: string;
  };
  receiver: {
    id: string;
    name: string;
    role: 'doctor' | 'patient';
    avatar: string;
  };
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'file' | 'image' | 'template';
  category?: 'urgent' | 'routine' | 'follow-up';
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
    thumbnailUrl?: string;
    size?: number;
  }[];
  metadata?: {
    templateId?: string;
    replyTo?: string;
    encryptionInfo?: {
      algorithm: string;
      keyId: string;
    };
  };
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    role: 'doctor' | 'patient';
    avatar: string;
    status: 'online' | 'offline';
    lastSeen?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  category: 'patient' | 'doctor';
  pinned: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuickReplyTemplate {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export interface NotificationPreference {
  id: string;
  userId: string;
  type: 'all' | 'mentions' | 'urgent' | 'none';
  email: boolean;
  push: boolean;
  sound: boolean;
  desktop: boolean;
  doNotDisturb: {
    enabled: boolean;
    startTime?: string;
    endTime?: string;
  };
}