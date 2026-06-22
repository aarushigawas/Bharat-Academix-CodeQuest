import FeatureCard from '@/components/cards/FeatureCard';
import DashboardCard from '@/components/cards/DashboardCard';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Team Member 1',
      role: 'Full Stack Developer',
      description: 'Specializes in Next.js and AI integration',
    },
    {
      name: 'Team Member 2',
      role: 'ML Engineer',
      description: 'Expert in recommendation systems and RAG',
    },
    {
      name: 'Team Member 3',
      role: 'UI/UX Designer',
      description: 'Creates intuitive and beautiful interfaces',
    },
    {
      name: 'Team Member 4',
      role: 'Agricultural Expert',
      description: 'Provides domain knowledge and validation',
    },
  ];

  const techStack = [
    'Next.js 16 (App Router)',
    'TypeScript',
    'Tailwind CSS',
    'Google Gemini (AI)',
    'Supabase (Database)',
    'Vector Database (RAG)',
    'Weather API',
    'Market Data API',
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            About AgriSense AI
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Empowering farmers with AI-driven agricultural solutions
          </p>
        </div>

        {/* Problem Statement */}
        <DashboardCard title="The Problem" className="mb-8">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Farmers today face numerous challenges in making informed decisions about crop selection, 
              resource allocation, and market timing. Traditional methods rely heavily on experience and 
              intuition, which can lead to suboptimal outcomes.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Limited access to real-time market data and price trends</li>
              <li>Difficulty in predicting optimal crop choices based on soil and climate conditions</li>
              <li>Inefficient water and resource management</li>
              <li>Lack of personalized recommendations based on farm-specific parameters</li>
              <li>Challenges in tracking historical performance and improving over time</li>
            </ul>
          </div>
        </DashboardCard>

        {/* Our Solution */}
        <DashboardCard title="Our Solution" className="mb-8">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              AgriSense AI leverages cutting-edge artificial intelligence and machine learning to provide 
              farmers with data-driven insights and personalized recommendations. Our platform integrates multiple 
              data sources to deliver actionable advice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <FeatureCard
                title="AI-Powered Recommendations"
                description="Uses advanced ML algorithms to analyze soil, climate, and market data for optimal crop suggestions"
              />
              <FeatureCard
                title="Real-Time Market Insights"
                description="Provides up-to-date market prices, demand trends, and profit projections"
              />
              <FeatureCard
                title="Weather Integration"
                description="Delivers accurate weather forecasts and irrigation advice to optimize farming schedules"
              />
              <FeatureCard
                title="Sustainability Tracking"
                description="Monitors soil health, water consumption, and promotes sustainable farming practices"
              />
            </div>
          </div>
        </DashboardCard>

        {/* Technology Stack */}
        <DashboardCard title="Technology Stack" className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div key={tech} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{tech}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Team */}
        <DashboardCard title="Our Team">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm text-green-600 dark:text-green-400 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.description}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Hackathon Info */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Built for Bharat Academix CodeQuest</h2>
          <p className="text-green-100">
            AgriSense AI was developed as part of the Bharat Academix CodeQuest hackathon to address 
            real-world challenges in Indian agriculture. Our goal is to make AI-powered farming accessible 
            to farmers across the country.
          </p>
        </div>
      </div>
    </div>
  );
}
