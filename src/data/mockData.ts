// Dummy data for C2 Station Dashboard

// Simulator Types
export const simulatorTypes = [
  { id: 'ctn', name: 'CTN', fullName: 'Counter Terrorism Network', icon: 'Target', color: 'primary' },
  { id: 'sniper', name: 'Sniper', fullName: 'Precision Sniper Training', icon: 'Crosshair', color: 'accent' },
  { id: 'mortar', name: 'Mortar', fullName: 'Mortar Fire Control', icon: 'Bomb', color: 'destructive' },
  { id: 'agl', name: 'AGL', fullName: 'Automatic Grenade Launcher', icon: 'Zap', color: 'info' },
];

// Simulator Units
export const simulatorUnits = [
  { id: 'ctn-01', typeId: 'ctn', name: 'CTN-01', status: 'idle', location: 'Building A, Room 101' },
  { id: 'ctn-02', typeId: 'ctn', name: 'CTN-02', status: 'in-mission', location: 'Building A, Room 102' },
  { id: 'ctn-03', typeId: 'ctn', name: 'CTN-03', status: 'offline', location: 'Building A, Room 103' },
  { id: 'ctn-04', typeId: 'ctn', name: 'CTN-04', status: 'idle', location: 'Building A, Room 104' },
  { id: 'sniper-01', typeId: 'sniper', name: 'SNIPER-01', status: 'in-mission', location: 'Building B, Range 1' },
  { id: 'sniper-02', typeId: 'sniper', name: 'SNIPER-02', status: 'idle', location: 'Building B, Range 2' },
  { id: 'sniper-03', typeId: 'sniper', name: 'SNIPER-03', status: 'idle', location: 'Building B, Range 3' },
  { id: 'mortar-01', typeId: 'mortar', name: 'MORTAR-01', status: 'idle', location: 'Field Station Alpha' },
  { id: 'mortar-02', typeId: 'mortar', name: 'MORTAR-02', status: 'in-mission', location: 'Field Station Beta' },
  { id: 'agl-01', typeId: 'agl', name: 'AGL-01', status: 'idle', location: 'Range Complex C' },
  { id: 'agl-02', typeId: 'agl', name: 'AGL-02', status: 'offline', location: 'Range Complex C' },
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

// Exercises
export const exercises = [
  { id: 'ex001', name: 'Urban Engagement Alpha', simulatorType: 'ctn', difficulty: 'hard', timeLimit: 30, targets: 12, status: 'published' },
  { id: 'ex002', name: 'Long Range Precision', simulatorType: 'sniper', difficulty: 'hard', timeLimit: 45, targets: 8, status: 'published' },
  { id: 'ex003', name: 'Fire Control Basics', simulatorType: 'mortar', difficulty: 'easy', timeLimit: 20, targets: 5, status: 'published' },
  { id: 'ex004', name: 'Rapid Engagement Drill', simulatorType: 'agl', difficulty: 'medium', timeLimit: 25, targets: 15, status: 'published' },
  { id: 'ex005', name: 'Night Operations', simulatorType: 'ctn', difficulty: 'hard', timeLimit: 40, targets: 10, status: 'draft' },
  { id: 'ex006', name: 'Moving Target Intercept', simulatorType: 'sniper', difficulty: 'medium', timeLimit: 35, targets: 6, status: 'published' },
  { id: 'ex007', name: 'Coordinated Fire Mission', simulatorType: 'mortar', difficulty: 'hard', timeLimit: 50, targets: 8, status: 'published' },
  { id: 'ex008', name: 'Suppression Tactics', simulatorType: 'agl', difficulty: 'easy', timeLimit: 15, targets: 20, status: 'draft' },
];

// Missions (Scheduled)
export const missions = [
  { id: 'm001', name: 'Alpha Team Training', exerciseId: 'ex001', simulatorType: 'ctn', date: '2026-01-23', time: '09:00', duration: 60, status: 'scheduled', assignedTrainees: ['t001', 't002', 't003'] },
  { id: 'm002', name: 'Sniper Qualification', exerciseId: 'ex002', simulatorType: 'sniper', date: '2026-01-23', time: '14:00', duration: 90, status: 'in-progress', assignedTrainees: ['t004', 't005'] },
  { id: 'm003', name: 'Mortar Crew Exercise', exerciseId: 'ex003', simulatorType: 'mortar', date: '2026-01-24', time: '08:00', duration: 45, status: 'scheduled', assignedTrainees: ['t006', 't007', 't008'] },
  { id: 'm004', name: 'AGL Familiarization', exerciseId: 'ex004', simulatorType: 'agl', date: '2026-01-24', time: '13:00', duration: 60, status: 'scheduled', assignedTrainees: ['t009', 't010'] },
  { id: 'm005', name: 'Night Ops Prep', exerciseId: 'ex005', simulatorType: 'ctn', date: '2026-01-25', time: '20:00', duration: 120, status: 'scheduled', assignedTrainees: ['t001', 't004', 't010'] },
  { id: 'm006', name: 'Precision Drill', exerciseId: 'ex006', simulatorType: 'sniper', date: '2026-01-26', time: '10:00', duration: 75, status: 'scheduled', assignedTrainees: ['t002', 't003'] },
];

// Mission Assignments
export const assignments = [
  { id: 'a001', missionId: 'm001', traineeId: 't001', simulatorId: 'ctn-01', status: 'assigned', assignedAt: '2026-01-22T08:00:00' },
  { id: 'a002', missionId: 'm001', traineeId: 't002', simulatorId: 'ctn-02', status: 'in-progress', assignedAt: '2026-01-22T08:00:00' },
  { id: 'a003', missionId: 'm001', traineeId: 't003', simulatorId: 'ctn-04', status: 'completed', assignedAt: '2026-01-22T08:00:00' },
  { id: 'a004', missionId: 'm002', traineeId: 't004', simulatorId: 'sniper-01', status: 'in-progress', assignedAt: '2026-01-22T10:00:00' },
  { id: 'a005', missionId: 'm002', traineeId: 't005', simulatorId: 'sniper-02', status: 'overdue', assignedAt: '2026-01-20T10:00:00' },
];

// Training Progress
export const traineeProgress = [
  { traineeId: 't001', simulatorType: 'ctn', assignedMissions: 12, completedMissions: 10, completionRate: 83, lastActivity: '2026-01-23T08:45:00', status: 'on-track' },
  { traineeId: 't001', simulatorType: 'sniper', assignedMissions: 8, completedMissions: 8, completionRate: 100, lastActivity: '2026-01-22T16:30:00', status: 'on-track' },
  { traineeId: 't002', simulatorType: 'ctn', assignedMissions: 10, completedMissions: 9, completionRate: 90, lastActivity: '2026-01-23T09:15:00', status: 'on-track' },
  { traineeId: 't003', simulatorType: 'mortar', assignedMissions: 6, completedMissions: 4, completionRate: 67, lastActivity: '2026-01-21T11:00:00', status: 'delayed' },
  { traineeId: 't004', simulatorType: 'sniper', assignedMissions: 15, completedMissions: 15, completionRate: 100, lastActivity: '2026-01-23T14:30:00', status: 'on-track' },
  { traineeId: 't005', simulatorType: 'agl', assignedMissions: 8, completedMissions: 5, completionRate: 62, lastActivity: '2026-01-19T10:00:00', status: 'pending' },
];

// Scores / Leaderboard
export const scores = [
  { id: 's001', traineeId: 't001', missionId: 'm001', simulatorType: 'ctn', score: 96, accuracy: 94, timeSeconds: 1650, date: '2026-01-22', result: 'pass' },
  { id: 's002', traineeId: 't002', missionId: 'm001', simulatorType: 'ctn', score: 92, accuracy: 91, timeSeconds: 1720, date: '2026-01-22', result: 'pass' },
  { id: 's003', traineeId: 't004', missionId: 'm002', simulatorType: 'sniper', score: 98, accuracy: 97, timeSeconds: 2100, date: '2026-01-23', result: 'pass' },
  { id: 's004', traineeId: 't003', missionId: 'm001', simulatorType: 'ctn', score: 85, accuracy: 82, timeSeconds: 1800, date: '2026-01-22', result: 'pass' },
  { id: 's005', traineeId: 't010', missionId: 'm003', simulatorType: 'mortar', score: 88, accuracy: 85, timeSeconds: 1400, date: '2026-01-20', result: 'pass' },
  { id: 's006', traineeId: 't005', missionId: 'm002', simulatorType: 'sniper', score: 72, accuracy: 70, timeSeconds: 2500, date: '2026-01-21', result: 'fail' },
];

// Compliance Alerts
export const complianceAlerts = [
  { id: 'c001', traineeId: 't005', type: 'overdue', message: 'Sniper qualification overdue by 3 days', severity: 'high', createdAt: '2026-01-23T08:00:00' },
  { id: 'c002', traineeId: 't008', type: 'inactive', message: 'No training activity in 7 days', severity: 'medium', createdAt: '2026-01-22T12:00:00' },
  { id: 'c003', traineeId: 't007', type: 'pending', message: 'Pending training completion for Mortar basics', severity: 'low', createdAt: '2026-01-21T09:00:00' },
  { id: 'c004', traineeId: 't003', type: 'overdue', message: 'CTN recertification required', severity: 'high', createdAt: '2026-01-23T06:00:00' },
  { id: 'c005', traineeId: 't006', type: 'inactive', message: 'No activity in last 5 days', severity: 'medium', createdAt: '2026-01-22T14:00:00' },
];

// Reports / Session History
export const sessionReports = [
  { id: 'r001', sessionId: 'SES-2026-0122-001', traineeId: 't001', missionId: 'm001', simulatorType: 'ctn', score: 96, result: 'pass', dateTime: '2026-01-22T10:30:00', duration: 28 },
  { id: 'r002', sessionId: 'SES-2026-0122-002', traineeId: 't002', missionId: 'm001', simulatorType: 'ctn', score: 92, result: 'pass', dateTime: '2026-01-22T11:15:00', duration: 30 },
  { id: 'r003', sessionId: 'SES-2026-0123-001', traineeId: 't004', missionId: 'm002', simulatorType: 'sniper', score: 98, result: 'pass', dateTime: '2026-01-23T14:45:00', duration: 42 },
  { id: 'r004', sessionId: 'SES-2026-0121-001', traineeId: 't003', missionId: 'm001', simulatorType: 'ctn', score: 85, result: 'pass', dateTime: '2026-01-21T09:00:00', duration: 32 },
  { id: 'r005', sessionId: 'SES-2026-0120-001', traineeId: 't010', missionId: 'm003', simulatorType: 'mortar', score: 88, result: 'pass', dateTime: '2026-01-20T08:30:00', duration: 25 },
  { id: 'r006', sessionId: 'SES-2026-0121-002', traineeId: 't005', missionId: 'm002', simulatorType: 'sniper', score: 72, result: 'fail', dateTime: '2026-01-21T15:00:00', duration: 48 },
  { id: 'r007', sessionId: 'SES-2026-0119-001', traineeId: 't006', missionId: 'm004', simulatorType: 'agl', score: 81, result: 'pass', dateTime: '2026-01-19T13:00:00', duration: 22 },
  { id: 'r008', sessionId: 'SES-2026-0118-001', traineeId: 't007', missionId: 'm003', simulatorType: 'mortar', score: 77, result: 'pass', dateTime: '2026-01-18T10:00:00', duration: 35 },
];

// Replay Events (for session replay)
export const replayEvents = {
  'SES-2026-0123-001': [
    { time: 0, event: 'Session Started', details: 'Mission: Sniper Qualification' },
    { time: 45, event: 'Target 1 Engaged', details: 'Hit - Center mass, 450m' },
    { time: 120, event: 'Target 2 Engaged', details: 'Hit - Headshot, 500m' },
    { time: 210, event: 'Target 3 Engaged', details: 'Hit - Center mass, 550m' },
    { time: 340, event: 'Target 4 Engaged', details: 'Hit - Center mass, 600m' },
    { time: 480, event: 'Wind Adjustment', details: 'Windage +2 MOA' },
    { time: 520, event: 'Target 5 Engaged', details: 'Hit - Center mass, 650m' },
    { time: 680, event: 'Target 6 Engaged', details: 'Miss - Wind miscalculation' },
    { time: 750, event: 'Target 6 Re-engaged', details: 'Hit - Center mass, 700m' },
    { time: 920, event: 'Target 7 Engaged', details: 'Hit - Headshot, 750m' },
    { time: 1100, event: 'Target 8 Engaged', details: 'Hit - Center mass, 800m' },
    { time: 1250, event: 'Session Complete', details: 'Final Score: 98, Accuracy: 97%' },
  ],
};

// Dashboard Stats
export const dashboardStats = {
  activeSimulatorTypes: 4,
  totalSimulators: 11,
  activeSimulators: 8,
  upcomingMissions: 6,
  pendingCompletions: 8,
  recentReports: 12,
  todaysMissions: 2,
  pendingAssignments: 5,
  complianceAlerts: 5,
};

// Helper functions
export function getTraineeById(id: string) {
  return trainees.find(t => t.id === id);
}

export function getSimulatorTypeName(id: string) {
  return simulatorTypes.find(t => t.id === id)?.name || id.toUpperCase();
}

export function getExerciseById(id: string) {
  return exercises.find(e => e.id === id);
}

export function getSimulatorsByType(typeId: string) {
  return simulatorUnits.filter(s => s.typeId === typeId);
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
