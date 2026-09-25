import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  AUTONOMY_LEVELS, 
  INITIAL_TEAMMATE, 
  INITIAL_MISSIONS, 
  INITIAL_SKILLS, 
  INITIAL_APPROVAL_QUESTS 
} from './data/initialData';
import { 
  TeammateProfile, 
  AutonomyLevelId, 
  MissionDocket, 
  SkillItem, 
  ApprovalQuest 
} from './types';
import { LandingPage } from './components/LandingPage';
import { LoginView } from './components/LoginView';
import { ConsoleWorkspace, ConsoleWindowId } from './components/ConsoleWorkspace';
import { OnboardingModal } from './components/OnboardingModal';
import { MissionDetailModal } from './components/MissionDetailModal';

type AppViewMode = 'landing' | 'login' | 'console';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('landing');
  const [activeConsoleWindow, setActiveConsoleWindow] = useState<ConsoleWindowId>('simulator');
  const [workspaceName, setWorkspaceName] = useState<string>('Apex Hypercommerce (D2C Retail)');
  const [founderName, setFounderName] = useState<string>('Krutarth Ashar');

  const [teammate, setTeammate] = useState<TeammateProfile>(INITIAL_TEAMMATE);
  const [missions, setMissions] = useState<MissionDocket[]>(INITIAL_MISSIONS);
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [quests, setQuests] = useState<ApprovalQuest[]>(INITIAL_APPROVAL_QUESTS);
  
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [inspectedMission, setInspectedMission] = useState<MissionDocket | null>(null);
  const [prefilledObjective, setPrefilledObjective] = useState<string>('');

  // Current level object
  const currentLevelData = AUTONOMY_LEVELS.find(l => l.id === teammate.currentLevel) || AUTONOMY_LEVELS[2];

  // When a mission is completed in the simulator
  const handleMissionCompleted = (newMission: MissionDocket, xpGain: number) => {
    setMissions(prev => [newMission, ...prev]);

    setTeammate(prev => {
      const updatedXp = prev.currentXp + xpGain;
      let newLevel = prev.currentLevel;
      let nextThreshold = prev.nextLevelXp;

      // Check if leveled up
      const nextLevelObj = AUTONOMY_LEVELS.find(l => l.id === (prev.currentLevel + 1) as AutonomyLevelId);
      if (nextLevelObj && updatedXp >= nextLevelObj.requiredXp) {
        newLevel = nextLevelObj.id;
        const higherLevel = AUTONOMY_LEVELS.find(l => l.id === (newLevel + 1) as AutonomyLevelId);
        nextThreshold = higherLevel ? higherLevel.requiredXp : 250;
      }

      return {
        ...prev,
        currentXp: updatedXp,
        currentLevel: newLevel,
        nextLevelXp: nextThreshold,
        totalMissionsCompleted: prev.totalMissionsCompleted + 1,
        hoursSaved: Number((prev.hoursSaved + 0.35).toFixed(1))
      };
    });
  };

  // Simulate Level promotion manually in TrustLevels window
  const handleSimulateLevelChange = (newLevelId: AutonomyLevelId) => {
    const targetLvl = AUTONOMY_LEVELS.find(l => l.id === newLevelId);
    const nextTarget = AUTONOMY_LEVELS.find(l => l.id === (newLevelId + 1) as AutonomyLevelId);
    
    setTeammate(prev => ({
      ...prev,
      currentLevel: newLevelId,
      currentXp: targetLvl ? targetLvl.requiredXp : prev.currentXp,
      nextLevelXp: nextTarget ? nextTarget.requiredXp : 250,
    }));
  };

  // Toggle skill equip state
  const handleToggleSkill = (skillId: string) => {
    setTeammate(prev => {
      const isAlreadyEquipped = prev.activeSkills.includes(skillId);
      const updated = isAlreadyEquipped
        ? prev.activeSkills.filter(id => id !== skillId)
        : [...prev.activeSkills, skillId];
      return { ...prev, activeSkills: updated };
    });
  };

  // Run skill in simulator directly
  const handleRunSkillInSimulator = (objective: string) => {
    setPrefilledObjective(objective);
    setActiveConsoleWindow('simulator');
  };

  // Approve an approval quest
  const handleApproveQuest = (questId: string, xpReward: number) => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest) return;

    setQuests(prev => prev.map(q => q.id === questId ? { ...q, status: 'approved' } : q));

    // Also add to verified missions docket
    const approvedMission: MissionDocket = {
      id: `quest-appr-${Date.now()}`,
      refCode: targetQuest.refCode + '-CONFIRMED',
      title: targetQuest.title,
      category: targetQuest.amountOrScope.includes('Procurement') ? 'inventory' : 'support',
      status: 'verified',
      timestamp: 'Just now (Approved by Founder)',
      executionDuration: '0.8 SEC',
      systemsTouched: targetQuest.systems,
      summary: `Founder authorized ${targetQuest.amountOrScope}. Invariant check sealed with cryptographic signature.`,
      auditedValue: targetQuest.amountOrScope,
      confidenceScore: 100.0,
      verificationSeal: '0x' + Math.random().toString(16).substring(2, 10) + '...f941',
      beforeState: 'Staged operation held in safety quarantine buffer',
      afterState: 'Authorization token granted; external systems committed',
      journalLinesCount: 142,
      xpAwarded: xpReward
    };

    setMissions(prev => [approvedMission, ...prev]);

    // Award XP
    setTeammate(prev => ({
      ...prev,
      currentXp: prev.currentXp + xpReward,
      totalMissionsCompleted: prev.totalMissionsCompleted + 1,
      hoursSaved: Number((prev.hoursSaved + 0.8).toFixed(1))
    }));
  };

  // Reject an approval quest
  const handleRejectQuest = (questId: string) => {
    setQuests(prev => prev.map(q => q.id === questId ? { ...q, status: 'rejected' } : q));
  };

  // Save teammate customizations from Onboarding modal
  const handleSaveTeammate = (updated: Partial<TeammateProfile>) => {
    setTeammate(prev => ({
      ...prev,
      ...updated,
    }));
    setViewMode('console');
    setActiveConsoleWindow('levels');
  };

  // Login handler
  const handleLoginSuccess = (selectedWorkspace: string, founder: string) => {
    setWorkspaceName(selectedWorkspace);
    setFounderName(founder);
    setViewMode('console');
    setActiveConsoleWindow('simulator');
  };

  return (
    <>
      {/* 1. VIEW 1: PUBLIC LANDING PAGE (Clean, spacious, zero clutter) */}
      {viewMode === 'landing' && (
        <LandingPage
          teammate={teammate}
          currentLevelData={currentLevelData}
          latestMission={missions[0]}
          onEnterConsole={() => {
            setViewMode('console');
            setActiveConsoleWindow('simulator');
          }}
          onGoToLogin={() => setViewMode('login')}
          onOpenHireModal={() => setIsRecruitModalOpen(true)}
        />
      )}

      {/* 2. VIEW 2: LOGIN & AUTHENTICATION SCREEN */}
      {viewMode === 'login' && (
        <LoginView
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => setViewMode('landing')}
        />
      )}

      {/* 3. VIEW 3: THE AUTONOMOUS CONSOLE (EACH FEATURE HAS A DEDICATED SEPARATE WINDOW) */}
      {viewMode === 'console' && (
        <ConsoleWorkspace
          activeWindow={activeConsoleWindow}
          onSelectWindow={(winId) => setActiveConsoleWindow(winId)}
          workspaceName={workspaceName}
          founderName={founderName}
          teammate={teammate}
          currentLevelData={currentLevelData}
          levels={AUTONOMY_LEVELS}
          missions={missions}
          skills={skills}
          quests={quests}
          onMissionCompleted={handleMissionCompleted}
          onInspectMission={(m) => setInspectedMission(m)}
          onSimulateLevelChange={handleSimulateLevelChange}
          onToggleSkill={handleToggleSkill}
          onRunSkillInSimulator={handleRunSkillInSimulator}
          onApproveQuest={handleApproveQuest}
          onRejectQuest={handleRejectQuest}
          onOpenRecruitModal={() => setIsRecruitModalOpen(true)}
          onSignOut={() => setViewMode('landing')}
          prefilledObjective={prefilledObjective}
          onClearPrefill={() => setPrefilledObjective('')}
        />
      )}

      {/* Shared Modals */}
      <OnboardingModal
        isOpen={isRecruitModalOpen}
        onClose={() => setIsRecruitModalOpen(false)}
        teammate={teammate}
        onSaveTeammate={handleSaveTeammate}
      />

      <MissionDetailModal
        mission={inspectedMission}
        onClose={() => setInspectedMission(null)}
      />
    </>
  );
}
