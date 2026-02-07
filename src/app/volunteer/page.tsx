
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { DonationList } from '@/components/DonationList';
import { useDonations } from '@/hooks/use-donations';
import { Search, Globe } from 'lucide-react';

export default function VolunteerDashboard() {
  const router = useRouter();
  const { donations, claimDonation, isLoaded } = useDonations();

  useEffect(() => {
    const role = localStorage.getItem('mentorlink_role');
    if (!role) router.push('/');
    if (role === 'donor') router.push('/donor');
  }, [router]);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-secondary/30 rounded-lg">
                <Globe className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h1 className="text-3xl font-headline font-black">Find Resources</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Browse items posted by community donors. Claim what you need to support your studies and personal growth.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-headline font-bold">Available Donations</h2>
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {donations.filter(d => d.status === 'Posted').length} active listings
              </span>
            </div>
            
            <DonationList 
              donations={donations} 
              role="volunteer" 
              onClaim={claimDonation} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
