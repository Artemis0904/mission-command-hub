// IWTS (Infantry Weapons Training System) Mock Data

// IWTS Stations (10 dedicated stations)
export const iwtsStations = [
  { id: 'iwts-01', name: 'IWTS-01', status: 'idle', location: 'Training Hall A', assignedCourseId: null },
  { id: 'iwts-02', name: 'IWTS-02', status: 'in-use', location: 'Training Hall A', assignedCourseId: 'course-001' },
  { id: 'iwts-03', name: 'IWTS-03', status: 'idle', location: 'Training Hall A', assignedCourseId: null },
  { id: 'iwts-04', name: 'IWTS-04', status: 'offline', location: 'Training Hall A', assignedCourseId: null },
  { id: 'iwts-05', name: 'IWTS-05', status: 'idle', location: 'Training Hall B', assignedCourseId: 'course-002' },
  { id: 'iwts-06', name: 'IWTS-06', status: 'in-use', location: 'Training Hall B', assignedCourseId: 'course-001' },
  { id: 'iwts-07', name: 'IWTS-07', status: 'idle', location: 'Training Hall B', assignedCourseId: null },
  { id: 'iwts-08', name: 'IWTS-08', status: 'idle', location: 'Training Hall C', assignedCourseId: null },
  { id: 'iwts-09', name: 'IWTS-09', status: 'in-use', location: 'Training Hall C', assignedCourseId: 'course-003' },
  { id: 'iwts-10', name: 'IWTS-10', status: 'offline', location: 'Training Hall C', assignedCourseId: null },
];

// Pre-defined Exercises (to be combined into custom courses)
export const exercises = [
  { id: 'ex001', name: 'Basic Marksmanship', difficulty: 'easy', timeLimit: 15, targets: 5, description: 'Fundamental shooting skills with stationary targets' },
  { id: 'ex002', name: 'Rapid Fire Drill', difficulty: 'medium', timeLimit: 10, targets: 8, description: 'Quick target acquisition and engagement' },
  { id: 'ex003', name: 'Moving Target Engagement', difficulty: 'hard', timeLimit: 20, targets: 6, description: 'Track and engage moving targets' },
  { id: 'ex004', name: 'Night Vision Ops', difficulty: 'hard', timeLimit: 25, targets: 8, description: 'Low-light environment training' },
  { id: 'ex005', name: 'Close Quarter Combat', difficulty: 'medium', timeLimit: 12, targets: 10, description: 'Urban environment engagement' },
  { id: 'ex006', name: 'Long Range Precision', difficulty: 'hard', timeLimit: 30, targets: 4, description: 'Extended range accuracy training' },
  { id: 'ex007', name: 'Timed Qualification', difficulty: 'medium', timeLimit: 20, targets: 12, description: 'Standard qualification course' },
  { id: 'ex008', name: 'Stress Fire Drill', difficulty: 'hard', timeLimit: 15, targets: 10, description: 'High-pressure scenario training' },
  { id: 'ex009', name: 'Target Identification', difficulty: 'easy', timeLimit: 18, targets: 8, description: 'Friend/foe identification training' },
  { id: 'ex010', name: 'Team Coordination', difficulty: 'medium', timeLimit: 25, targets: 15, description: 'Multi-shooter coordination exercise' },
];

// Custom Courses (combinations of exercises)
export const customCourses = [
  { 
    id: 'course-001', 
    name: 'Basic Training Package', 
    exerciseIds: ['ex001', 'ex002', 'ex007'],
    createdAt: '2026-01-20T10:00:00',
    totalTime: 45,
    totalTargets: 25,
    status: 'active'
  },
  { 
    id: 'course-002', 
    name: 'Advanced Combat Course', 
    exerciseIds: ['ex003', 'ex004', 'ex005', 'ex008'],
    createdAt: '2026-01-21T14:00:00',
    totalTime: 72,
    totalTargets: 34,
    status: 'active'
  },
  { 
    id: 'course-003', 
    name: 'Qualification Prep', 
    exerciseIds: ['ex001', 'ex006', 'ex007'],
    createdAt: '2026-01-22T09:00:00',
    totalTime: 65,
    totalTargets: 21,
    status: 'active'
  },
];

