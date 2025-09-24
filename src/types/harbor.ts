export interface User {
  id: string;
  name: string;
  email: string;
  credibilityScore: number;
  totalReports: number;
  verifiedReports: number;
  joinDate: string;
  avatar?: string;
}

export interface HazardReport {
  id: string;
  userId: string;
  userName: string;
  userCredibility: number;
  type: 'flood' | 'high-waves' | 'storm-surge' | 'tsunami' | 'coastal-erosion' | 'abnormal-tide';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
  verified: boolean;
  reportCount: number;
}

export interface SafePlace {
  id: string;
  name: string;
  type: 'shelter' | 'hospital' | 'high-ground' | 'emergency-center';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  capacity?: number;
  contact?: string;
  facilities: string[];
}

export interface Alert {
  id: string;
  type: 'hazard' | 'warning' | 'all-clear';
  severity: 'info' | 'warning' | 'emergency';
  title: string;
  message: string;
  location: {
    lat: number;
    lng: number;
    radius: number; // in km
  };
  timestamp: string;
  read: boolean;
}

export interface NotificationSettings {
  hazardAlerts: boolean;
  proximityRadius: number; // in km
  severityFilter: ('low' | 'medium' | 'high' | 'critical')[];
}