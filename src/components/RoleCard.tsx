import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

export function RoleCard({ title, description, icon: Icon, imageUrl, onClick, variant }: RoleCardProps) {
  const imageHint = title.toLowerCase();

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-primary/20"
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <>
            <Image 
              src={imageUrl} 
              alt={title} 
              fill 
              className="object-cover transition-transform group-hover:scale-105"
              data-ai-hint={imageHint}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="w-12 h-12 text-muted-foreground/20" />
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${variant === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/20 text-secondary-foreground'}`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-headline font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
