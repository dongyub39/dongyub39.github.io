import { Mail, FileText } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const lastUpdated = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <footer id="contact" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-black text-gray-300">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:dongyub39@gmail.com"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-accent transition-colors"
              >
                <Mail size={18} />
                dongyub39@gmail.com
              </a>
              <a
                href="/DongYeop-Shin_CV.pdf"
                download="DongYeop-Shin_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-accent transition-colors"
              >
                <FileText size={18} />
                Download CV
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Links</h3>
            <div className="flex flex-col space-y-2">
              <a
                href="https://github.com/maido-39"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://orcid.org/0009-0008-9442-3923"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                ORCID
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© {currentYear} Dong-Yeop Shin. All rights reserved.</p>
          <p className="mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>
    </footer>
  )
}

