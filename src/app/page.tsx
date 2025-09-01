import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  Brain,
  CreditCard,
  TrendingUp,
  Shield,
  Smartphone,
  Zap,
  Users,
  DollarSign,
  PieChart,
  Bell,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Smart Finance Management Made Simple
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              WealthWise uses advanced AI to automatically organize your
              finances and predict your spending patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "AI Transaction Categorization",
                description:
                  "Automatically categorize every transaction with 95% accuracy using machine learning",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Predictive Bill Forecasting",
                description:
                  "Get notified about upcoming bills before they're due based on your spending history",
              },
              {
                icon: <CreditCard className="w-8 h-8" />,
                title: "Multi-Bank Integration",
                description:
                  "Connect all your accounts from 10,000+ financial institutions via secure Plaid integration",
              },
              {
                icon: <PieChart className="w-8 h-8" />,
                title: "Real-time Dashboard",
                description:
                  "See your complete financial picture with interactive charts and spending insights",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Bank-Level Security",
                description:
                  "Your data is protected with 256-bit encryption and never stored on our servers",
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Mobile-First Design",
                description:
                  "Manage your finances on-the-go with our responsive, intuitive mobile interface",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200"
              >
                <div className="text-emerald-600 mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Smart Savers</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Join thousands who've taken control of their financial future
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">$2.5M+</div>
              <div className="text-emerald-100">Money Saved by Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-emerald-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-emerald-100">Connected Banks</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-emerald-100">Categorization Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect your accounts and let AI do the heavy lifting
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Connect Your Banks",
                description:
                  "Securely link your checking, savings, and credit card accounts through Plaid",
              },
              {
                step: "2",
                title: "AI Learns Your Patterns",
                description:
                  "Our AI analyzes your transaction history to understand your spending habits",
              },
              {
                step: "3",
                title: "Get Smart Insights",
                description:
                  "Receive personalized predictions and recommendations to optimize your finances",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade when you need advanced AI features
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Master Your Money?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands who've transformed their financial lives with
            AI-powered insights.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 text-emerald-600 bg-white rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium shadow-lg"
          >
            Start Your Free Account
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
