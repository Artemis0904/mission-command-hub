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

// Exercise Types (10 categories)
export const exerciseTypes = [
  { id: 'type-rainy', name: 'Rainy', icon: 'cloud-rain', description: 'Wet weather conditions training' },
  { id: 'type-wind', name: 'Wind', icon: 'wind', description: 'High wind environment training' },
  { id: 'type-uphill', name: 'Uphill', icon: 'mountain', description: 'Elevated terrain shooting' },
  { id: 'type-distance', name: 'Distance', icon: 'crosshair', description: 'Long range engagement' },
  { id: 'type-night', name: 'Night', icon: 'moon', description: 'Low-light conditions' },
  { id: 'type-urban', name: 'Urban', icon: 'building', description: 'Urban warfare scenarios' },
  { id: 'type-moving', name: 'Moving Target', icon: 'move', description: 'Dynamic target engagement' },
  { id: 'type-stress', name: 'Stress', icon: 'zap', description: 'High-pressure scenarios' },
  { id: 'type-tactical', name: 'Tactical', icon: 'shield', description: 'Tactical movement drills' },
  { id: 'type-qualification', name: 'Qualification', icon: 'award', description: 'Standard qualification tests' },
];

// Pre-defined Exercises organized by type (10 exercises per type = 100 total)
export const exercises = [
  // Rainy (type-rainy)
  { id: 'ex-rainy-01', typeId: 'type-rainy', name: 'Light Rain Basics', difficulty: 'easy', timeLimit: 12, targets: 5, description: 'Basic marksmanship in light rain' },
  { id: 'ex-rainy-02', typeId: 'type-rainy', name: 'Heavy Downpour', difficulty: 'hard', timeLimit: 18, targets: 8, description: 'Visibility impaired by heavy rain' },
  { id: 'ex-rainy-03', typeId: 'type-rainy', name: 'Fog & Mist', difficulty: 'medium', timeLimit: 15, targets: 6, description: 'Limited visibility with fog' },
  { id: 'ex-rainy-04', typeId: 'type-rainy', name: 'Wet Terrain Movement', difficulty: 'medium', timeLimit: 20, targets: 7, description: 'Shooting while moving on wet ground' },
  { id: 'ex-rainy-05', typeId: 'type-rainy', name: 'Storm Conditions', difficulty: 'hard', timeLimit: 25, targets: 10, description: 'Extreme weather engagement' },
  { id: 'ex-rainy-06', typeId: 'type-rainy', name: 'Drizzle Precision', difficulty: 'easy', timeLimit: 10, targets: 4, description: 'Precision shots in drizzle' },
  { id: 'ex-rainy-07', typeId: 'type-rainy', name: 'Puddle Navigation', difficulty: 'medium', timeLimit: 16, targets: 8, description: 'Navigate wet terrain obstacles' },
  { id: 'ex-rainy-08', typeId: 'type-rainy', name: 'Monsoon Drill', difficulty: 'hard', timeLimit: 22, targets: 12, description: 'Monsoon-level conditions' },
  { id: 'ex-rainy-09', typeId: 'type-rainy', name: 'Slick Surface Stance', difficulty: 'medium', timeLimit: 14, targets: 6, description: 'Maintain stance on slick surfaces' },
  { id: 'ex-rainy-10', typeId: 'type-rainy', name: 'Rain & Thunder', difficulty: 'hard', timeLimit: 28, targets: 15, description: 'Full storm simulation' },

  // Wind (type-wind)
  { id: 'ex-wind-01', typeId: 'type-wind', name: 'Light Breeze', difficulty: 'easy', timeLimit: 10, targets: 5, description: 'Basic wind compensation' },
  { id: 'ex-wind-02', typeId: 'type-wind', name: 'Crosswind Challenge', difficulty: 'medium', timeLimit: 15, targets: 7, description: 'Strong crosswind shooting' },
  { id: 'ex-wind-03', typeId: 'type-wind', name: 'Gusty Conditions', difficulty: 'hard', timeLimit: 20, targets: 8, description: 'Variable wind gusts' },
  { id: 'ex-wind-04', typeId: 'type-wind', name: 'Headwind Accuracy', difficulty: 'medium', timeLimit: 12, targets: 6, description: 'Shooting into headwind' },
  { id: 'ex-wind-05', typeId: 'type-wind', name: 'Tailwind Adjustment', difficulty: 'easy', timeLimit: 10, targets: 5, description: 'Compensate for tailwind' },
  { id: 'ex-wind-06', typeId: 'type-wind', name: 'Hurricane Simulation', difficulty: 'hard', timeLimit: 25, targets: 10, description: 'Extreme wind conditions' },
  { id: 'ex-wind-07', typeId: 'type-wind', name: 'Wind Reading', difficulty: 'medium', timeLimit: 18, targets: 8, description: 'Read and adjust for wind' },
  { id: 'ex-wind-08', typeId: 'type-wind', name: 'Dust Storm', difficulty: 'hard', timeLimit: 22, targets: 9, description: 'Wind with reduced visibility' },
  { id: 'ex-wind-09', typeId: 'type-wind', name: 'Variable Windage', difficulty: 'medium', timeLimit: 16, targets: 7, description: 'Changing wind patterns' },
  { id: 'ex-wind-10', typeId: 'type-wind', name: 'Coastal Winds', difficulty: 'hard', timeLimit: 20, targets: 12, description: 'Ocean wind conditions' },

  // Uphill (type-uphill)
  { id: 'ex-uphill-01', typeId: 'type-uphill', name: 'Gentle Incline', difficulty: 'easy', timeLimit: 12, targets: 5, description: 'Slight elevation shooting' },
  { id: 'ex-uphill-02', typeId: 'type-uphill', name: 'Steep Ascent', difficulty: 'hard', timeLimit: 20, targets: 8, description: 'Steep angle engagement' },
  { id: 'ex-uphill-03', typeId: 'type-uphill', name: 'Mountain Ridge', difficulty: 'hard', timeLimit: 25, targets: 10, description: 'Ridge line shooting' },
  { id: 'ex-uphill-04', typeId: 'type-uphill', name: 'Hill Crest', difficulty: 'medium', timeLimit: 15, targets: 6, description: 'Shooting from hill crest' },
  { id: 'ex-uphill-05', typeId: 'type-uphill', name: 'Rocky Terrain', difficulty: 'medium', timeLimit: 18, targets: 7, description: 'Unstable rocky surface' },
  { id: 'ex-uphill-06', typeId: 'type-uphill', name: 'Valley to Peak', difficulty: 'hard', timeLimit: 22, targets: 9, description: 'Low to high elevation' },
  { id: 'ex-uphill-07', typeId: 'type-uphill', name: 'Cliff Edge', difficulty: 'hard', timeLimit: 28, targets: 12, description: 'Shooting near cliff edges' },
  { id: 'ex-uphill-08', typeId: 'type-uphill', name: 'Slope Stability', difficulty: 'medium', timeLimit: 14, targets: 6, description: 'Maintain position on slopes' },
  { id: 'ex-uphill-09', typeId: 'type-uphill', name: 'Elevation Basics', difficulty: 'easy', timeLimit: 10, targets: 4, description: 'Basic elevation adjustment' },
  { id: 'ex-uphill-10', typeId: 'type-uphill', name: 'Summit Assault', difficulty: 'hard', timeLimit: 30, targets: 15, description: 'Full mountain assault' },

  // Distance (type-distance)
  { id: 'ex-dist-01', typeId: 'type-distance', name: '100m Standard', difficulty: 'easy', timeLimit: 10, targets: 5, description: 'Basic 100m engagement' },
  { id: 'ex-dist-02', typeId: 'type-distance', name: '200m Precision', difficulty: 'easy', timeLimit: 12, targets: 5, description: '200m precision shots' },
  { id: 'ex-dist-03', typeId: 'type-distance', name: '300m Challenge', difficulty: 'medium', timeLimit: 15, targets: 6, description: 'Medium range accuracy' },
  { id: 'ex-dist-04', typeId: 'type-distance', name: '400m Engagement', difficulty: 'medium', timeLimit: 18, targets: 7, description: 'Extended range shooting' },
  { id: 'ex-dist-05', typeId: 'type-distance', name: '500m Long Shot', difficulty: 'hard', timeLimit: 22, targets: 6, description: 'Long range basics' },
  { id: 'ex-dist-06', typeId: 'type-distance', name: '600m Expert', difficulty: 'hard', timeLimit: 25, targets: 6, description: 'Expert range shooting' },
  { id: 'ex-dist-07', typeId: 'type-distance', name: '700m Sniper', difficulty: 'hard', timeLimit: 28, targets: 5, description: 'Sniper range training' },
  { id: 'ex-dist-08', typeId: 'type-distance', name: '800m Master', difficulty: 'hard', timeLimit: 30, targets: 4, description: 'Master range accuracy' },
  { id: 'ex-dist-09', typeId: 'type-distance', name: 'Variable Range', difficulty: 'medium', timeLimit: 20, targets: 8, description: 'Mixed distance targets' },
  { id: 'ex-dist-10', typeId: 'type-distance', name: 'Max Range', difficulty: 'hard', timeLimit: 35, targets: 3, description: 'Maximum effective range' },

  // Night (type-night)
  { id: 'ex-night-01', typeId: 'type-night', name: 'Dusk Transition', difficulty: 'easy', timeLimit: 12, targets: 5, description: 'Transition to low light' },
  { id: 'ex-night-02', typeId: 'type-night', name: 'Moonlit Night', difficulty: 'medium', timeLimit: 15, targets: 6, description: 'Shooting with moonlight' },
  { id: 'ex-night-03', typeId: 'type-night', name: 'Pitch Black', difficulty: 'hard', timeLimit: 20, targets: 6, description: 'Zero ambient light' },
  { id: 'ex-night-04', typeId: 'type-night', name: 'NVG Basics', difficulty: 'medium', timeLimit: 18, targets: 7, description: 'Night vision basics' },
  { id: 'ex-night-05', typeId: 'type-night', name: 'NVG Advanced', difficulty: 'hard', timeLimit: 25, targets: 10, description: 'Advanced NVG operations' },
  { id: 'ex-night-06', typeId: 'type-night', name: 'Flashlight Ops', difficulty: 'medium', timeLimit: 14, targets: 6, description: 'Weapon-mounted light' },
  { id: 'ex-night-07', typeId: 'type-night', name: 'Starlight Only', difficulty: 'hard', timeLimit: 22, targets: 8, description: 'Minimal natural light' },
  { id: 'ex-night-08', typeId: 'type-night', name: 'IR Laser', difficulty: 'hard', timeLimit: 20, targets: 8, description: 'IR laser targeting' },
  { id: 'ex-night-09', typeId: 'type-night', name: 'Dawn Patrol', difficulty: 'easy', timeLimit: 10, targets: 5, description: 'Early morning light' },
  { id: 'ex-night-10', typeId: 'type-night', name: 'Full Night Ops', difficulty: 'hard', timeLimit: 30, targets: 12, description: 'Complete night mission' },

  // Urban (type-urban)
  { id: 'ex-urban-01', typeId: 'type-urban', name: 'Room Entry', difficulty: 'medium', timeLimit: 10, targets: 4, description: 'Basic room clearing' },
  { id: 'ex-urban-02', typeId: 'type-urban', name: 'Hallway Advance', difficulty: 'medium', timeLimit: 12, targets: 5, description: 'Corridor movement' },
  { id: 'ex-urban-03', typeId: 'type-urban', name: 'Stairwell Combat', difficulty: 'hard', timeLimit: 15, targets: 6, description: 'Vertical movement' },
  { id: 'ex-urban-04', typeId: 'type-urban', name: 'Window Engagement', difficulty: 'medium', timeLimit: 14, targets: 6, description: 'Shooting through windows' },
  { id: 'ex-urban-05', typeId: 'type-urban', name: 'Street Combat', difficulty: 'hard', timeLimit: 20, targets: 10, description: 'Open street scenarios' },
  { id: 'ex-urban-06', typeId: 'type-urban', name: 'Vehicle Cover', difficulty: 'medium', timeLimit: 16, targets: 7, description: 'Using vehicles as cover' },
  { id: 'ex-urban-07', typeId: 'type-urban', name: 'Rooftop Ops', difficulty: 'hard', timeLimit: 22, targets: 8, description: 'Elevated urban positions' },
  { id: 'ex-urban-08', typeId: 'type-urban', name: 'CQB Basics', difficulty: 'easy', timeLimit: 8, targets: 4, description: 'Close quarters basics' },
  { id: 'ex-urban-09', typeId: 'type-urban', name: 'Building Assault', difficulty: 'hard', timeLimit: 28, targets: 12, description: 'Full building clearance' },
  { id: 'ex-urban-10', typeId: 'type-urban', name: 'Hostage Rescue', difficulty: 'hard', timeLimit: 25, targets: 8, description: 'Precision hostage scenario' },

  // Moving Target (type-moving)
  { id: 'ex-moving-01', typeId: 'type-moving', name: 'Slow Traverse', difficulty: 'easy', timeLimit: 12, targets: 5, description: 'Slow moving targets' },
  { id: 'ex-moving-02', typeId: 'type-moving', name: 'Fast Traverse', difficulty: 'hard', timeLimit: 15, targets: 6, description: 'Fast moving targets' },
  { id: 'ex-moving-03', typeId: 'type-moving', name: 'Pop-up Targets', difficulty: 'medium', timeLimit: 14, targets: 8, description: 'Appearing targets' },
  { id: 'ex-moving-04', typeId: 'type-moving', name: 'Bob & Weave', difficulty: 'hard', timeLimit: 18, targets: 6, description: 'Erratic movement patterns' },
  { id: 'ex-moving-05', typeId: 'type-moving', name: 'Linear Track', difficulty: 'easy', timeLimit: 10, targets: 5, description: 'Predictable linear movement' },
  { id: 'ex-moving-06', typeId: 'type-moving', name: 'Circular Motion', difficulty: 'medium', timeLimit: 16, targets: 6, description: 'Circular target paths' },
  { id: 'ex-moving-07', typeId: 'type-moving', name: 'Random Pattern', difficulty: 'hard', timeLimit: 22, targets: 8, description: 'Unpredictable patterns' },
  { id: 'ex-moving-08', typeId: 'type-moving', name: 'Multi-Speed', difficulty: 'medium', timeLimit: 18, targets: 7, description: 'Variable speed targets' },
  { id: 'ex-moving-09', typeId: 'type-moving', name: 'Disappearing', difficulty: 'hard', timeLimit: 20, targets: 10, description: 'Quick exposure windows' },
  { id: 'ex-moving-10', typeId: 'type-moving', name: 'Full Dynamic', difficulty: 'hard', timeLimit: 25, targets: 12, description: 'Complete dynamic course' },

  // Stress (type-stress)
  { id: 'ex-stress-01', typeId: 'type-stress', name: 'Timed Pressure', difficulty: 'medium', timeLimit: 8, targets: 5, description: 'Tight time constraints' },
  { id: 'ex-stress-02', typeId: 'type-stress', name: 'Physical Fatigue', difficulty: 'hard', timeLimit: 15, targets: 6, description: 'Post-exercise shooting' },
  { id: 'ex-stress-03', typeId: 'type-stress', name: 'Audio Distraction', difficulty: 'medium', timeLimit: 12, targets: 6, description: 'Loud audio distractions' },
  { id: 'ex-stress-04', typeId: 'type-stress', name: 'Multi-Task', difficulty: 'hard', timeLimit: 20, targets: 8, description: 'Simultaneous objectives' },
  { id: 'ex-stress-05', typeId: 'type-stress', name: 'Time Crunch', difficulty: 'hard', timeLimit: 6, targets: 6, description: 'Minimal time allowed' },
  { id: 'ex-stress-06', typeId: 'type-stress', name: 'Decision Making', difficulty: 'medium', timeLimit: 15, targets: 8, description: 'Friend/foe decisions' },
  { id: 'ex-stress-07', typeId: 'type-stress', name: 'Chaos Scenario', difficulty: 'hard', timeLimit: 22, targets: 10, description: 'Multiple stressors' },
  { id: 'ex-stress-08', typeId: 'type-stress', name: 'Stamina Test', difficulty: 'hard', timeLimit: 30, targets: 15, description: 'Extended stress exposure' },
  { id: 'ex-stress-09', typeId: 'type-stress', name: 'Quick Decisions', difficulty: 'medium', timeLimit: 10, targets: 6, description: 'Rapid decision making' },
  { id: 'ex-stress-10', typeId: 'type-stress', name: 'Combat Stress', difficulty: 'hard', timeLimit: 25, targets: 12, description: 'Full combat simulation' },

  // Tactical (type-tactical)
  { id: 'ex-tactical-01', typeId: 'type-tactical', name: 'Cover Movement', difficulty: 'medium', timeLimit: 15, targets: 6, description: 'Move between cover' },
  { id: 'ex-tactical-02', typeId: 'type-tactical', name: 'Bounding Fire', difficulty: 'hard', timeLimit: 20, targets: 8, description: 'Alternating advance' },
  { id: 'ex-tactical-03', typeId: 'type-tactical', name: 'Flanking Maneuver', difficulty: 'hard', timeLimit: 22, targets: 8, description: 'Side approach tactics' },
  { id: 'ex-tactical-04', typeId: 'type-tactical', name: 'Retreat Fire', difficulty: 'medium', timeLimit: 18, targets: 7, description: 'Shooting while retreating' },
  { id: 'ex-tactical-05', typeId: 'type-tactical', name: 'Ambush Response', difficulty: 'hard', timeLimit: 15, targets: 10, description: 'React to ambush' },
  { id: 'ex-tactical-06', typeId: 'type-tactical', name: 'Formation Drill', difficulty: 'medium', timeLimit: 20, targets: 8, description: 'Team formation shooting' },
  { id: 'ex-tactical-07', typeId: 'type-tactical', name: 'Concealment Use', difficulty: 'easy', timeLimit: 12, targets: 5, description: 'Using concealment' },
  { id: 'ex-tactical-08', typeId: 'type-tactical', name: 'Fire & Move', difficulty: 'medium', timeLimit: 16, targets: 7, description: 'Shoot while moving' },
  { id: 'ex-tactical-09', typeId: 'type-tactical', name: 'Squad Tactics', difficulty: 'hard', timeLimit: 28, targets: 12, description: 'Full squad coordination' },
  { id: 'ex-tactical-10', typeId: 'type-tactical', name: 'Tactical Advance', difficulty: 'hard', timeLimit: 25, targets: 10, description: 'Complete tactical course' },

  // Qualification (type-qualification)
  { id: 'ex-qual-01', typeId: 'type-qualification', name: 'Basic Qual', difficulty: 'easy', timeLimit: 15, targets: 10, description: 'Entry level qualification' },
  { id: 'ex-qual-02', typeId: 'type-qualification', name: 'Standard Qual', difficulty: 'medium', timeLimit: 20, targets: 12, description: 'Standard qualification test' },
  { id: 'ex-qual-03', typeId: 'type-qualification', name: 'Expert Qual', difficulty: 'hard', timeLimit: 25, targets: 15, description: 'Expert level qualification' },
  { id: 'ex-qual-04', typeId: 'type-qualification', name: 'Speed Qual', difficulty: 'medium', timeLimit: 12, targets: 10, description: 'Timed qualification' },
  { id: 'ex-qual-05', typeId: 'type-qualification', name: 'Accuracy Qual', difficulty: 'medium', timeLimit: 25, targets: 8, description: 'Precision-focused test' },
  { id: 'ex-qual-06', typeId: 'type-qualification', name: 'Combat Qual', difficulty: 'hard', timeLimit: 20, targets: 12, description: 'Combat readiness test' },
  { id: 'ex-qual-07', typeId: 'type-qualification', name: 'Night Qual', difficulty: 'hard', timeLimit: 22, targets: 10, description: 'Night qualification' },
  { id: 'ex-qual-08', typeId: 'type-qualification', name: 'Annual Recert', difficulty: 'medium', timeLimit: 18, targets: 12, description: 'Annual recertification' },
  { id: 'ex-qual-09', typeId: 'type-qualification', name: 'Marksman Test', difficulty: 'hard', timeLimit: 30, targets: 15, description: 'Marksman qualification' },
  { id: 'ex-qual-10', typeId: 'type-qualification', name: 'Sharpshooter', difficulty: 'hard', timeLimit: 35, targets: 20, description: 'Sharpshooter qualification' },
];

