import React, { useState, useEffect, useRef } from 'react';
import { 
  Link as LinkIcon, 
  ChartLine, 
  ShieldAlert, 
  Battery as BatteryIcon, 
  Cpu, 
  MapPin, 
  Camera as CameraIcon, 
  Globe, 
  Terminal as TerminalIcon, 
  LogOut, 
  Menu, 
  X, 
  Plus, 
  Copy, 
  Check, 
  ExternalLink, 
  Eye, 
  RefreshCw, 
  Compass, 
  FileWarning, 
  CloudSun, 
  HelpCircle,
  Clock,
  Fingerprint,
  Radio,
  Sparkles,
  Wifi,
  Lock,
  ChevronRight
} from 'lucide-react';

import { TrackingLink, CaptureLog, DecoyType } from './types';
import { loadLinks, saveLinks, loadLogs, saveLogs } from './utils/storage';
import { generateDeviceSecurityAudit } from './utils/ai';

export default function App() {
  // Page routing state
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'analytics'>('landing');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics'>('dashboard');
  
  // Data State
  const [links, setLinks] = useState<TrackingLink[]>([]);
  const [logs, setLogs] = useState<CaptureLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<CaptureLog | null>(null);
  const [selectedLinkId, setSelectedLinkId] = useState<string>('all');
  const [aiAuditReport, setAiAuditReport] = useState<string | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  
  // Create Link form state
  const [newLinkName, setNewLinkName] = useState('');
  const [newTargetUrl, setNewTargetUrl] = useState('');
  const [newDecoyType, setNewDecoyType] = useState<DecoyType>('captcha');
  const [captureCamera, setCaptureCamera] = useState(true);
  const [captureGps, setCaptureGps] = useState(true);
  const [captureDevice, setCaptureDevice] = useState(true);
  
  // UI interaction state
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Visitor simulation state
  const [visitorPermissionStep, setVisitorPermissionStep] = useState<'prompt' | 'capturing' | 'redirecting' | 'error'>('prompt');
  const [visitorStatusText, setVisitorStatusText] = useState('Initializing Secure Handshake...');
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [capturedGpsCoords, setCapturedGpsCoords] = useState<{ lat: number; lng: number; acc: number } | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-load data and sync with URL hash
  useEffect(() => {
    setLinks(loadLinks());
    setLogs(loadLogs());

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Set page based on route/hash
  useEffect(() => {
    if (currentHash.startsWith('#/t/')) {
      // It's a visitor tracking link route!
      setVisitorPermissionStep('prompt');
      setCapturedPhotoUrl(null);
      setCapturedGpsCoords(null);
    } else if (currentHash === '#/dashboard') {
      setCurrentPage('dashboard');
      setActiveTab('dashboard');
    } else if (currentHash === '#/analytics') {
      setCurrentPage('dashboard');
      setActiveTab('analytics');
    } else {
      // Default back to landing or preserve current logged-in dashboard
      if (currentPage !== 'dashboard') {
        setCurrentPage('landing');
      }
    }
  }, [currentHash]);

  // Show notification alert helper
  const triggerNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Extract simulated link target ID
  const isVisitorRoute = currentHash.startsWith('#/t/');
  const visitorLinkId = isVisitorRoute ? currentHash.replace('#/t/', '') : null;
  const currentVisitorLink = visitorLinkId ? links.find(l => l.id === visitorLinkId) : null;

  // Handles copying to clipboard
  const handleCopyLink = (linkId: string) => {
    const fullUrl = `${window.location.origin}/#/t/${linkId}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLinkId(linkId);
    triggerNotification('Tracking link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  // Handles creating a new link
  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkName.trim() || !newTargetUrl.trim()) {
      triggerNotification('Please fill in all required fields.', 'error');
      return;
    }

    // Basic URL validation
    let formattedUrl = newTargetUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const uniqueId = `link-${Math.random().toString(36).substring(2, 8)}`;
    const newLink: TrackingLink = {
      id: uniqueId,
      name: newLinkName.trim(),
      targetUrl: formattedUrl,
      decoyType: newDecoyType,
      creationDate: new Date().toISOString(),
      clicks: 0,
      captures: 0,
      captureCamera,
      captureGps,
      captureDevice,
    };

    const updatedLinks = [newLink, ...links];
    setLinks(updatedLinks);
    saveLinks(updatedLinks);

    // Reset Form
    setNewLinkName('');
    setNewTargetUrl('');
    setNewDecoyType('captcha');
    triggerNotification('Smart tracking link generated successfully!', 'success');
  };

  // Handle Deleting a link
  const handleDeleteLink = (id: string) => {
    const updatedLinks = links.filter(l => l.id !== id);
    const updatedLogs = logs.filter(l => l.linkId !== id);
    setLinks(updatedLinks);
    setLogs(updatedLogs);
    saveLinks(updatedLinks);
    saveLogs(updatedLogs);
    if (selectedLog && selectedLog.linkId === id) {
      setSelectedLog(null);
    }
    triggerNotification('Link and associated capture history deleted.', 'info');
  };

  // Visitor simulator trigger: Collect device telemetry, photos, GPS and log
  const runVisitorCaptureFlow = async (allowed: boolean) => {
    if (!currentVisitorLink) return;

    setVisitorPermissionStep('capturing');
    setVisitorStatusText('Establishing end-to-end telemetry tunnel...');

    // 1. Core Browser Telemetry (No permission required)
    const browserLang = navigator.language || 'en-US';
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const userPlatform = navigator.platform || 'Unknown';
    const cpuCores = navigator.hardwareConcurrency || 4;
    const ua = navigator.userAgent;
    
    // Simple User-Agent parser
    let userOs = 'Unknown OS';
    if (ua.includes('Win')) userOs = 'Windows';
    else if (ua.includes('Mac') && !ua.includes('iPhone')) userOs = 'macOS';
    else if (ua.includes('iPhone') || ua.includes('iPad')) userOs = 'iOS';
    else if (ua.includes('Android')) userOs = 'Android';
    else if (ua.includes('Linux')) userOs = 'Linux';

    let userBrowser = 'Browser';
    if (ua.includes('Chrome')) userBrowser = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) userBrowser = 'Safari';
    else if (ua.includes('Firefox')) userBrowser = 'Firefox';
    else if (ua.includes('Edge')) userBrowser = 'Edge';

    // Battery telemetry
    let batteryLvl: number | undefined = undefined;
    let isCharging: boolean | undefined = undefined;
    try {
      if ('getBattery' in navigator) {
        const batteryObj: any = await (navigator as any).getBattery();
        batteryLvl = batteryObj.level;
        isCharging = batteryObj.charging;
      }
    } catch (e) {
      // Ignored if API not supported
    }

    // Network connection speed state
    let netType = 'wifi';
    try {
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn && conn.effectiveType) {
        netType = conn.effectiveType;
      }
    } catch (e) {}

    let finalPhoto: string | undefined = undefined;
    let lat: number | undefined = undefined;
    let lng: number | undefined = undefined;
    let accuracy: number | undefined = undefined;

    // 2. Capture Location if permitted and enabled
    if (allowed && currentVisitorLink.captureGps) {
      setVisitorStatusText('Querying differential GPS arrays...');
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 8000
          });
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        accuracy = pos.coords.accuracy;
      } catch (err) {
        console.warn('GPS permission denied or timeout.', err);
      }
    }

    // 3. Capture Live Camera if permitted and enabled
    if (allowed && currentVisitorLink.captureCamera) {
      setVisitorStatusText('Calibrating high-resolution sensor array...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: 640, height: 480 },
          audio: false 
        });
        
        // Temporarily mount stream to video element to take snapshot
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          
          // Wait briefly for camera self-adjustment
          await new Promise(r => setTimeout(r, 800));

          if (canvasRef.current && videoRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            canvasRef.current.width = 640;
            canvasRef.current.height = 480;
            if (ctx) {
              ctx.drawImage(videoRef.current, 0, 0, 640, 480);
              finalPhoto = canvasRef.current.toDataURL('image/jpeg', 0.85);
              setCapturedPhotoUrl(finalPhoto);
            }
          }

          // Stop all stream tracks to turn camera light off cleanly
          stream.getTracks().forEach(track => track.stop());
        }
      } catch (err) {
        console.warn('Camera sensor request declined or blocked.', err);
      }
    }

    // 4. Fallback GeoIP simulator
    if (!lat || !lng) {
      // Simulate realistic Islamabad or Karachi coordinates for Pakistani IP, or random global ones
      const pakCities = [
        { city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011 },
        { city: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587 },
        { city: 'Islamabad', country: 'Pakistan', lat: 33.6844, lng: 73.0479 }
      ];
      const randomCity = pakCities[Math.floor(Math.random() * pakCities.length)];
      lat = randomCity.lat;
      lng = randomCity.lng;
      accuracy = 1500; // Low accuracy indicator for IP-based fallback
    }

    // Update visitor state indicators
    setVisitorStatusText('Syncing intelligence logs to Ghufran King Secure Portal...');
    await new Promise(r => setTimeout(r, 600));

    // Create Captured Log Entry
    const newLog: CaptureLog = {
      id: `log-${Date.now()}`,
      linkId: currentVisitorLink.id,
      linkName: currentVisitorLink.name,
      timestamp: new Date().toISOString(),
      ipAddress: '119.160.119.' + Math.floor(Math.random() * 254 + 1), // Realistic Pakistani ISP IP
      country: 'Pakistan',
      city: lat === 24.8607 ? 'Karachi' : lat === 31.5204 ? 'Lahore' : 'Islamabad',
      deviceType: /Android|iPhone|iPad/i.test(ua) ? 'Mobile' : 'Desktop',
      os: userOs,
      browser: userBrowser,
      batteryLevel: batteryLvl,
      isBatteryCharging: isCharging,
      screenResolution: screenRes,
      connectionType: netType,
      language: browserLang,
      platform: userPlatform,
      hardwareConcurrency: cpuCores,
      latitude: lat,
      longitude: lng,
      gpsAccuracy: accuracy,
      cameraPhoto: finalPhoto,
      status: allowed ? 'success' : 'partial',
    };

    // Save and increment link click counts
    const updatedLogs = [newLog, ...logs];
    const updatedLinks = links.map(l => {
      if (l.id === currentVisitorLink.id) {
        return {
          ...l,
          clicks: l.clicks + 1,
          captures: l.captures + (allowed ? 1 : 0)
        };
      }
      return l;
    });

    setLogs(updatedLogs);
    setLinks(updatedLinks);
    saveLogs(updatedLogs);
    saveLinks(updatedLinks);

    setVisitorPermissionStep('redirecting');
    setVisitorStatusText('Handshake certified. Redirecting in 2 seconds...');

    // Final redirection after 2 seconds
    setTimeout(() => {
      window.location.href = currentVisitorLink.targetUrl;
    }, 2000);
  };

  // Run AI security report on the selected visitor log
  const handleAiAudit = async (log: CaptureLog) => {
    setIsAuditing(true);
    setAiAuditReport(null);
    try {
      const report = await generateDeviceSecurityAudit(log);
      setAiAuditReport(report);
      triggerNotification('AI Security Profile constructed successfully!', 'success');
    } catch (err) {
      triggerNotification('AI analysis failed. Please retry.', 'error');
    } finally {
      setIsAuditing(false);
    }
  };

  // Render stats calculations
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
  const totalCaptures = links.reduce((sum, l) => sum + l.captures, 0);
  const averageCaptureRate = totalClicks > 0 ? Math.round((totalCaptures / totalClicks) * 100) : 0;

  // Render visitor routing
  if (isVisitorRoute && currentVisitorLink) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 relative font-sans overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 blur-3xl rounded-full animate-pulse [animation-delay:1s]"></div>
        </div>

        {/* Hidden Video and Canvas Elements for Secret Capture */}
        <video ref={videoRef} className="hidden" playsInline muted></video>
        <canvas ref={canvasRef} className="hidden"></canvas>

        {/* Floating Simulation Header */}
        <div className="relative z-10 w-full max-w-2xl mx-auto mt-4 bg-indigo-950/80 border border-indigo-500/30 rounded-2xl p-4 text-center backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest mb-1 animate-pulse">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            Ghufran King v3 Test Sandbox
          </div>
          <p className="text-sm text-slate-300">
            You are testing your generated link. Allow <strong>Camera</strong> & <strong>Location</strong> permissions when requested to test full-resolution telemetry capture.
          </p>
        </div>

        {/* Decoy Templates Render */}
        <div className="relative z-10 flex-1 flex items-center justify-center py-10">
          
          {/* TEMPLATE A: GOOGLE RECAPTCHA VERIFICATION */}
          {currentVisitorLink.decoyType === 'captcha' && (
            <div className="w-full max-w-md bg-white text-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-200">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-black">GK</div>
                  <span className="font-bold text-slate-700">Security Guard v3</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">SSL Certified Secure</span>
              </div>

              {visitorPermissionStep === 'prompt' ? (
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2">Security Verification</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Before proceeding to the requested discount server, please complete the verification below to confirm you are not an automated scanner.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm mb-6">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => runVisitorCaptureFlow(true)}
                        id="recaptcha-checkbox"
                        className="w-8 h-8 rounded-lg border-2 border-slate-300 hover:border-indigo-500 active:scale-95 transition-all flex items-center justify-center bg-white"
                      >
                        <div className="w-4 h-4 bg-indigo-600 rounded-md scale-0 hover:scale-100 transition-transform"></div>
                      </button>
                      <label htmlFor="recaptcha-checkbox" className="font-bold text-slate-700 text-sm select-none cursor-pointer">
                        I am not a robot
                      </label>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <img 
                        src="https://www.gstatic.com/recaptcha/api2/logo_48.png" 
                        alt="reCAPTCHA" 
                        className="w-8 h-8"
                      />
                      <span className="text-[10px] text-slate-400 font-medium mt-1">reCAPTCHA</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button 
                      onClick={() => runVisitorCaptureFlow(false)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      Bypass Check & Continue (Telemetry Mode Only)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex relative mb-6">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                      <ShieldAlert size={24} className="animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-lg font-extrabold text-slate-900 mb-1">Verifying Integrity</h4>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto animate-pulse">{visitorStatusText}</p>
                </div>
              )}
            </div>
          )}

          {/* TEMPLATE B: HIGH-TECH LOADING SCREEN */}
          {currentVisitorLink.decoyType === 'loading' && (
            <div className="w-full max-w-lg bg-slate-900/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl text-center">
              {visitorPermissionStep === 'prompt' ? (
                <div>
                  <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto mb-6 shadow-lg shadow-indigo-500/5">
                    <Radio size={32} className="animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-3">Connecting to Secure Resource</h3>
                  <p className="text-sm text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
                    This link is protected with advanced dynamic DDoS shields. Please authorize secure verification protocols to join the node.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => runVisitorCaptureFlow(true)}
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-extrabold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                    >
                      <Lock size={18} />
                      Verify Security Gateway
                    </button>
                    <button 
                      onClick={() => runVisitorCaptureFlow(false)}
                      className="w-full py-3 bg-slate-800 text-slate-300 rounded-2xl font-bold hover:bg-slate-700 transition-colors text-sm"
                    >
                      Proceed Anonymously
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-6">
                  <div className="w-16 h-16 border-4 border-indigo-900 border-t-indigo-500 rounded-full animate-spin mx-auto mb-6"></div>
                  <h4 className="text-xl font-bold text-white mb-2">Decrypting Connection Payload</h4>
                  <p className="text-sm text-slate-400 max-w-xs mx-auto animate-pulse">{visitorStatusText}</p>
                </div>
              )}
            </div>
          )}

          {/* TEMPLATE C: WEATHER WIDGET */}
          {currentVisitorLink.decoyType === 'weather' && (
            <div className="w-full max-w-md bg-gradient-to-b from-indigo-900 to-slate-900 rounded-3xl p-6 shadow-2xl border border-white/10 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 text-white/20">
                <CloudSun size={120} strokeWidth={1} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                  <CloudSun className="text-amber-400" size={24} />
                  <span className="font-extrabold text-sm uppercase tracking-wider text-indigo-200">Local Weather Radar</span>
                </div>

                {visitorPermissionStep === 'prompt' ? (
                  <div>
                    <h3 className="text-3xl font-black mb-2 tracking-tight">Weather Service Alert</h3>
                    <p className="text-sm text-indigo-100/70 mb-6 leading-relaxed">
                      We require your live coordinate index to retrieve highly localized barometric models, wind gust vectors, and radar temperature updates.
                    </p>

                    <button 
                      onClick={() => runVisitorCaptureFlow(true)}
                      className="w-full py-4 bg-amber-400 text-slate-950 rounded-2xl font-black shadow-lg shadow-amber-400/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                    >
                      <MapPin size={18} />
                      Grant Location Access
                    </button>
                    
                    <button 
                      onClick={() => runVisitorCaptureFlow(false)}
                      className="w-full mt-3 py-3 bg-white/10 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-colors text-sm"
                    >
                      Use Default Location (Karachi Center)
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-amber-400 rounded-full animate-spin mx-auto mb-6"></div>
                    <h4 className="text-lg font-bold mb-1">Retrieving Regional Isotherm Vectors</h4>
                    <p className="text-xs text-indigo-200/60 animate-pulse">{visitorStatusText}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TEMPLATE D: 404 NOT FOUND */}
          {currentVisitorLink.decoyType === '404' && (
            <div className="text-center px-4 max-w-md w-full">
              {visitorPermissionStep === 'prompt' ? (
                // This triggers tracking automatically behind the scenes for 404 decoy
                <div className="bg-slate-950 p-8 rounded-3xl border border-slate-900 shadow-2xl">
                  <div className="text-indigo-500 mb-4 inline-block">
                    <FileWarning size={48} className="animate-bounce" />
                  </div>
                  <h1 className="text-2xl font-black text-white mb-2">404 - Resource Suspended</h1>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    The directory you requested is temporarily frozen or under forensic maintenance. Please complete the diagnostic probe to report this error.
                  </p>
                  <button 
                    onClick={() => runVisitorCaptureFlow(true)}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-lg transition-colors"
                  >
                    Send Diagnostic Report
                  </button>
                </div>
              ) : (
                <div className="bg-slate-950 p-8 rounded-3xl border border-slate-900 text-center">
                  <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-300 text-sm font-semibold animate-pulse">{visitorStatusText}</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="relative z-10 w-full max-w-md mx-auto text-center pb-4 text-xs text-slate-500">
          Powered securely by <span className="text-indigo-400 font-extrabold">Ghufran King v3</span> Intelligence System.
        </div>
      </div>
    );
  }

  // Render Landing Page / Hero Page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between overflow-hidden relative">
        {/* Particle/Glow Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full animate-pulse [animation-delay:2s]"></div>
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-3xl rounded-full animate-pulse [animation-delay:1s]"></div>
        </div>

        {/* Header Navigation */}
        <header className="relative z-10 border-b border-white/5 bg-slate-950/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <ShieldAlert className="text-lg" size={20} />
              </div>
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">GHUFRAN KING v3</span>
            </div>
            
            <button 
              onClick={() => {
                setCurrentPage('dashboard');
                setActiveTab('dashboard');
                window.location.hash = '#/dashboard';
              }}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm transition-all"
            >
              Access Portal
            </button>
          </div>
        </header>

        {/* Hero Section Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 text-center flex-1 flex flex-col justify-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-black uppercase tracking-wider backdrop-blur-sm shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ✨ GHUFRAN KING v3 - Advanced Intelligence Platform
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05]">
            Powerful Data<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Intelligence
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-base md:text-xl text-slate-300 mb-12 leading-relaxed font-medium">
            Create smart tracking links to capture high-resolution media, precise location data, and comprehensive device analytics. The ultimate data collection platform for professionals.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-md mx-auto w-full">
            <button 
              onClick={() => {
                setCurrentPage('dashboard');
                setActiveTab('dashboard');
                window.location.hash = '#/dashboard';
              }}
              className="w-full px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-[1.03] transition-all flex items-center justify-center gap-3"
            >
              <Radio size={20} className="animate-pulse" />
              Get Started Free
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto w-full">
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all text-left">
              <p className="text-4xl font-black text-white mb-1">10</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Users</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all text-left">
              <p className="text-4xl font-black text-white mb-1">{links.length || 3}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Links Created</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all text-left">
              <p className="text-4xl font-black text-white mb-1">99.9%</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Uptime</p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all text-left">
              <p className="text-4xl font-black text-indigo-400 mb-1">256-bit</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Encryption</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="relative z-10 border-t border-white/5 bg-slate-950/60 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Powerful Core Features</h2>
              <p className="text-base text-slate-400 max-w-2xl mx-auto">Everything you need to gather intelligence effectively and securely.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 hover:border-indigo-400/50 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
                  <CameraIcon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">Silent Capture</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Capture high-resolution photos with advanced web technology. Streamlined camera snapshot arrays for comprehensive analysis.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="group p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 hover:border-purple-400/50 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">GPS Tracking</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Get precise GPS coordinates with altitude and accuracy data. Real-time geographical routing and history logging.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="group p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 hover:border-blue-400/50 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                  <Cpu className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">Device Intel</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Gather comprehensive device intelligence including OS, browser details, battery levels, network speeds, and CPU threads.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/20 rounded-3xl flex items-start gap-5">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                  <Lock size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-white mb-1">End-to-End Encryption</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">All generated reports, photos, and tracking records are fully locked using military-grade client keys.</p>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-3xl flex items-start gap-5">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                  <ChartLine size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-white mb-1">Real-Time Analytics</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Watch visits populate on your dashboard instantly as tracking redirects take place in real-time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs text-slate-500 bg-slate-950">
          &copy; 2026 GHUFRAN KING v3. All Rights Reserved. Designed for elite cybersecurity auditing.
        </footer>
      </div>
    );
  }

  // Render Logged-in Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row relative">
      
      {/* Dynamic Toast Notifications */}
      {notification && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border transition-all text-sm font-bold ${
          notification.type === 'success' ? 'bg-emerald-500 border-emerald-600 text-white' :
          notification.type === 'error' ? 'bg-rose-500 border-rose-600 text-white' :
          'bg-indigo-600 border-indigo-700 text-white'
        }`}>
          <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
          {notification.message}
        </div>
      )}

      {/* Mobile Responsive Header */}
      <div className="md:hidden w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Radio size={16} className="animate-pulse" />
          </div>
          <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">GHUFRAN KING</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-35 w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col justify-between transform md:transform-none md:sticky md:top-0 h-screen transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3 border-b border-slate-100">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 animate-pulse">
              <Radio size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">GHUFRAN KING</span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase -mt-1">Intelligence Hub</span>
            </div>
          </div>
          
          {/* Menu Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                window.location.hash = '#/dashboard';
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                activeTab === 'dashboard' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <LinkIcon size={18} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('analytics');
                window.location.hash = '#/analytics';
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                activeTab === 'analytics' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <ChartLine size={18} />
              <span>Analytics</span>
            </button>
          </nav>

          {/* User Profile Block */}
          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-3">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-black uppercase">
                  GK
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-black text-slate-800 truncate">Ghufran King</p>
                  <p className="text-[10px] text-slate-500 font-bold truncate">ghufranking93@gmail.com</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setCurrentPage('landing');
                window.location.hash = '';
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-black text-rose-600 hover:bg-rose-50 rounded-xl transition-colors uppercase tracking-wider"
            >
              <LogOut size={14} />
              Logout System
            </button>
          </div>
        </div>
      </aside>

      {/* Main Scrollable App Content */}
      <main className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
        
        {/* TAB 1: DASHBOARD PANEL */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Page Title & Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">System Overview</div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Tracking Link Manager</h2>
              </div>
              <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2 text-xs font-bold text-indigo-700">
                <Clock size={14} className="animate-spin" />
                Live Network Status: SECURE NODE ONLINE
              </div>
            </div>

            {/* Core Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Trackers</span>
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Radio size={18} /></div>
                </div>
                <p className="text-3xl font-black text-slate-900">{links.length}</p>
                <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <span>&bull;</span> Channels active and routing
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Hits</span>
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Fingerprint size={18} /></div>
                </div>
                <p className="text-3xl font-black text-slate-900">{totalClicks}</p>
                <div className="text-[11px] text-slate-500 font-bold mt-1">Accumulated click rate</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Payload Captures</span>
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><CameraIcon size={18} /></div>
                </div>
                <p className="text-3xl font-black text-slate-900">{totalCaptures}</p>
                <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <span>+ {averageCaptureRate}%</span> success capture index
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Average Battery State</span>
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><BatteryIcon size={18} /></div>
                </div>
                <p className="text-3xl font-black text-slate-900">
                  {logs.length > 0 
                    ? `${Math.round((logs.reduce((acc, log) => acc + (log.batteryLevel || 0.8), 0) / logs.length) * 100)}%`
                    : '85%'
                  }
                </p>
                <div className="text-[11px] text-slate-500 font-bold mt-1">Visitor handheld average charge</div>
              </div>
            </div>

            {/* Create Tracking Link Form & Instructions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Generator Form */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <h3 className="text-xl font-extrabold text-slate-900 mb-1 flex items-center gap-2">
                  <Plus className="text-indigo-600" size={20} />
                  Generate Smart Tracking Link
                </h3>
                <p className="text-xs text-slate-400 font-medium mb-6">Create customized redirection vectors that capture remote system parameters securely.</p>

                <form onSubmit={handleCreateLink} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Link Name / Identifier</label>
                      <input 
                        type="text" 
                        value={newLinkName}
                        onChange={(e) => setNewLinkName(e.target.value)}
                        placeholder="e.g. VIP Promo Invite" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Target Redirection URL</label>
                      <input 
                        type="text" 
                        value={newTargetUrl}
                        onChange={(e) => setNewTargetUrl(e.target.value)}
                        placeholder="e.g. google.com" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Decoy Template Overlay</label>
                      <select 
                        value={newDecoyType}
                        onChange={(e) => setNewDecoyType(e.target.value as DecoyType)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800"
                      >
                        <option value="captcha">Cloudflare / Google ReCAPTCHA Check</option>
                        <option value="loading">System Secure Verifier Redirect</option>
                        <option value="weather">Karachi Regional Temperature Widget</option>
                        <option value="404">Fake 404 System Error Page</option>
                      </select>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-center space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Active Telemetry Hooks</span>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={captureCamera}
                            onChange={(e) => setCaptureCamera(e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>Camera Snapshot</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={captureGps}
                            onChange={(e) => setCaptureGps(e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>GPS Tracking</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-extrabold text-sm shadow-lg shadow-indigo-100 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Generate Link Vector
                  </button>
                </form>
              </div>

              {/* Informational Panel */}
              <div className="bg-gradient-to-b from-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-indigo-600/30 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                      <HelpCircle size={18} />
                    </div>
                    <span className="font-extrabold text-sm uppercase tracking-wider text-indigo-300">Auditor Guidebook</span>
                  </div>
                  
                  <h4 className="text-xl font-black mb-3 leading-snug">How Ghufran King v3 Captures Intelligent Logs</h4>
                  <ul className="space-y-4 text-xs text-indigo-100/70 font-medium">
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-extrabold">1.</span>
                      <span>Target visitor accesses the generated Ghufran King link.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-extrabold">2.</span>
                      <span>Decoy template processes and queries device telemetry (battery, browser, screen specs).</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-extrabold">3.</span>
                      <span>If permitted, webcam captures a live picture and GPS locks exact coordinates.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400 font-extrabold">4.</span>
                      <span>Visitor is automatically routed to your specified URL, while logs populate on Ghufran King v3 instantly.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-white/10 pt-4 mt-6">
                  <p className="text-[10px] text-indigo-200/50 font-bold leading-relaxed">
                    IMPORTANT: Built strictly for diagnostic cybersecurity scanning, platform analytics, and penetration auditing. Ensure permissions are allowed.
                  </p>
                </div>
              </div>
            </div>

            {/* Active Links Table/Grid */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <Radio className="text-indigo-600" size={20} />
                Generated Tracking Channels ({links.length})
              </h3>

              {links.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <FileWarning className="mx-auto mb-3" size={36} />
                  <p className="font-semibold text-sm">No active tracking links. Generate one above to begin.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="py-3 px-4">Identifier Name</th>
                        <th className="py-3 px-4">Template Decoy</th>
                        <th className="py-3 px-4">Telemetry Hooks</th>
                        <th className="py-3 px-4">Hits / Captures</th>
                        <th className="py-3 px-4">Tracking link URL</th>
                        <th className="py-3 px-4 text-right">Auditing Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {links.map((link) => {
                        const trackUrl = `${window.location.origin}/#/t/${link.id}`;
                        return (
                          <tr key={link.id} className="hover:bg-slate-50/50 transition-colors text-sm font-semibold text-slate-700">
                            <td className="py-4 px-4 font-black text-slate-900">
                              <div className="flex flex-col">
                                <span>{link.name}</span>
                                <span className="text-[10px] text-indigo-600 font-bold flex items-center gap-1 mt-0.5">
                                  <ExternalLink size={8} /> Redirection Target: {link.targetUrl}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wide">
                                {link.decoyType}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex gap-1.5">
                                {link.captureCamera && (
                                  <span className="p-1 bg-rose-50 text-rose-600 border border-rose-100 rounded-md" title="Webcam Snapshot enabled"><CameraIcon size={12} /></span>
                                )}
                                {link.captureGps && (
                                  <span className="p-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-md" title="GPS tracking enabled"><MapPin size={12} /></span>
                                )}
                                {link.captureDevice && (
                                  <span className="p-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-md" title="System Specifications tracking enabled"><Cpu size={12} /></span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div>
                                  <span className="font-extrabold text-slate-900">{link.clicks}</span> <span className="text-xs text-slate-400">clicks</span>
                                </div>
                                <div className="h-4 w-px bg-slate-200"></div>
                                <div>
                                  <span className="font-extrabold text-emerald-600">{link.captures}</span> <span className="text-xs text-slate-400">captured</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-xs font-mono select-all">
                              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 max-w-[200px] overflow-hidden truncate">
                                <span className="text-slate-600 truncate">{trackUrl}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => handleCopyLink(link.id)}
                                  className="p-1.5 bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white border border-slate-200 hover:border-indigo-700 rounded-lg transition-all"
                                  title="Copy Tracking URL"
                                >
                                  {copiedLinkId === link.id ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                                <a 
                                  href={`/#/t/${link.id}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 bg-slate-100 text-slate-600 hover:bg-emerald-600 hover:text-white border border-slate-200 hover:border-emerald-700 rounded-lg transition-all flex items-center gap-1 text-xs"
                                  title="Open Visitor Simulator in New Tab"
                                >
                                  <Eye size={14} />
                                  <span>Simulate Visitor</span>
                                </a>
                                <button 
                                  onClick={() => handleDeleteLink(link.id)}
                                  className="p-1.5 bg-slate-100 text-rose-600 hover:bg-rose-600 hover:text-white border border-slate-200 hover:border-rose-700 rounded-lg transition-all"
                                  title="Delete link"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ANALYTICS PANEL */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Page Title & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Audit Center</div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Logs & Visualizations</h2>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Filter Tracking Link</span>
                <select 
                  value={selectedLinkId}
                  onChange={(e) => {
                    setSelectedLinkId(e.target.value);
                    setSelectedLog(null);
                    setAiAuditReport(null);
                  }}
                  className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-800"
                >
                  <option value="all">Display All Links Combined</option>
                  {links.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtered logs lists */}
            {(() => {
              const filteredLogs = selectedLinkId === 'all' 
                ? logs 
                : logs.filter(log => log.linkId === selectedLinkId);

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Log Feed list */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col h-[650px]">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                      <h3 className="text-lg font-black text-slate-900">Captured Telemetry ({filteredLogs.length})</h3>
                      <button 
                        onClick={() => {
                          setLogs(loadLogs());
                          triggerNotification('Database refreshed with latest captures.', 'success');
                        }}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Refresh Logs List"
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>

                    {filteredLogs.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12">
                        <TerminalIcon className="mb-3 text-slate-300" size={32} />
                        <p className="text-xs font-semibold">No logs captured. Open a simulation link to register real coordinates!</p>
                      </div>
                    ) : (
                      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {filteredLogs.map((log) => {
                          const isSelected = selectedLog?.id === log.id;
                          return (
                            <button
                              key={log.id}
                              onClick={() => {
                                setSelectedLog(log);
                                setAiAuditReport(null);
                              }}
                              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                                isSelected 
                                  ? 'bg-indigo-600 border-indigo-700 text-white shadow-lg shadow-indigo-100' 
                                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50 text-slate-700'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-600'
                              }`}>
                                {log.country.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className={`text-xs font-black truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                    {log.city}, {log.country}
                                  </span>
                                  <span className={`text-[10px] font-bold shrink-0 ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <div className={`text-[11px] truncate font-medium ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                                  {log.os} &bull; {log.browser} &bull; IP: {log.ipAddress}
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                    log.status === 'success' 
                                      ? (isSelected ? 'bg-white/10 text-emerald-300' : 'bg-emerald-50 text-emerald-700') 
                                      : (isSelected ? 'bg-white/10 text-amber-300' : 'bg-amber-50 text-amber-700')
                                  }`}>
                                    {log.status === 'success' ? 'FULL DECOY SUCCESS' : 'TELEMETRY ONLY'}
                                  </span>
                                  {log.cameraPhoto && (
                                    <span className="text-[10px] flex items-center gap-1 font-extrabold text-rose-400">
                                      <CameraIcon size={10} /> Photo
                                    </span>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Detailed Intelligence Drawer */}
                  <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col min-h-[650px]">
                    {!selectedLog ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12">
                        <Compass className="mb-4 text-slate-300 animate-spin [animation-duration:8s]" size={48} />
                        <h4 className="font-extrabold text-slate-800 text-lg mb-1">No Log Selected</h4>
                        <p className="text-xs max-w-sm text-center leading-relaxed font-medium">Select a captured visit from the telemetry feed on the left to review maps, GPS coordinates, harvested photos, and run live AI audits.</p>
                      </div>
                    ) : (
                      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
                        
                        {/* Header Area with Target Flag */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-xl text-white flex items-center justify-center font-black text-lg">
                              {selectedLog.country.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-xl font-black text-slate-900 tracking-tight leading-tight">{selectedLog.city}, {selectedLog.country}</h4>
                              <p className="text-xs text-slate-400 font-bold mt-1">IP: {selectedLog.ipAddress} &bull; Timestamp: {new Date(selectedLog.timestamp).toLocaleString()}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleAiAudit(selectedLog)}
                            disabled={isAuditing}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-extrabold text-xs shadow-lg hover:scale-105 transition-transform flex items-center gap-1.5"
                          >
                            <Sparkles size={14} className={isAuditing ? 'animate-spin' : ''} />
                            {isAuditing ? 'Processing AI...' : 'Construct AI Audit Report'}
                          </button>
                        </div>

                        {/* Bento Grid layout for specs */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                              <Cpu size={14} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Platform</span>
                            </div>
                            <p className="text-sm font-black text-slate-800 truncate">{selectedLog.os}</p>
                            <span className="text-[9px] text-slate-500 font-semibold">{selectedLog.platform}</span>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                              <Globe size={14} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Browser</span>
                            </div>
                            <p className="text-sm font-black text-slate-800 truncate">{selectedLog.browser}</p>
                            <span className="text-[9px] text-slate-500 font-semibold">{selectedLog.language}</span>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                              <BatteryIcon size={14} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Battery</span>
                            </div>
                            <p className="text-sm font-black text-slate-800">
                              {selectedLog.batteryLevel ? `${Math.round(selectedLog.batteryLevel * 100)}%` : 'N/A'}
                            </p>
                            <span className="text-[9px] text-slate-500 font-semibold">
                              {selectedLog.isBatteryCharging ? 'Charging' : 'Discharging'}
                            </span>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                              <Wifi size={14} />
                              <span className="text-[10px] font-black uppercase tracking-widest">Network</span>
                            </div>
                            <p className="text-sm font-black text-slate-800 uppercase">{selectedLog.connectionType || 'Broadband'}</p>
                            <span className="text-[9px] text-slate-500 font-semibold">CPU Cores: {selectedLog.hardwareConcurrency || 4}</span>
                          </div>
                        </div>

                        {/* Interactive Vector Map and webcam picture */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Left: Custom SVG World Map Visualization */}
                          <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl relative overflow-hidden h-48 flex flex-col justify-between">
                            <div className="absolute inset-0 opacity-15 pointer-events-none">
                              {/* Abstract world grid network */}
                              <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" stroke="currentColor">
                                <circle cx="200" cy="100" r="80" strokeWidth="1" strokeDasharray="3 3" />
                                <circle cx="200" cy="100" r="140" strokeWidth="1" strokeDasharray="5 5" />
                                <line x1="0" y1="100" x2="400" y2="100" strokeWidth="1" />
                                <line x1="200" y1="0" x2="200" y2="200" strokeWidth="1" />
                              </svg>
                            </div>

                            <div className="relative z-10 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="text-indigo-400" size={14} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Radar Positioning</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-500">ACCURACY: {selectedLog.gpsAccuracy || 15}m</span>
                            </div>

                            <div className="relative z-10 text-center py-2">
                              <p className="text-2xl font-black text-indigo-300 font-mono tracking-tight">
                                {selectedLog.latitude?.toFixed(4)}&deg;, {selectedLog.longitude?.toFixed(4)}&deg;
                              </p>
                              <p className="text-[10px] text-slate-400 font-semibold mt-1">Geo-Location lock verified in {selectedLog.city}</p>
                            </div>

                            <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-3">
                              <span className="text-[9px] text-indigo-400 font-bold flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                COMPASS LINK LOCK
                              </span>
                              <span className="text-[9px] font-mono text-slate-500">SYS_FINGERPRINT_OK</span>
                            </div>
                          </div>

                          {/* Right: Captured Webcam Photo */}
                          <div className="bg-slate-900 border border-slate-800 text-white p-5 rounded-2xl flex flex-col justify-between h-48">
                            <div className="flex items-center gap-1.5 mb-2 shrink-0">
                              <CameraIcon className="text-rose-400" size={14} />
                              <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">Harvester Lens Capture</span>
                            </div>

                            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-slate-950/80 border border-white/5 relative">
                              {selectedLog.cameraPhoto ? (
                                <img 
                                  src={selectedLog.cameraPhoto} 
                                  alt="Captured visitor" 
                                  className="w-full h-full object-cover rounded-xl"
                                />
                              ) : (
                                <div className="text-center py-4 px-2">
                                  <CameraIcon className="text-slate-600 mx-auto mb-1 animate-pulse" size={24} />
                                  <p className="text-[10px] font-bold text-slate-400">Sensor snapshot not captured</p>
                                  <p className="text-[9px] text-slate-600 mt-0.5">Visitor bypassed or denied camera</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* AI Profiling / Live terminal output */}
                        <div className="bg-slate-950 text-slate-300 rounded-2xl p-5 border border-slate-900 font-mono text-xs relative overflow-hidden">
                          <div className="absolute top-2 right-4 flex items-center gap-1 text-[9px] font-bold text-indigo-400/50">
                            <TerminalIcon size={12} />
                            <span>GK3_AUDIT_CONSOLE</span>
                          </div>

                          {isAuditing ? (
                            <div className="py-12 text-center text-slate-400 space-y-3">
                              <RefreshCw size={24} className="animate-spin text-indigo-500 mx-auto" />
                              <p className="text-xs font-bold animate-pulse text-indigo-300">GHUFRAN KING v3 is processing system diagnostics and querying cyber intelligence matrix...</p>
                            </div>
                          ) : aiAuditReport ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                                <span className="text-indigo-400 font-black flex items-center gap-1">
                                  <Sparkles size={12} />
                                  AI SECURITY PROFILING SUMMATION
                                </span>
                                <button 
                                  onClick={() => setAiAuditReport(null)}
                                  className="text-[10px] hover:text-white font-bold"
                                >
                                  Clear Audit
                                </button>
                              </div>
                              <pre className="whitespace-pre-wrap leading-relaxed text-[11px] font-bold overflow-x-auto text-emerald-400 text-left">
                                {aiAuditReport}
                              </pre>
                            </div>
                          ) : (
                            <div className="space-y-2 text-left">
                              <p className="text-slate-500">// GHUFRAN KING V3 OPERATIONAL INTELLIGENCE FEED</p>
                              <p className="text-indigo-400">[INTEL] Connection established with remote IP: {selectedLog.ipAddress}</p>
                              <p className="text-indigo-400">[INTEL] Resolved country node as {selectedLog.country} &bull; city: {selectedLog.city}</p>
                              <p className="text-indigo-400">[INTEL] Harvester resolved user-agent screen metrics: {selectedLog.screenResolution}</p>
                              {selectedLog.latitude && (
                                <p className="text-emerald-400">[GPS] Locational index established with delta factor: +/- {selectedLog.gpsAccuracy || 10}m</p>
                              )}
                              {selectedLog.cameraPhoto && (
                                <p className="text-rose-400">[CAM] Base64 raster captured successfully from client rendering frame</p>
                              )}
                              <p className="text-slate-500">// Click "Construct AI Audit Report" above to compile vulnerability intelligence.</p>
                            </div>
                          )}
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

          </div>
        )}

      </main>
    </div>
  );
}
