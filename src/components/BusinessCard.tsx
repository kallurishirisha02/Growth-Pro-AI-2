import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, RefreshCw, Loader2, Building2, MapPin, TrendingUp } from 'lucide-react';

export interface BusinessData {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  headline: string;
}

interface BusinessCardProps {
  data: BusinessData;
  onRegenerateHeadline: (name: string, location: string) => Promise<void>;
}

const BusinessCard = ({ data, onRegenerateHeadline }: BusinessCardProps) => {
  const [regenerating, setRegenerating] = useState(false);

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      await onRegenerateHeadline(data.name, data.location);
    } finally {
      setRegenerating(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 rating-star fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300 fill-current" />
          <Star className="w-4 h-4 rating-star fill-current absolute top-0 left-0" 
                style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" />
      );
    }

    return stars;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-soft gradient-card border-0">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Building2 className="w-5 h-5 text-primary" />
              {data.name}
            </CardTitle>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4" />
              {data.location}
            </p>
          </div>
          <Badge variant="secondary" className="ml-4">
            <TrendingUp className="w-3 h-3 mr-1" />
            Analytics
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-6 p-4 bg-background/50 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              {renderStars(data.rating)}
            </div>
            <div className="text-lg font-bold text-foreground">
              {data.rating}
            </div>
            <div className="text-xs text-muted-foreground">
              Rating
            </div>
          </div>
          
          <div className="w-px h-12 bg-border"></div>
          
          <div className="flex flex-col items-center">
            <MessageSquare className="w-5 h-5 text-primary mb-1" />
            <div className="text-lg font-bold text-foreground">
              {data.reviews.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              Reviews
            </div>
          </div>
        </div>

        {/* SEO Headline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">SEO Headline</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={regenerating}
              className="transition-smooth hover:shadow-soft"
            >
              {regenerating ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Regenerate
                </>
              )}
            </Button>
          </div>
          
          <div className="p-4 bg-primary-subtle border border-primary/20 rounded-lg">
            <p className="text-foreground font-medium leading-relaxed">
              {data.headline}
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Optimized for local search and customer engagement
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;