// Trainees
export const trainees = [
  { id: 't001', name: 'SGT John Mitchell', rank: 'Sergeant', unit: 'Alpha Company', avatar: 'JM', totalScore: 94, missionsCompleted: 28, status: 'on-track' },
  { id: 't002', name: 'CPL Sarah Chen', rank: 'Corporal', unit: 'Bravo Company', avatar: 'SC', totalScore: 91, missionsCompleted: 25, status: 'on-track' },
  { id: 't003', name: 'PFC Marcus Johnson', rank: 'Private First Class', unit: 'Alpha Company', avatar: 'MJ', totalScore: 87, missionsCompleted: 22, status: 'on-track' },
  { id: 't004', name: 'SGT Emily Rodriguez', rank: 'Sergeant', unit: 'Charlie Company', avatar: 'ER', totalScore: 85, missionsCompleted: 30, status: 'on-track' },
  { id: 't005', name: 'CPL David Kim', rank: 'Corporal', unit: 'Delta Company', avatar: 'DK', totalScore: 82, missionsCompleted: 19, status: 'delayed' },
  { id: 't006', name: 'PVT Amanda Foster', rank: 'Private', unit: 'Bravo Company', avatar: 'AF', totalScore: 78, missionsCompleted: 15, status: 'on-track' },
  { id: 't007', name: 'SPC Robert Hayes', rank: 'Specialist', unit: 'Echo Company', avatar: 'RH', totalScore: 75, missionsCompleted: 20, status: 'pending' },
  { id: 't008', name: 'CPL Lisa Wang', rank: 'Corporal', unit: 'Alpha Company', avatar: 'LW', totalScore: 72, missionsCompleted: 17, status: 'delayed' },
  { id: 't009', name: 'PFC James Brown', rank: 'Private First Class', unit: 'Charlie Company', avatar: 'JB', totalScore: 69, missionsCompleted: 14, status: 'on-track' },
  { id: 't010', name: 'SGT Michael Lee', rank: 'Sergeant', unit: 'Delta Company', avatar: 'ML', totalScore: 88, missionsCompleted: 26, status: 'on-track' },
];

// Missions (Scheduled)
export const missions = [
  { id: 'm001', name: 'Alpha Team Training', courseId: 'course-001', stationId: 'iwts-02', date: '2026-01-23', time: '09:00', duration: 60, status: 'scheduled', assignedTrainees: ['t001', 't002', 't003'] },
  { id: 'm002', name: 'Advanced Combat Drill', courseId: 'course-002', stationId: 'iwts-06', date: '2026-01-23', time: '14:00', duration: 90, status: 'in-progress', assignedTrainees: ['t004', 't005'] },
  { id: 'm003', name: 'Qualification Test', courseId: 'course-003', stationId: 'iwts-09', date: '2026-01-24', time: '08:00', duration: 75, status: 'scheduled', assignedTrainees: ['t006', 't007', 't008'] },
  { id: 'm004', name: 'Basic Refresher', courseId: 'course-001', stationId: 'iwts-01', date: '2026-01-24', time: '13:00', duration: 60, status: 'scheduled', assignedTrainees: ['t009', 't010'] },
  { id: 'm005', name: 'Night Ops Training', courseId: 'course-002', stationId: 'iwts-05', date: '2026-01-25', time: '20:00', duration: 120, status: 'scheduled', assignedTrainees: ['t001', 't004', 't010'] },
  { id: 'm006', name: 'Pre-Deployment Qual', courseId: 'course-003', stationId: 'iwts-07', date: '2026-01-26', time: '10:00', duration: 75, status: 'scheduled', assignedTrainees: ['t002', 't003'] },
];

// Mission Assignments
export const assignments = [
  { id: 'a001', missionId: 'm001', traineeId: 't001', stationId: 'iwts-02', status: 'assigned', assignedAt: '2026-01-22T08:00:00' },
  { id: 'a002', missionId: 'm001', traineeId: 't002', stationId: 'iwts-02', status: 'in-progress', assignedAt: '2026-01-22T08:00:00' },
  { id: 'a003', missionId: 'm001', traineeId: 't003', stationId: 'iwts-02', status: 'completed', assignedAt: '2026-01-22T08:00:00' },
  { id: 'a004', missionId: 'm002', traineeId: 't004', stationId: 'iwts-06', status: 'in-progress', assignedAt: '2026-01-22T10:00:00' },
  { id: 'a005', missionId: 'm002', traineeId: 't005', stationId: 'iwts-06', status: 'overdue', assignedAt: '2026-01-20T10:00:00' },
];

// Training Progress
export const traineeProgress = [
  { traineeId: 't001', assignedMissions: 12, completedMissions: 10, completionRate: 83, lastActivity: '2026-01-23T08:45:00', status: 'on-track' },
  { traineeId: 't002', assignedMissions: 10, completedMissions: 9, completionRate: 90, lastActivity: '2026-01-23T09:15:00', status: 'on-track' },
  { traineeId: 't003', assignedMissions: 6, completedMissions: 4, completionRate: 67, lastActivity: '2026-01-21T11:00:00', status: 'delayed' },
  { traineeId: 't004', assignedMissions: 15, completedMissions: 15, completionRate: 100, lastActivity: '2026-01-23T14:30:00', status: 'on-track' },
  { traineeId: 't005', assignedMissions: 8, completedMissions: 5, completionRate: 62, lastActivity: '2026-01-19T10:00:00', status: 'pending' },
];

// Scores / Leaderboard
export const scores = [
  { id: 's001', traineeId: 't001', missionId: 'm001', score: 96, accuracy: 94, timeSeconds: 1650, date: '2026-01-22', result: 'pass' },
  { id: 's002', traineeId: 't002', missionId: 'm001', score: 92, accuracy: 91, timeSeconds: 1720, date: '2026-01-22', result: 'pass' },
  { id: 's003', traineeId: 't004', missionId: 'm002', score: 98, accuracy: 97, timeSeconds: 2100, date: '2026-01-23', result: 'pass' },
  { id: 's004', traineeId: 't003', missionId: 'm001', score: 85, accuracy: 82, timeSeconds: 1800, date: '2026-01-22', result: 'pass' },
  { id: 's005', traineeId: 't010', missionId: 'm003', score: 88, accuracy: 85, timeSeconds: 1400, date: '2026-01-20', result: 'pass' },
  { id: 's006', traineeId: 't005', missionId: 'm002', score: 72, accuracy: 70, timeSeconds: 2500, date: '2026-01-21', result: 'fail' },
];

