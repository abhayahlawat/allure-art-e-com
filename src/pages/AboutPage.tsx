import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Palette, Users, Target, Eye, Lightbulb } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Palette size={32} />,
      title: 'Curated Collection',
      description: 'Every piece in our gallery is carefully selected for its artistic merit and emotional impact'
    },
    {
      icon: <Users size={32} />,
      title: 'Supporting Artists',
      description: 'We work directly with artists, ensuring they receive fair compensation for their creative work'
    },
    {
      icon: <Heart size={32} />,
      title: 'Passion for Art',
      description: 'Our team shares a deep love for art and is dedicated to making it accessible to everyone'
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Guarantee',
      description: 'We stand behind every piece with authentication certificates and quality assurance'
    }
  ];

  const values = [
    {
      icon: <Target size={24} />,
      title: 'Our Mission',
      description: 'To make extraordinary art accessible to art lovers everywhere while supporting talented artists in their creative journey.'
    },
    {
      icon: <Eye size={24} />,
      title: 'Our Vision',
      description: 'A world where art transforms spaces and lives, connecting people through the universal language of creativity.'
    },
    {
      icon: <Lightbulb size={24} />,
      title: 'Our Values',
      description: 'Authenticity, quality, creativity, and fair partnerships with artists form the foundation of everything we do.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-24 overflow-x-hidden bg-white min-h-screen"
    >
      {/* Header Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-slate-800 mb-6 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="font-cursive">Allure Art</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Founded with a passion for bringing extraordinary art into everyday spaces, 
            we believe art has the power to transform not just spaces, but lives.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-light text-slate-800">
                  Our <span className="font-cursive">Story</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Our journey began with a simple vision: to make exceptional art accessible to art lovers everywhere. 
                  What started as a small gallery has grown into a global platform that connects artists with collectors, 
                  art enthusiasts, and anyone who believes in the transformative power of creativity.
                </p>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Today, we work with talented artists from around the globe, showcasing their unique perspectives 
                  and creative excellence. Each piece in our collection tells a story, evokes emotion, and has the 
                  power to transform any space into something extraordinary.
                </p>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  We're more than just an art gallery – we're a community of art lovers, creators, and dreamers 
                  who believe that everyone deserves to live surrounded by beauty and inspiration.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="relative mx-4 sm:mx-0">
                <img
                  src="https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg"
                  alt="Art Gallery"
                  className="w-full rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-slate-800">2019</div>
                    <div className="text-sm sm:text-base text-slate-600">Founded</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-light text-slate-800 mb-4">
              Our <span className="font-cursive">Values</span>
            </h2>
          </motion.div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pastel-lavender rounded-full text-slate-700">
                  {value.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800">{value.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden mb-16">
            <div className="flex overflow-x-auto scrollbar-hide gap-6 px-4 -mx-4">
              <div className="flex gap-6 animate-scroll">
                {[...values, ...values, ...values].map((value, index) => (
                  <motion.div
                    key={`${value.title}-${index}`}
                    className="flex-shrink-0 w-72 text-center space-y-4 bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-100"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-pastel-lavender rounded-full text-slate-700">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">{value.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-light text-slate-800 mb-4">
              Why Choose <span className="font-cursive">Allure Art</span>
            </h2>
          </motion.div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-3xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <div className="text-slate-700 mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>  

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto scrollbar-hide gap-6 px-4 -mx-4">
              <div className="flex gap-6 animate-scroll">
                {[...features, ...features, ...features].map((feature, index) => (
                  <motion.div
                    key={`${feature.title}-${index}`}
                    className="flex-shrink-0 w-80 bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 hover:bg-white/90 transition-all duration-300"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index % 4) * 0.1, duration: 0.6 }}
                  >
                    <div className="text-slate-700 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-light">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the perfect piece that speaks to your soul and transforms your environment 
              into something truly extraordinary.
            </p>
            <motion.button
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Our Gallery
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;