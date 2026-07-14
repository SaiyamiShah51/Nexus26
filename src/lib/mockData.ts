export const mockCrowdData = {
  gates: [
    { id: "G1", name: "Gate 1", status: "Low", density: 20 },
    { id: "G2", name: "Gate 2", status: "High", density: 85 },
    { id: "G3", name: "Gate 3", status: "Medium", density: 55 },
    { id: "G4", name: "Gate 4", status: "Low", density: 10 },
  ],
  zones: [
    { id: "Z-A", name: "Zone A (North)", status: "High", density: 90 },
    { id: "Z-B", name: "Zone B (South)", status: "Low", density: 30 },
    { id: "Z-C", name: "Zone C (East)", status: "Medium", density: 60 },
    { id: "Z-D", name: "Zone D (West)", status: "High", density: 80 },
  ],
};

export const mockParkingData = {
  lots: [
    { id: "P1", name: "Lot 1 (VIP)", total: 500, available: 12 },
    { id: "P2", name: "Lot 2 (General)", total: 2000, available: 450 },
    { id: "P3", name: "Lot 3 (General)", total: 2000, available: 1200 },
    { id: "P4", name: "Lot 4 (Staff)", total: 300, available: 5 },
  ],
};

export const mockWeather = {
  temp: 24,
  condition: "Clear",
  humidity: 45,
  windSpeed: 12,
};

export const mockSecurityAlerts = [
  { id: 1, type: "Medical", location: "Zone C, Level 2", status: "In Progress", time: "10 mins ago" },
  { id: 2, type: "Crowd Surge", location: "Gate 2", status: "Resolved", time: "25 mins ago" },
  { id: 3, type: "Suspicious Bag", location: "Lot 2", status: "Investigating", time: "2 mins ago" },
];

export const mockVolunteerTasks = [
  { id: "T1", title: "Assist Crowd Flow", location: "Gate 2", priority: "High", status: "Pending" },
  { id: "T2", title: "Medical Escort", location: "Zone A, Row 14", priority: "Critical", status: "Accepted" },
  { id: "T3", title: "Restock Water", location: "Food Court West", priority: "Low", status: "Pending" },
];

export const mockAnnouncements = [
  { id: 1, text: "Welcome to the FIFA World Cup 2026 Quarter Finals!", time: "10:00 AM" },
  { id: 2, text: "Halftime show will begin in 15 minutes. Please return to your seats.", time: "1:45 PM" },
  { id: 3, text: "Gate 3 is currently experiencing heavy traffic. Use Gate 4 for faster exit.", time: "4:00 PM" },
];
