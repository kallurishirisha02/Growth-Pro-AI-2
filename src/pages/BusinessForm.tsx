import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { mockApiWithErrors } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';
import { useFormContext } from '@/contexts/FormContext';

const BusinessForm = () => {
  const { formData, setFormData } = useFormContext();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; location?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize form with saved data
  useEffect(() => {
    if (formData.name) setName(formData.name);
    if (formData.location) setLocation(formData.location);
  }, [formData]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save form data to context
    setFormData({ name: name.trim(), location: location.trim() });

    setLoading(true);
    try {
      const data = await mockApiWithErrors.getBusinessData(name.trim(), location.trim());
      
      // Navigate to results page with data
      navigate('/results', { 
        state: { 
          businessData: data,
          formData: { name: name.trim(), location: location.trim() }
        }
      });
      
      toast({
        title: "Business analysis complete!",
        description: `Successfully analyzed ${name} in ${location}`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h1 className="text-2xl font-bold">GrowthPro</h1>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Transform your local business insights with AI-powered analytics and SEO optimization
          </p>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Business Analysis</h2>
            <p className="text-gray-400 text-sm">Enter your business details to get instant insights</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="business-name" className="text-sm font-medium flex items-center gap-2 text-white">
                <Building2 className="w-4 h-4" />
                Business Name
              </Label>
              <Input
                id="business-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                }}
                placeholder="e.g. Joe's Pizza"
                className={`bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500 ${
                  errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                disabled={loading}
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors(prev => ({ ...prev, location: undefined }));
                }}
                placeholder="e.g. New York, NY"
                className={`bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500 ${
                  errors.location ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                disabled={loading}
              />
              {errors.location && (
                <p className="text-sm text-red-400">{errors.location}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
              disabled={loading || !name.trim() || !location.trim()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Business...
                </>
              ) : (
                'Analyze Business'
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-xs">
            Built with React + Express • Mock data simulation active
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessForm;