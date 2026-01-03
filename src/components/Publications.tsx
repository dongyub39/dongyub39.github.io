import { motion } from 'framer-motion'
import { ExternalLink, Github, Youtube, FileText } from 'lucide-react'
import publicationsData from '../data/publications.json'

interface Publication {
  id: number
  title: string
  authors: string[]
  venue: string
  year: number
  thumbnail: string
  links: {
    paper?: string
    code?: string
    video?: string
    website?: string
  }
  description: string
}

const YOUR_NAME = 'Dong-Yeop Shin'

export default function Publications() {
  const publications = publicationsData as Publication[]

  const formatAuthors = (authors: string[]) => {
    // 이름 매칭을 더 유연하게 (대소문자 무시, 공백 정규화)
    const normalizeName = (name: string) => name.toLowerCase().trim().replace(/\s+/g, ' ')
    
    return authors.map((author, index) => {
      const isYourName = normalizeName(author) === normalizeName(YOUR_NAME) || 
                         author.includes('Shin') || 
                         author.includes('Dong-Yeop')
      
      return (
        <span key={index}>
          {isYourName ? (
            <span className="font-bold text-accent dark:text-accent-teal">{author}</span>
          ) : (
            author
          )}
          {index < authors.length - 1 && ', '}
        </span>
      )
    })
  }

  return (
    <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Publications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Selected research papers and publications
          </p>
        </motion.div>

        <div className="space-y-8">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="grid md:grid-cols-[30%_70%] gap-0">
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-800 aspect-video md:aspect-auto">
                  <motion.img
                    src={pub.thumbnail}
                    alt={pub.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Publication'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {pub.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2">
                    {formatAuthors(pub.authors)}
                  </p>
                  <p className="text-sm text-accent dark:text-accent-teal font-medium mb-4">
                    {pub.venue} {pub.year}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {pub.description}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2">
                    {pub.links.paper && (
                      <a
                        href={pub.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-accent hover:text-white transition-colors"
                      >
                        <FileText size={14} />
                        Paper
                      </a>
                    )}
                    {pub.links.code && (
                      <a
                        href={pub.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-accent hover:text-white transition-colors"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                    {pub.links.video && (
                      <a
                        href={pub.links.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-accent hover:text-white transition-colors"
                      >
                        <Youtube size={14} />
                        Video
                      </a>
                    )}
                    {pub.links.website && (
                      <a
                        href={pub.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-accent hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

