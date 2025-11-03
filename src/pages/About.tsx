
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">
              About <span className="text-gradient">ZCard</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing professional networking with AI-powered digital business cards 
              that adapt to your industry and personal style.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                In today's digital-first world, traditional business cards are becoming obsolete. 
                We believe professional networking should be seamless, sustainable, and smart.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                ZCard combines artificial intelligence with beautiful design to create 
                digital business cards that not only look professional but actively enhance 
                your networking success.
              </p>
            </div>
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-brand-600">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-600">50K+</div>
                  <div className="text-sm text-muted-foreground">Cards Created</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-600">95%</div>
                  <div className="text-sm text-muted-foreground">User Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-brand-600">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground text-sm">
                Built for teams that need consistent branding and easy management.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground text-sm">
                Smart recommendations based on your industry and profession.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Award Winning</h3>
              <p className="text-muted-foreground text-sm">
                Recognized by industry leaders for innovation and design.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">User Focused</h3>
              <p className="text-muted-foreground text-sm">
                Every feature is designed with user experience at the forefront.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