// Compliance Alerts
export const complianceAlerts = [
  { id: 'c001', traineeId: 't005', type: 'overdue', message: 'Qualification overdue by 3 days', severity: 'high', createdAt: '2026-01-23T08:00:00' },
  { id: 'c002', traineeId: 't008', type: 'inactive', message: 'No training activity in 7 days', severity: 'medium', createdAt: '2026-01-22T12:00:00' },
  { id: 'c003', traineeId: 't007', type: 'pending', message: 'Pending training completion', severity: 'low', createdAt: '2026-01-21T09:00:00' },
  { id: 'c004', traineeId: 't003', type: 'overdue', message: 'Recertification required', severity: 'high', createdAt: '2026-01-23T06:00:00' },
  { id: 'c005', traineeId: 't006', type: 'inactive', message: 'No activity in last 5 days', severity: 'medium', createdAt: '2026-01-22T14:00:00' },
];

// Reports / Session History
export const sessionReports = [
  { id: 'r001', sessionId: 'SES-2026-0122-001', traineeId: 't001', missionId: 'm001', score: 96, result: 'pass', dateTime: '2026-01-22T10:30:00', duration: 28 },
  { id: 'r002', sessionId: 'SES-2026-0122-002', traineeId: 't002', missionId: 'm001', score: 92, result: 'pass', dateTime: '2026-01-22T11:15:00', duration: 30 },
  { id: 'r003', sessionId: 'SES-2026-0123-001', traineeId: 't004', missionId: 'm002', score: 98, result: 'pass', dateTime: '2026-01-23T14:45:00', duration: 42 },
  { id: 'r004', sessionId: 'SES-2026-0121-001', traineeId: 't003', missionId: 'm001', score: 85, result: 'pass', dateTime: '2026-01-21T09:00:00', duration: 32 },
  { id: 'r005', sessionId: 'SES-2026-0120-001', traineeId: 't010', missionId: 'm003', score: 88, result: 'pass', dateTime: '2026-01-20T08:30:00', duration: 25 },
  { id: 'r006', sessionId: 'SES-2026-0121-002', traineeId: 't005', missionId: 'm002', score: 72, result: 'fail', dateTime: '2026-01-21T15:00:00', duration: 48 },
  { id: 'r007', sessionId: 'SES-2026-0119-001', traineeId: 't006', missionId: 'm004', score: 81, result: 'pass', dateTime: '2026-01-19T13:00:00', duration: 22 },
  { id: 'r008', sessionId: 'SES-2026-0118-001', traineeId: 't007', missionId: 'm003', score: 77, result: 'pass', dateTime: '2026-01-18T10:00:00', duration: 35 },
];

// Replay Events (for session replay)
export const replayEvents = {
  'SES-2026-0123-001': [
    { time: 0, event: 'Session Started', details: 'Course: Advanced Combat Course' },
    { time: 45, event: 'Target 1 Engaged', details: 'Hit - Center mass' },
    { time: 120, event: 'Target 2 Engaged', details: 'Hit - Headshot' },
    { time: 210, event: 'Target 3 Engaged', details: 'Hit - Center mass' },
    { time: 340, event: 'Target 4 Engaged', details: 'Hit - Center mass' },
    { time: 480, event: 'Exercise Complete', details: 'Moving to next exercise' },
    { time: 520, event: 'Target 5 Engaged', details: 'Hit - Center mass' },
    { time: 680, event: 'Target 6 Engaged', details: 'Miss - Wind miscalculation' },
    { time: 750, event: 'Target 6 Re-engaged', details: 'Hit - Center mass' },
    { time: 920, event: 'Target 7 Engaged', details: 'Hit - Headshot' },
    { time: 1100, event: 'Target 8 Engaged', details: 'Hit - Center mass' },
    { time: 1250, event: 'Session Complete', details: 'Final Score: 98, Accuracy: 97%' },
  ],
};

// Dashboard Stats
export const dashboardStats = {
  totalStations: 10,
  activeStations: 7,
  stationsInUse: 3,
  upcomingMissions: 6,
  pendingCompletions: 8,
  recentReports: 12,
  todaysMissions: 2,
  pendingAssignments: 5,
  complianceAlerts: 5,
  customCourses: 3,
};

// Helper functions
export function getTraineeById(id: string) {
  return trainees.find(t => t.id === id);
}

export function getExerciseById(id: string) {
  return exercises.find(e => e.id === id);
}

export function getCourseById(id: string) {
  return customCourses.find(c => c.id === id);
}

export function getStationById(id: string) {
  return iwtsStations.find(s => s.id === id);
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return 'Just now';
}
