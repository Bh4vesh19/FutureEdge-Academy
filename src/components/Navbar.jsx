import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const scrollToSection = (sectionId) => {
        // If not on home page, navigate to home first
        if (location.pathname !== '/') {
            navigate('/')
            setTimeout(() => {
                const element = document.getElementById(sectionId)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        } else {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setIsMenuOpen(false)
    }

    const handleHomeClick = () => {
        navigate('/')
        setIsMenuOpen(false)
    }

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <Link
                        to="/"
                        className="text-xl font-semibold hover:opacity-80 transition-opacity duration-200"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="text-blue-600">Future</span>
                        <span className="text-teal-500">Edge</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={handleHomeClick}
                            className="text-slate-600 hover:text-blue-500 transition-colors duration-200 font-medium"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('subjects')}
                            className="text-slate-600 hover:text-blue-500 transition-colors duration-200 font-medium"
                        >
                            Courses
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="text-slate-600 hover:text-blue-500 transition-colors duration-200 font-medium"
                        >
                            About
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200 font-medium"
                        >
                            Contact
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-blue-500 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-200">
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={handleHomeClick}
                                className="text-left px-4 py-2 text-slate-600 hover:text-blue-500 hover:bg-slate-50 rounded transition-colors duration-200 font-medium"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => scrollToSection('subjects')}
                                className="text-left px-4 py-2 text-slate-600 hover:text-blue-500 hover:bg-slate-50 rounded transition-colors duration-200 font-medium"
                            >
                                Courses
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="text-left px-4 py-2 text-slate-600 hover:text-blue-500 hover:bg-slate-50 rounded transition-colors duration-200 font-medium"
                            >
                                About
                            </button>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="mx-4 px-4 py-2 border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200 font-medium text-center"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
