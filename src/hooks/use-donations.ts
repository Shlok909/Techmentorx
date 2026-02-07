
"use client";

import { useState, useEffect } from 'react';
import { Donation, DonationStatus } from '@/types/donation';

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

    // Listen for storage changes in other tabs to keep dashboards in sync
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setDonations(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addDonation = (itemName: string, location: string) => {
    const newDonation: Donation = {
      id: Math.random().toString(36).substr(2, 9),
      itemName,
      location,
      status: 'POSTED',
      createdAt: new Date().toISOString(),
    };
    const updated = [newDonation, ...donations];
    setDonations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateDonationStatus = (id: string, newStatus: DonationStatus) => {
    const updated = donations.map((d) =>
      d.id === id ? { ...d, status: newStatus } : d
    );
    setDonations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { donations, addDonation, updateDonationStatus, isLoaded };
}
