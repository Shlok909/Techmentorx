
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { DonationForm } from '@/components/DonationForm';
import { DonationList } from '@/components/DonationList';
import { useDonations } from '@/hooks/use-donations';
import { ListChecks } from 'lucide-react';

export default function DonorDashboard() {
  const router = useRouter();
  const { donations, addDonation, isLoaded } = useDonations();

  useEffect(() => {
    const role = localStorage.getItem('mentorlink_role');
    if (!role) router.push('/');
    if (role === 'volunteer') router.push('/volunteer');
  }, [router]);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <DonationForm onSubmit={addDonation} />
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <ListChecks className="text-primary w-6 h-6" />
              <h2 className="text-2xl font-headline font-bold">Your Posted Donations</h2>
            </div>
            <DonationList donations={donations} role="donor" />
          </div>
        </div>
      </main>
    </div>
  );
}
