import { useState } from 'react'
import { motion } from 'framer-motion'
import galleryData from '../data/gallery.json'
import ImageModal from './ImageModal'

interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
}

export default function Gallery() {
  const gallery = galleryData as GalleryItem[]
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  return (
    <>
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Life & Gallery
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Photos from travels, conferences, and daily life
            </p>
          </motion.div>

          {/* Masonry Layout using CSS Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {gallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="break-inside-avoid mb-4 cursor-pointer group"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x600?text=Photo'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-white/90 text-xs line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          image={selectedImage.image}
          title={selectedImage.title}
          description={selectedImage.description}
        />
      )}
    </>
  )
}

