
"use client";

import { useState, useEffect } from 'react';

const STATS_KEY = 'mentorlink_volunteer_stats';

export interface VolunteerStats {
  points: number;
  deliveriesCompleted: number;
  badges: string[];
}

export function useVolunteerStats() {
  const [stats, setStats] = useState<VolunteerStats>({
    points: 0,
    deliveriesCompleted: 0,
    badges: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem(STATS_KEY);
    if (stored) {
      try {
        setStats(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse volunteer stats', e);
      }
    }
  }, []);

  const saveStats = (newStats: VolunteerStats) => {
    setStats(newStats);
    localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
  };

  const completeDelivery = () => {
    const newCount = stats.deliveriesCompleted + 1;
    const newPoints = stats.points + 10;
    
    const potentialBadges = [
      { threshold: 1, name: 'First Mover' },
      { threshold: 3, name: 'Rising Star' },
      { threshold: 5, name: 'Community Pillar' },
      { threshold: 10, name: 'Master Volunteer' },
    ];

    const currentBadges = potentialBadges
      .filter(b => newCount >= b.threshold)
      .map(b => b.name);

    saveStats({
      deliveriesCompleted: newCount,
      points: newPoints,
      badges: currentBadges,
    });
  };

  return { stats, completeDelivery };
}
