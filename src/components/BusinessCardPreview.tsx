
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Twitter,
  ExternalLink,
  BarChart3
} from "lucide-react";

const BusinessCardPreview = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            See Your Card <span className="text-gradient">Come to Life</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience how your digital business card will look and feel. Interactive, professional, and perfectly designed for modern networking.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mobile Preview */}
            <div className="relative animate-fade-in">
              <div className="bg-slate-800 rounded-3xl p-2 shadow-2xl">
                <div className="bg-background rounded-2xl overflow-hidden">
                  {/* Phone Status Bar */}
                  <div className="bg-slate-900 h-6 flex items-center justify-between px-4 text-white text-xs">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                      <div className="w-6 h-2 bg-white rounded-sm"></div>
                      <div className="w-6 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 bg-gradient-to-br from-brand-50 to-background min-h-[500px]">
                    <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                          JS
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">John Smith</h3>
                        <p className="text-brand-600 font-medium">Senior Product Designer</p>
                        <p className="text-muted-foreground text-sm">TechCorp Solutions</p>
                      </div>
                      
                      {/* Contact Info */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <Mail className="w-5 h-5 text-brand-500" />
                          <span className="text-sm">john@techcorp.com</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <Phone className="w-5 h-5 text-brand-500" />
                          <span className="text-sm">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <MapPin className="w-5 h-5 text-brand-500" />
                          <span className="text-sm">San Francisco, CA</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <Globe className="w-5 h-5 text-brand-500" />
                          <span className="text-sm">www.johnsmith.design</span>
                        </div>
                      </div>
                      
                      {/* Social Links */}
                      <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-border">
                        <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-brand-600 transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-brand-600 transition-colors">
                          <Twitter className="w-5 h-5" />
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-6 animate-fade-in delay-300">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Interactive Elements</h4>
                  <p className="text-muted-foreground text-sm">Clickable contact info that opens the right app instantly</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Universal Compatibility</h4>
                  <p className="text-muted-foreground text-sm">Works perfectly on any device or platform</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Easy Sharing</h4>
                  <p className="text-muted-foreground text-sm">Share via QR code, link, or direct contact transfer</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Real-time Updates</h4>
                  <p className="text-muted-foreground text-sm">Update your info once, and it updates everywhere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCardPreview;
