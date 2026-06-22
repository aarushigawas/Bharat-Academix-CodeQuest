import Link from 'next/link';
import FeatureCard from '@/components/cards/FeatureCard';

export default function Home() {
  const features = [
    {
      title: 'AI-Powered Recommendations',
      description: 'Get personalized crop suggestions based on your soil, climate, and market conditions using advanced AI.',
    },
    {
      title: 'Real-Time Weather Data',
      description: 'Access accurate weather forecasts and irrigation advice to optimize your farming schedule.',
    },
    {
      title: 'Market Insights',
      description: 'Stay ahead with real-time market prices, demand trends, and profit projections.',
    },
    {
      title: 'Sustainability Tracking',
      description: 'Monitor soil health, water consumption, and implement sustainable farming practices.',
    },
  ];

  const howItWorks = [
    { step: '1', title: 'Enter Farm Details', description: 'Provide information about your location, soil type, farm size, and budget.' },
    { step: '2', title: 'AI Analysis', description: 'Our AI analyzes your data against agricultural knowledge base and market trends.' },
    { step: '3', title: 'Get Recommendations', description: 'Receive personalized crop recommendations with yield estimates and risk assessments.' },
    { step: '4', title: 'Track Progress', description: 'Monitor your farm performance and historical data for continuous improvement.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Smart Farming with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Empowering farmers with data-driven crop recommendations, market insights, and sustainable practices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/planner"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Start Planning
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Powerful Features for Modern Farming
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers using AI to make smarter decisions and increase yields.
          </p>
          <Link
            href="/planner"
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
