import { motion } from 'framer-motion'
import graduationChar from '../assets/graduation-character.png'
import heroBg from '../assets/hero-bg.jpg'
import VariableProximity from './VariableProximity'

const Hero = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Non-blocking animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 }
    }

    return (
        <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
            {/* Layer 1: Background Image with subtle blur */}
            <div
                className="absolute inset-0 bg-cover bg-center blur-sm"
                style={{ backgroundImage: `url(${heroBg})` }}
            />

            {/* Layer 2: Reduced opacity overlay for better background visibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/40 to-white/30" />

            {/* Layer 3: Additional subtle white layer for balance */}
            <div className="absolute inset-0 bg-white/10" />

            {/* Layer 4: Content - Dark text on light background */}
            <div className="relative z-10 w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Text Content */}
                        <div className="space-y-6">
                            {/* Headline - Interactive Variable Font Proximity */}
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-slate-800 variable-font tracking-tight max-w-[650px]"
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                style={{
                                    wordBreak: 'normal',
                                    overflowWrap: 'break-word',
                                }}
                            >
                                <VariableProximity
                                    text="A modern learning platform for students"
                                    className="block"
                                    radius={120}
                                    minWeight={400}
                                    maxWeight={900}
                                    minOpticalSize={14}
                                    maxOpticalSize={40}
                                />
                            </motion.h1>

                            {/* Subtext - Medium slate for readability */}
                            <motion.p
                                className="text-lg md:text-xl text-slate-700 leading-relaxed"
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                            >
                                Concept-based resources, clear explanations, and downloadable study guides.
                            </motion.p>

                            {/* Buttons - High contrast */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
                            >
                                <button
                                    onClick={() => scrollToSection('subjects')}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-500 hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    View Subjects
                                </button>
                                <button
                                    onClick={() => scrollToSection('explore-topics')}
                                    className="px-8 py-3 border border-blue-500 text-blue-600 bg-white rounded-full font-medium hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                                >
                                    Explore Topics
                                </button>
                            </motion.div>
                        </div>

                        {/* Right Side - Graduation Character with Ground Shadow */}
                        <div className="flex justify-center items-end bg-transparent relative">
                            {/* Character Container */}
                            <div className="relative">
                                {/* Main Character - Bold & Prominent */}
                                <img
                                    src={graduationChar}
                                    alt="Graduation character"
                                    className="block bg-transparent rounded-none object-contain w-auto max-h-[480px] md:max-h-[500px] relative z-10"
                                    style={{
                                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))',
                                    }}
                                />

                                {/* Elliptical Ground Shadow */}
                                <div
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[55%] h-4 md:h-5 rounded-[50%] z-0"
                                    style={{
                                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, transparent 60%)',
                                        filter: 'blur(5px)',
                                        transform: 'translateX(-50%) translateY(40%)',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
