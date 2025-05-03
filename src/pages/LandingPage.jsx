import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      title: 'Smart Soil Sensors',
      description: 'Real-time soil data for better decisions',
      icon: '🌱',
      image: '/assets/features/soil-sensor.jpg',
    },
    {
      title: 'AI Crop Analytics',
      description: 'Predict, protect, perfect your harvest',
      icon: '🤖',
      image: '/assets/features/crop-analytics.jpg',
    },
    {
      title: 'Weather Insights',
      description: 'Accurate forecasts for better planning',
      icon: '🌤️',
      image: '/assets/features/weather.jpg',
    },
    {
      title: 'Drone Mapping',
      description: 'Aerial insights for smart farming',
      icon: '🛩️',
      image: '/assets/features/drone.jpg',
    },
  ];

  const stats = [
    { value: '500,000+', label: 'Supported Farmers', icon: '👨‍🌾' },
    { value: '800+', label: 'Technologies', icon: '🔧' },
    { value: '95%', label: 'Satisfaction Rate', icon: '⭐' },
  ];

  const successStories = [
    {
      name: 'Andre Gomes',
      role: 'Horticulture Farm',
      image: '/assets/farmers/farmer1.jpg',
      quote: 'AgriTech has revolutionized my farming approach. The real-time data and insights make it easier to monitor my crops and make informed decisions.',
    },
    {
      name: 'Maria Silva',
      role: 'Organic Farm',
      image: '/assets/farmers/farmer2.jpg',
      quote: 'The voice assistance in my native language has made technology accessible. I can now manage my farm more efficiently.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url(/assets/hero-bg.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Revolutionizing agriculture with innovative, smart, sustainable technology solutions
            </h1>
            <p className="text-xl mb-8">
              Empowering farmers and agribusiness with cutting-edge tools and intelligent insights to optimize productivity and drive sustainable growth.
            </p>
            <div className="flex gap-4">
              <Link
                to="/farmer"
                className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition"
              >
                Start Farming
              </Link>
              <Link
                to="/shop"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition"
              >
                Visit Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Innovative solutions for modern farming</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how our cutting-edge technology can transform your agricultural practices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <span className="text-4xl mb-4 block">{stat.icon}</span>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            Farmers' Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{story.name}</h4>
                    <p className="text-gray-600">{story.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{story.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your farming?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AgriTech to improve their productivity and sustainability
          </p>
          <Link
            to="/farmer/register"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
