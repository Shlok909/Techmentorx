
"use client";

import { useState, useEffect } from 'react';
import { Donation } from '@/types/donation';

const STORAGE_KEY = 'mentorlink_donations';

export function useDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setDonations(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse donations', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const addDonation = (itemName: string, location: string) => {
    const newDonation: Donation = {
      id: Math.random().toString(36).substr(2, 9),
      itemName,
      location,
      status: 'Posted',
      createdAt: new Date().toISOString(),
    };
    const updated = [newDonation, ...donations];
    setDonations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const claimDonation = (id: string) => {
    const updated = donations.map((d) =>
      d.id === id ? { ...d, status: 'Claimed' as const } : d
    );
    setDonations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { donations, addDonation, claimDonation, isLoaded };
}
