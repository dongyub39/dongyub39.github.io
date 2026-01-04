import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Youtube, FileText } from 'lucide-react'

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

interface PublicationModalProps {
  isOpen: boolean
  onClose: () => void
  publication: Publication | null
  yourName?: string
}

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  const match = url.match(regex)
  return match ? match[1] : null
}

export default function PublicationModal({ isOpen, onClose, publication, yourName = 'Dong-Yeop Shin' }: PublicationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!publication) return null

  const formatAuthors = (authors: string[]) => {
    const normalizeName = (name: string) => name.toLowerCase().trim().replace(/\s+/g, ' ')
    
    return authors.map((author, index) => {
      const isYourName = normalizeName(author) === normalizeName(yourName) || 
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

  const videoId = publication.links.video ? getYouTubeVideoId(publication.links.video) : null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 md:p-8 lg:p-12"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full text-gray-900 dark:text-white transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1">
                {/* Image/Video Viewer */}
                <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-800">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={publication.title}
                    />
                  ) : (
                    <img
                      src={publication.thumbnail}
                      alt={publication.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/800x450?text=Publication'
                      }}
                    />
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Title */}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {publication.title}
                    </h2>
                  </div>

                  {/* Authors */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Authors
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {formatAuthors(publication.authors)}
                    </p>
                  </div>

                  {/* Venue & Year */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                      Venue
                    </h3>
                    <p className="text-lg text-accent dark:text-accent-teal font-medium">
                      {publication.venue} {publication.year}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                      Abstract
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {publication.description}
                    </p>
                  </div>

                  {/* Links */}
                  {(publication.links.paper || publication.links.code || publication.links.video || publication.links.website) && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
                        Links
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {publication.links.paper && (
                          <a
                            href={publication.links.paper}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-accent hover:text-white transition-colors font-medium"
                          >
                            <FileText size={18} />
                            Paper
                          </a>
                        )}
                        {publication.links.code && (
                          <a
                            href={publication.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-accent hover:text-white transition-colors font-medium"
                          >
                            <Github size={18} />
                            Code
                          </a>
                        )}
                        {publication.links.video && (
                          <a
                            href={publication.links.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-accent hover:text-white transition-colors font-medium"
                          >
                            <Youtube size={18} />
                            Video
                          </a>
                        )}
                        {publication.links.website && (
                          <a
                            href={publication.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-accent hover:text-white transition-colors font-medium"
                          >
                            <ExternalLink size={18} />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