// Helper to get exercises by type
export function getExercisesByType(typeId: string) {
  return exercises.filter(e => e.typeId === typeId);
}

export function getExerciseTypeById(typeId: string) {
  return exerciseTypes.find(t => t.id === typeId);
}

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
  { id: 'r001', sessionId: 'SES-2026-0122-001', traineeId: 't001', missionId: 'm001', stationId: 'iwts-02', weaponId: 'w001', score: 96, result: 'pass', dateTime: '2026-01-22T10:30:00', duration: 28 },
  { id: 'r002', sessionId: 'SES-2026-0122-002', traineeId: 't002', missionId: 'm001', stationId: 'iwts-02', weaponId: 'w002', score: 92, result: 'pass', dateTime: '2026-01-22T11:15:00', duration: 30 },
  { id: 'r003', sessionId: 'SES-2026-0123-001', traineeId: 't004', missionId: 'm002', stationId: 'iwts-06', weaponId: 'w001', score: 98, result: 'pass', dateTime: '2026-01-23T14:45:00', duration: 42 },
  { id: 'r004', sessionId: 'SES-2026-0121-001', traineeId: 't003', missionId: 'm001', stationId: 'iwts-03', weaponId: 'w003', score: 85, result: 'pass', dateTime: '2026-01-21T09:00:00', duration: 32 },
  { id: 'r005', sessionId: 'SES-2026-0120-001', traineeId: 't010', missionId: 'm003', stationId: 'iwts-09', weaponId: 'w002', score: 88, result: 'pass', dateTime: '2026-01-20T08:30:00', duration: 25 },
  { id: 'r006', sessionId: 'SES-2026-0121-002', traineeId: 't005', missionId: 'm002', stationId: 'iwts-06', weaponId: 'w004', score: 72, result: 'fail', dateTime: '2026-01-21T15:00:00', duration: 48 },
  { id: 'r007', sessionId: 'SES-2026-0119-001', traineeId: 't006', missionId: 'm004', stationId: 'iwts-01', weaponId: 'w001', score: 81, result: 'pass', dateTime: '2026-01-19T13:00:00', duration: 22 },
  { id: 'r008', sessionId: 'SES-2026-0118-001', traineeId: 't007', missionId: 'm003', stationId: 'iwts-09', weaponId: 'w003', score: 77, result: 'pass', dateTime: '2026-01-18T10:00:00', duration: 35 },
];

