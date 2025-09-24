import { HazardReport, SafePlace, Alert, User } from '@/types/harbor';

export const mockUser: User = {
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah.chen@email.com',
  credibilityScore: 85,
  totalReports: 12,
  verifiedReports: 10,
  joinDate: '2024-01-15',
};

export const mockHazardReports: HazardReport[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Sarah Chen',
    userCredibility: 85,
    type: 'flood',
    severity: 'high',
    title: 'Street flooding on Marine Drive',
    description: 'Water level rising rapidly, about knee-deep. Multiple vehicles stranded.',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Marine Drive, Mumbai, Maharashtra'
    },
    timestamp: '2024-09-24T10:30:00Z',
    media: [
      { type: 'image', url: '/api/placeholder/400/300' }
    ],
    verified: true,
    reportCount: 8
  },
  {
    id: '2',
    userId: '2',
    userName: 'Raj Patel',
    userCredibility: 72,
    type: 'high-waves',
    severity: 'medium',
    title: 'Unusually high waves at Juhu Beach',
    description: 'Waves reaching 3-4 feet higher than normal. Beach authorities have issued warnings.',
    location: {
      lat: 19.1076,
      lng: 72.8263,
      address: 'Juhu Beach, Mumbai, Maharashtra'
    },
    timestamp: '2024-09-24T09:15:00Z',
    verified: true,
    reportCount: 5
  },
  {
    id: '3',
    userId: '3',
    userName: 'Priya Sharma',
    userCredibility: 91,
    type: 'storm-surge',
    severity: 'critical',
    title: 'Storm surge affecting Worli seaface',
    description: 'Strong winds and high tides causing significant water intrusion into coastal roads.',
    location: {
      lat: 19.0176,
      lng: 72.8174,
      address: 'Worli Seaface, Mumbai, Maharashtra'
    },
    timestamp: '2024-09-24T08:45:00Z',
    verified: true,
    reportCount: 12
  },
  {
    id: '4',
    userId: '4',
    userName: 'Amit Kumar',
    userCredibility: 63,
    type: 'abnormal-tide',
    severity: 'low',
    title: 'Lower than expected tide at Gateway of India',
    description: 'Tide is significantly lower than predicted, exposing more of the seafloor.',
    location: {
      lat: 18.9220,
      lng: 72.8347,
      address: 'Gateway of India, Mumbai, Maharashtra'
    },
    timestamp: '2024-09-24T07:20:00Z',
    verified: false,
    reportCount: 2
  }
];

export const mockSafePlaces: SafePlace[] = [
  {
    id: '1',
    name: 'Shivaji Park Community Center',
    type: 'shelter',
    location: {
      lat: 19.0330,
      lng: 72.8397,
      address: 'Shivaji Park, Dadar, Mumbai'
    },
    capacity: 500,
    contact: '+91-22-2444-5566',
    facilities: ['Medical Aid', 'Food', 'Water', 'Restrooms', 'Communication']
  },
  {
    id: '2',
    name: 'King Edward Memorial Hospital',
    type: 'hospital',
    location: {
      lat: 18.9894,
      lng: 72.8316,
      address: 'Acharya Donde Marg, Parel, Mumbai'
    },
    capacity: 200,
    contact: '+91-22-2410-7000',
    facilities: ['Emergency Care', 'Trauma Center', 'Blood Bank', 'Ambulance']
  },
  {
    id: '3',
    name: 'Malabar Hill High Ground',
    type: 'high-ground',
    location: {
      lat: 18.9558,
      lng: 72.8010,
      address: 'Malabar Hill, Mumbai'
    },
    facilities: ['Elevated Area', 'Safe from Flooding']
  },
  {
    id: '4',
    name: 'Disaster Management Control Room',
    type: 'emergency-center',
    location: {
      lat: 18.9387,
      lng: 72.8354,
      address: 'Mantralaya, Nariman Point, Mumbai'
    },
    contact: '+91-22-2202-4444',
    facilities: ['Emergency Coordination', '24/7 Operations', 'Communication Hub']
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'hazard',
    severity: 'emergency',
    title: 'Critical Flooding Alert',
    message: 'Severe flooding reported in Marine Drive area. Avoid the region and seek higher ground immediately.',
    location: {
      lat: 19.0760,
      lng: 72.8777,
      radius: 2
    },
    timestamp: '2024-09-24T10:35:00Z',
    read: false
  },
  {
    id: '2',
    type: 'warning',
    severity: 'warning',
    title: 'High Wave Advisory',
    message: 'Unusually high waves observed at coastal areas. Exercise caution near beaches.',
    location: {
      lat: 19.1076,
      lng: 72.8263,
      radius: 5
    },
    timestamp: '2024-09-24T09:20:00Z',
    read: true
  },
  {
    id: '3',
    type: 'all-clear',
    severity: 'info',
    title: 'All Clear - Bandra Area',
    message: 'Previous storm surge warning has been lifted. Normal conditions restored in Bandra coastal area.',
    location: {
      lat: 19.0596,
      lng: 72.8295,
      radius: 3
    },
    timestamp: '2024-09-24T08:00:00Z',
    read: true
  }
];

export const hazardTypes = [
  { value: 'flood', label: 'Flood', icon: '🌊' },
  { value: 'high-waves', label: 'High Waves', icon: '🌊' },
  { value: 'storm-surge', label: 'Storm Surge', icon: '⛈️' },
  { value: 'tsunami', label: 'Tsunami', icon: '🌪️' },
  { value: 'coastal-erosion', label: 'Coastal Erosion', icon: '🏖️' },
  { value: 'abnormal-tide', label: 'Abnormal Tide', icon: '🌊' }
];

export const severityLevels = [
  { value: 'low', label: 'Low', color: 'safe' },
  { value: 'medium', label: 'Medium', color: 'warning' },
  { value: 'high', label: 'High', color: 'warning' },
  { value: 'critical', label: 'Critical', color: 'emergency' }
];