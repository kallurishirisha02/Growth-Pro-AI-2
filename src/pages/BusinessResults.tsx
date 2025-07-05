import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, RefreshCw, Loader2, CheckCircle, Sparkles, MessageSquare } from 'lucide-react';
import { mockApiWithErrors } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';
import { BusinessData } from '@/components/BusinessCard';

const BusinessResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [regenerating, setRegenerating] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [formData, setFormData] = useState<{ name: string; location: string } | null>(null);

  useEffect(() => {
    // Get data from navigation state
    const state = location.state as { businessData: BusinessData; formData: { name: string; location: string } } | null;
    
    if (state?.businessData && state?.formData) {
      setBusinessData(state.businessData);
      setFormData(state.formData);
    } else {
      // If no data, redirect back to form
      navigate('/');
    }
  }, [location, navigate]);

  const handleRegenerateHeadline = async () => {
    if (!businessData || !formData) return;
    
    setRegenerating(true);
    try {
      const newHeadline = await mockApiWithErrors.regenerateHeadline(
        formData.name, 
        formData.location, 
        businessData.rating, 
        businessData.reviews
      );
      
      setBusinessData(prev => prev ? { ...prev, headline: newHeadline } : null);
      
      toast({
        title: "Headline updated!",
        description: "Generated a new SEO-optimized headline",
      });
    } catch (error) {
      toast({
        title: "Failed to regenerate headline",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRegenerating(false);
    }
  };

  const handleAnalyzeAnother = () => {
    navigate('/');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-600 fill-current" />
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0" 
                style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-600 fill-current" />
      );
    }

    return stars;
  };

  if (!businessData) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-white" />
    </div>;
  }

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

        {/* Business Info */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold mb-1">{businessData.name}</h2>
            <p className="text-gray-400">{businessData.location}</p>
          </div>

          <div className="space-y-6">
            {/* Ratings Section */}
            <div className="grid grid-cols-2 gap-8">
              {/* Google Rating */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Google Rating</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">{businessData.rating}</span>
                  <div className="flex items-center gap-1">
                    {renderStars(businessData.rating)}
                  </div>
                </div>
                <Badge variant="secondary" className="bg-slate-800 text-white border-slate-700">
                  Excellent
                </Badge>
              </div>

              {/* Total Reviews */}
              <div>
                <p className="text-gray-400 text-sm mb-2">Total Reviews</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">{businessData.reviews.toLocaleString()}</span>
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                </div>
                <Badge variant="secondary" className="bg-slate-800 text-white border-slate-700">
                  Verified
                </Badge>
              </div>
            </div>

            {/* SEO Headline Section */}
            <div className="border-t border-slate-700 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold">AI-Generated SEO Headline</h3>
              </div>
              
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
                <p className="text-white font-medium leading-relaxed">
                  {businessData.headline}
                </p>
              </div>
              
              <Button
                variant="outline"
                onClick={handleRegenerateHeadline}
                disabled={regenerating}
                className="w-full bg-slate-800 border-slate-700 text-white hover:bg-slate-700 mb-4"
              >
                {regenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Regenerate Headline
                  </>
                )}
              </Button>

              <Button
                onClick={handleAnalyzeAnother}
                className="w-full bg-slate-800 border border-slate-700 text-white hover:bg-slate-700"
                variant="outline"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Another Business
              </Button>
            </div>
          </div>
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

export default BusinessResults;