// Weapons data
export const weapons = [
  { id: 'w001', name: 'M4A1 Carbine', type: 'rifle', caliber: '5.56mm' },
  { id: 'w002', name: 'M16A4', type: 'rifle', caliber: '5.56mm' },
  { id: 'w003', name: 'M249 SAW', type: 'lmg', caliber: '5.56mm' },
  { id: 'w004', name: 'M240B', type: 'mmg', caliber: '7.62mm' },
  { id: 'w005', name: 'M9 Beretta', type: 'pistol', caliber: '9mm' },
  { id: 'w006', name: 'M24 SWS', type: 'sniper', caliber: '7.62mm' },
];

export function getWeaponById(id: string) {
  return weapons.find(w => w.id === id);
}

// Weapon scores for leaderboard
export const weaponScores = [
  { traineeId: 't001', weaponId: 'w001', totalScore: 285, accuracy: 94, sessions: 8 },
  { traineeId: 't001', weaponId: 'w002', totalScore: 180, accuracy: 88, sessions: 5 },
  { traineeId: 't002', weaponId: 'w001', totalScore: 260, accuracy: 91, sessions: 7 },
  { traineeId: 't002', weaponId: 'w003', totalScore: 145, accuracy: 82, sessions: 4 },
  { traineeId: 't003', weaponId: 'w001', totalScore: 210, accuracy: 85, sessions: 6 },
  { traineeId: 't003', weaponId: 'w002', totalScore: 175, accuracy: 80, sessions: 5 },
  { traineeId: 't004', weaponId: 'w001', totalScore: 295, accuracy: 97, sessions: 9 },
  { traineeId: 't004', weaponId: 'w004', totalScore: 190, accuracy: 89, sessions: 5 },
  { traineeId: 't005', weaponId: 'w002', totalScore: 155, accuracy: 72, sessions: 5 },
  { traineeId: 't005', weaponId: 'w003', totalScore: 130, accuracy: 70, sessions: 4 },
  { traineeId: 't006', weaponId: 'w001', totalScore: 175, accuracy: 78, sessions: 5 },
  { traineeId: 't007', weaponId: 'w001', totalScore: 165, accuracy: 75, sessions: 5 },
  { traineeId: 't007', weaponId: 'w006', totalScore: 140, accuracy: 82, sessions: 4 },
  { traineeId: 't008', weaponId: 'w002', totalScore: 160, accuracy: 74, sessions: 5 },
  { traineeId: 't009', weaponId: 'w001', totalScore: 145, accuracy: 70, sessions: 5 },
  { traineeId: 't010', weaponId: 'w001', totalScore: 270, accuracy: 88, sessions: 8 },
  { traineeId: 't010', weaponId: 'w006', totalScore: 185, accuracy: 90, sessions: 5 },
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
