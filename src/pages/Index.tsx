import { useState } from 'react';
import BusinessForm from '@/components/BusinessForm';
import BusinessCard, { BusinessData } from '@/components/BusinessCard';
import { mockApiWithErrors } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, Sparkles } from 'lucide-react';

const Index = () => {
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (name: string, location: string) => {
    setLoading(true);
    try {
      const data = await mockApiWithErrors.getBusinessData(name, location);
      setBusinessData(data);
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

  const handleRegenerateHeadline = async (name: string, location: string) => {
    if (!businessData) return;
    
    try {
      const newHeadline = await mockApiWithErrors.regenerateHeadline(
        name, 
        location, 
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
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-subtle via-background to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  GrowthPro
                </span>
              </h1>
              <div className="p-3 rounded-full bg-primary/10">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get instant business insights and SEO-optimized headlines for your local business. 
              Analyze ratings, reviews, and boost your online presence.
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Form Section */}
              <div className="space-y-6">
                <BusinessForm onSubmit={handleFormSubmit} loading={loading} />
                
                {/* Features */}
                <div className="text-center lg:text-left space-y-4 pt-4">
                  <h3 className="text-lg font-semibold text-foreground">What you'll get:</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Real-time business ratings
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Customer review analysis
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      SEO-optimized headlines
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      Competitive insights
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:pl-4">
                {businessData ? (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-center lg:text-left text-foreground">
                      Business Analysis Results
                    </h2>
                    <BusinessCard 
                      data={businessData} 
                      onRegenerateHeadline={handleRegenerateHeadline}
                    />
                  </div>
                ) : (
                  <div className="text-center lg:text-left p-8 lg:p-12">
                    <div className="w-24 h-24 mx-auto lg:mx-0 mb-6 rounded-full bg-primary/5 flex items-center justify-center">
                      <BarChart3 className="w-12 h-12 text-primary/40" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Ready to analyze your business?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Enter your business name and location to get started. 
                      We'll generate comprehensive insights including ratings, 
                      reviews, and custom SEO headlines.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              GrowthPro Business Dashboard - Powered by advanced analytics
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
