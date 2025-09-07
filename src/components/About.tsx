import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Palette, Users } from 'lucide-react';

const About: React.FC = () => {
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

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <h2 className="text-5xl font-light text-slate-800">
                About <span className="font-cursive">Allure Art</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Founded with a passion for bringing extraordinary art into everyday spaces, Allure Art curates a collection that speaks to the soul. We believe art has the power to transform not just spaces, but lives.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our journey began with a simple vision: to make exceptional art accessible to art lovers everywhere. Today, we work with talented artists from around the globe, showcasing their unique perspectives and creative excellence.
              </p>
            </div>

            <motion.button
              className="bg-slate-800 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-700 transition-colors duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More About Our Mission
            </motion.button>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/90 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-slate-700 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;