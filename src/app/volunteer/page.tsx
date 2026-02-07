
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { DonationList } from '@/components/DonationList';
import { useDonations } from '@/hooks/use-donations';
import { useVolunteerStats } from '@/hooks/use-volunteer-stats';
import { VolunteerStatsCard } from '@/components/VolunteerStatsCard';
import { Search, Globe, Truck } from 'lucide-react';
import { DonationStatus } from '@/types/donation';

export default function VolunteerDashboard() {
  const router = useRouter();
  const { donations, updateDonationStatus, isLoaded } = useDonations();
  const { stats, completeDelivery } = useVolunteerStats();

  useEffect(() => {
    const role = localStorage.getItem('mentorlink_role');
    if (!role) router.push('/');
    if (role === 'donor') router.push('/donor');
  }, [router]);

  if (!isLoaded) return null;

  const handleUpdateStatus = (id: string, newStatus: DonationStatus) => {
    const currentDonation = donations.find(d => d.id === id);
    if (!currentDonation) return;

    // Track if this delivery is completing
    if (newStatus === 'DELIVERED' && currentDonation.status !== 'DELIVERED') {
      completeDelivery();
    }
    
    updateDonationStatus(id, newStatus);
  };

  const activeDonationsCount = donations.filter(d => d.status !== 'DELIVERED').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary/30 rounded-lg">
                  <Globe className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h1 className="text-2xl font-headline font-black">Volunteer Hub</h1>
              </div>
              <p className="text-muted-foreground text-sm">
                Help deliver items to students in your community. Each successful delivery earns you points and badges!
              </p>
            </div>

            <VolunteerStatsCard stats={stats} />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Truck className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-headline font-bold">Available Tasks</h2>
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-white px-3 py-1 rounded-full border shadow-sm">
                {activeDonationsCount} active tasks
              </span>
            </div>
            
            <DonationList 
              donations={donations} 
              role="volunteer" 
              onUpdateStatus={handleUpdateStatus} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
