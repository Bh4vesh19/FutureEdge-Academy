import { useParams, Link } from 'react-router-dom'
import { getCourseByName } from '../data/courses'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CourseDetail = () => {
    const { courseName } = useParams()
    const course = getCourseByName(courseName)

    if (!course) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Course Not Found</h1>
                    <Link to="/" className="text-blue-500 hover:underline">
                        Return to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-8 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>

                    {/* Course Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 md:p-12 mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            {course.title}
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                            {course.description}
                        </p>
                    </div>

                    {/* Key Learning Highlights */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 md:p-12 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                            What You'll Learn
                        </h2>
                        <ul className="space-y-4">
                            {course.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-slate-600 text-lg">
                                        {highlight}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Download Study Guide */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                            Study Materials
                        </h2>
                        <p className="text-slate-600 mb-6">
                            Download comprehensive study guides and resources to deepen your understanding.
                        </p>
                        {course.pdfLink ? (
                            <a
                                href={course.pdfLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-all duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Study Guide (PDF)
                            </a>
                        ) : (
                            <button
                                disabled
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-300 text-slate-500 rounded-md font-medium cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Study Guide (Coming Soon)
                            </button>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default CourseDetail
