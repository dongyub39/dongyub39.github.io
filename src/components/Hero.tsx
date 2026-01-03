import { motion } from 'framer-motion'
import { Github, Mail, Youtube, GraduationCap } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/maido-39', label: 'GitHub' },
  { icon: GraduationCap, href: 'https://orcid.org/0009-0008-9442-3923', label: 'ORCID' },
  { icon: Youtube, href: 'https://youtube.com/maido-a', label: 'YouTube' },
  { icon: Mail, href: 'mailto:dongyub39@gmail.com', label: 'Email' },
]

const researchInterests = [
  'Vision-Language-Action (VLA)',
  'Proactive Human Assistance',
  'Implicit Intent Inference',
  'Adaptive Interaction',
  'Dynamic Perception',
  'Long-term Memory',
  'Persistent Understanding',
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/sky-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for readability - darker in light mode, lighter in dark mode */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/20" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent/20 dark:border-accent/30 shadow-xl">
                <img
                  src="/images/profile.jpg"
                  alt="Dong-Yeop Shin"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.src = 'https://via.placeholder.com/400?text=DK'
                  }}
                />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 w-20 h-20 bg-accent rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>

          {/* Right: Name, Affiliation, Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-4 drop-shadow-lg">
                Dong-Yeop Shin
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 dark:text-gray-200 mb-2 drop-shadow-md">
                Robotics & AI Researcher
              </p>
              <p className="text-lg text-gray-200 dark:text-gray-300 drop-shadow-md">
                Seoul National University<br />
                Master of College of Engineering, Smart City Engineering<br />
                Autonomous Robot Intelligence Laboratory
              </p>
            </div>

            <p className="text-base md:text-lg text-gray-100 dark:text-gray-200 leading-relaxed drop-shadow-md">
              My research focuses on Vision-Language-Action (VLA) models capable of proactive human assistance, 
              aimed at inferring implicit human intents through adaptive interaction. I am dedicated to overcoming 
              the limitations of static foundation models by developing robust perception and long-term memory 
              architectures, enabling robots to maintain a persistent, dynamic understanding of the physical world.
            </p>

            {/* Research Interests */}
            <div>
              <h3 className="text-sm font-semibold text-gray-200 dark:text-gray-300 mb-3 uppercase tracking-wide drop-shadow-md">
                Research Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {researchInterests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="px-4 py-2 bg-white/20 dark:bg-accent/30 backdrop-blur-sm text-white dark:text-accent-teal rounded-full text-sm font-medium border border-white/30 dark:border-accent/50 shadow-lg"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg bg-white/20 dark:bg-gray-800/80 backdrop-blur-sm text-white dark:text-gray-300 hover:bg-accent hover:text-white transition-colors shadow-lg border border-white/20 dark:border-gray-700"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

