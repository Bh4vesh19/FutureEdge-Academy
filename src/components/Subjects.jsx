import { motion } from 'framer-motion'
import { courses } from '../data/courses'
import { Link } from 'react-router-dom'

const Subjects = () => {
    return (
        <section id="subjects" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Our Subjects
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Choose from our carefully curated subjects designed to help you master essential concepts.
                    </p>
                </div>

                {/* Course Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group h-full flex flex-col"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.08 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-500 transition-colors duration-200">
                                    {course.name}
                                </h3>
                                <p className="text-slate-600 mb-6 line-clamp-3">
                                    {course.description}
                                </p>
                                <div className="mt-auto">
                                    <Link
                                        to={`/course/${course.id}`}
                                        className="inline-block w-full text-center px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-500 hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        View Subject
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Subjects
