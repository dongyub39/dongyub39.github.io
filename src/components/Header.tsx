import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/#contact' },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (path: string) => {
    if (path.startsWith('/#')) {
      // Handle anchor links
      const hash = path.substring(1)
      if (location.pathname === '/') {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.location.href = path
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className={`text-xl font-bold hover:text-accent transition-colors ${
              isScrolled
                ? 'text-gray-900 dark:text-white'
                : 'text-white dark:text-white drop-shadow-lg'
            }`}
          >
            Dong-Yeop Shin
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.path.startsWith('/#') ? (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.path)
                  }}
                  className={`text-sm font-medium hover:text-accent dark:hover:text-accent transition-colors ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-white dark:text-gray-300 drop-shadow-md'
                  }`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-sm font-medium hover:text-accent dark:hover:text-accent transition-colors ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-white dark:text-gray-300 drop-shadow-md'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-white dark:text-gray-300 drop-shadow-md'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-white dark:text-gray-300 drop-shadow-md'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isScrolled
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-white dark:text-gray-300 drop-shadow-md'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            isScrolled
              ? 'border-gray-200 dark:border-gray-800'
              : 'border-white/20 dark:border-gray-800'
          }`}>
            {navItems.map((item) => (
              item.path.startsWith('/#') ? (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.path)
                  }}
                  className={`block py-2 text-sm font-medium hover:text-accent transition-colors ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-white dark:text-gray-300 drop-shadow-md'
                  }`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`block py-2 text-sm font-medium hover:text-accent transition-colors ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-white dark:text-gray-300 drop-shadow-md'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

