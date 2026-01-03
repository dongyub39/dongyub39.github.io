import { motion } from 'framer-motion'
import { Github, ExternalLink, FileText } from 'lucide-react'
import projectsData from '../data/projects.json'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  links: {
    github?: string
    demo?: string
    paper?: string
  }
}

export default function Projects() {
  const { major, toy } = projectsData as { major: Project[]; toy: Project[] }

  const ProjectCard = ({ project, isMajor = true }: { project: Project; isMajor?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-video">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Project'
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-accent hover:text-white transition-colors"
            >
              <Github size={14} />
              Code
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-accent hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              Demo
            </a>
          )}
          {project.links.paper && (
            <a
              href={project.links.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-accent hover:text-white transition-colors"
            >
              <FileText size={14} />
              Paper
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Major Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Major Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Research and development projects
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {major.map((project) => (
              <ProjectCard key={project.id} project={project} isMajor={true} />
            ))}
          </div>
        </motion.div>

        {/* Toy Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Toy Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Personal projects and experiments
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toy.map((project) => (
              <ProjectCard key={project.id} project={project} isMajor={false} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

