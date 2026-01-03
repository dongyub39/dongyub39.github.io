import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import galleryData from '../data/gallery.json'
import ImageModal from '../components/ImageModal'

interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
  year: number
}

export default function Gallery() {
  const gallery = galleryData as GalleryItem[]
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  // Group gallery items by year (sorted descending)
  const groupedByYear = useMemo(() => {
    const grouped: { [year: number]: GalleryItem[] } = {}
    gallery.forEach((item) => {
      if (!grouped[item.year]) {
        grouped[item.year] = []
      }
      grouped[item.year].push(item)
    })
    // Sort years in descending order
    return Object.keys(grouped)
      .map(Number)
      .sort((a, b) => b - a)
      .map((year) => ({ year, items: grouped[year] }))
  }, [gallery])

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Life & Gallery
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Photos from travels, conferences, and daily life
            </p>
          </motion.div>

          {/* Timeline View */}
          <div className="space-y-16">
            {groupedByYear.map(({ year, items }, yearIndex) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: yearIndex * 0.1 }}
                className="relative"
              >
                {/* Year Header with Timeline */}
                <div className="flex items-center mb-8">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-accent dark:bg-accent-teal z-10"></div>
                    <div className="w-32 h-0.5 bg-accent dark:bg-accent-teal ml-2"></div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white ml-4">
                    {year}
                  </h2>
                </div>

                {/* Tile View Grid for this year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ml-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: yearIndex * 0.1 + index * 0.05 }}
                      className="relative group cursor-pointer aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800"
                      onClick={() => setSelectedImage(item)}
                    >
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x400?text=Photo'
                        }}
                      />
                      {/* Caption overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                          <p className="text-white/90 text-xs line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Timeline line (except for last year) */}
                {yearIndex < groupedByYear.length - 1 && (
                  <div className="absolute left-2 top-12 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700 -translate-y-8"></div>
                )}
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
