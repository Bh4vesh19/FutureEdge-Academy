import { motion } from 'framer-motion'

const ExploreTopics = () => {
    const topics = [
        {
            title: 'Generative AI Basics',
            description: 'How machines create text, images, and ideas'
        },
        {
            title: 'User Experience Principles',
            description: 'Designing intuitive interfaces'
        },
        {
            title: 'Databases & Data Models',
            description: 'How data is stored and structured'
        },
        {
            title: 'Digital Growth Strategies',
            description: 'How brands grow online'
        },
        {
            title: 'Emerging Technologies',
            description: 'Tools shaping the future'
        }
    ]

    return (
        <section id="explore-topics" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Explore Topics
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Browse key concepts across modern technologies and understand what each field focuses on.
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((topic, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-500 transition-colors duration-200">
                                {topic.title}
                            </h3>
                            <p className="text-slate-600">
                                {topic.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ExploreTopics
