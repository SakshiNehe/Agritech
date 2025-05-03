import React from 'react';

const FarmerDashboard = () => {
  const stats = [
    { label: 'शेतकरी साथीदार', value: '500,000+', icon: '👨‍🌾' },
    { label: 'एकूण उत्पादने', value: '800+', icon: '🌾' },
    { label: 'सक्रिय वापरकर्ते', value: '50,000+', icon: '📱' },
  ];

  const features = [
    {
      title: 'स्मार्ट माती सेन्सर',
      description: 'जमिनीची स्थिती आणि पोषक तत्वांचे वास्तविक वेळ निरीक्षण',
      icon: '🌱',
      image: '/assets/soil-sensor.jpg',
    },
    {
      title: 'AI पीक विश्लेषण',
      description: 'पिकांच्या आरोग्याचे स्मार्ट विश्लेषण आणि रोग ओळख',
      icon: '🤖',
      image: '/assets/crop-analysis.jpg',
    },
    {
      title: 'हवामान अंदाज',
      description: 'अचूक हवामान अंदाज आणि पीक नियोजन सल्ला',
      icon: '🌤️',
      image: '/assets/weather.jpg',
    },
  ];

  const testimonials = [
    {
      name: 'राजेश पाटील',
      location: 'नाशिक',
      text: 'AgriTech ने माझ्या शेतीला आधुनिक बनवले. उत्पादन वाढले आणि नफा देखील.',
      image: '/assets/farmer1.jpg',
    },
    {
      name: 'सुनीता मोरे',
      location: 'पुणे',
      text: 'स्मार्ट सेन्सर्समुळे माझ्या पिकांचे निरीक्षण सोपे झाले आहे.',
      image: '/assets/farmer2.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-green-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                कृषी तंत्रज्ञानासह शेती
                <br />
                अधिक स्मार्ट, अधिक फायदेशीर
              </h1>
              <p className="text-xl mb-8">
                आधुनिक तंत्रज्ञानासह आपली शेती विकसित करा आणि उत्पादन वाढवा
              </p>
              <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition">
                सुरू करा ▶
              </button>
            </div>
            <div className="relative">
              <img
                src="/assets/hero-image.jpg"
                alt="Smart Farming"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <span className="text-4xl mb-4 block">{stat.icon}</span>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          स्मार्ट शेतीसाठी आधुनिक सुविधा
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-48 bg-gray-200">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
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

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          शेतकरी अनुभव
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard; 