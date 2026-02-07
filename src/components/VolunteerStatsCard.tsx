
"use client";

import { VolunteerStats } from '@/hooks/use-volunteer-stats';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy, Star, Award, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VolunteerStatsCardProps {
  stats: VolunteerStats;
}

export function VolunteerStatsCard({ stats }: VolunteerStatsCardProps) {
  return (
    <Card className="shadow-lg border-2 border-primary/10 bg-gradient-to-br from-white to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-headline font-bold">
          <Trophy className="text-amber-500 w-6 h-6" />
          Your Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-border flex flex-col items-center text-center">
            <Star className="w-8 h-8 text-amber-400 mb-2 fill-amber-400" />
            <span className="text-2xl font-black text-primary">{stats.points}</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tighter">Points</span>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-border flex flex-col items-center text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-2xl font-black text-primary">{stats.deliveriesCompleted}</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tighter">Deliveries</span>
          </div>
        </div>

        {stats.badges.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Badges Earned</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {stats.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="bg-secondary/30 hover:bg-secondary/40 text-secondary-foreground py-1 px-3">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
