
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusCircle, MapPin, Package } from 'lucide-react';

interface DonationFormProps {
  onSubmit: (itemName: string, location: string) => void;
}

export function DonationForm({ onSubmit }: DonationFormProps) {
  const [itemName, setItemName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName && location) {
      onSubmit(itemName, location);
      setItemName('');
      setLocation('');
    }
  };

  return (
    <Card className="shadow-lg border-2 border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="text-primary w-5 h-5" />
          Post New Donation
        </CardTitle>
        <CardDescription>
          Share items with students who need them in your community.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName" className="flex items-center gap-2">
              <Package className="w-4 h-4 text-muted-foreground" />
              Item Name
            </Label>
            <Input
              id="itemName"
              placeholder="e.g., Scientific Calculator, Textbook"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              Pickup Location
            </Label>
            <Input
              id="location"
              placeholder="e.g., Campus Library, North Hall"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
            Post Donation
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
