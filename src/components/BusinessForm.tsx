import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, Loader2 } from 'lucide-react';

interface BusinessFormProps {
  onSubmit: (name: string, location: string) => void;
  loading: boolean;
}

const BusinessForm = ({ onSubmit, loading }: BusinessFormProps) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState<{ name?: string; location?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; location?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Business name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Business name must be at least 2 characters';
    }
    
    if (!location.trim()) {
      newErrors.location = 'Location is required';
    } else if (location.trim().length < 2) {
      newErrors.location = 'Location must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(name.trim(), location.trim());
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-soft">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Business Analytics
        </CardTitle>
        <p className="text-muted-foreground">
          Get instant insights for your local business
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="business-name" className="text-sm font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Business Name
            </Label>
            <Input
              id="business-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
              }}
              placeholder="Enter your business name"
              className={`transition-smooth ${errors.name ? 'border-destructive focus:ring-destructive' : 'focus:ring-primary'}`}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (errors.location) setErrors(prev => ({ ...prev, location: undefined }));
              }}
              placeholder="City, State or Address"
              className={`transition-smooth ${errors.location ? 'border-destructive focus:ring-destructive' : 'focus:ring-primary'}`}
              disabled={loading}
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full gradient-hero hover:opacity-90 transition-smooth shadow-glow"
            disabled={loading || !name.trim() || !location.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Business...
              </>
            ) : (
              'Get Business Insights'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessForm;