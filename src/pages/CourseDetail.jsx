import { useParams, Link } from 'react-router-dom'
import { getCourseByName } from '../data/courses'
import { getSubjectResources } from '../data/resources'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CourseDetail = () => {
    const { courseName } = useParams()
    const course = getCourseByName(courseName)
    const resources = getSubjectResources(courseName)

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
        <div className="min-h-screen bg-slate-50">
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
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                            {course.title}
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            {course.description}
                        </p>
                    </div>

                    {/* What You'll Learn */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">
                            What You'll Learn
                        </h2>
                        <ul className="space-y-3">
                            {course.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-slate-600">
                                        {highlight}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Study Materials - PDF Resources */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-6">
                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Study Materials
                            </h2>
                        </div>

                        <p className="text-slate-600 mb-8">
                            Download comprehensive study guides and resources to deepen your understanding.
                        </p>

                        {resources && resources.pdfs.length > 0 ? (
                            <div className="grid gap-4">
                                {resources.pdfs.map((pdf) => (
                                    <div
                                        key={pdf.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* PDF Icon */}
                                            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                                                    <path d="M8 12h8v2H8v-2zm0 4h5v2H8v-2z" />
                                                </svg>
                                            </div>

                                            {/* PDF Info */}
                                            <div>
                                                <h3 className="font-semibold text-slate-800 mb-1">
                                                    {pdf.name}
                                                </h3>
                                                <p className="text-sm text-slate-500">
                                                    {pdf.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 sm:flex-shrink-0">
                                            <a
                                                href={pdf.file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-100 transition-all duration-200"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                View
                                            </a>
                                            <a
                                                href={pdf.file}
                                                download
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-500 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Download
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-slate-500 font-medium">Study materials coming soon</p>
                                <p className="text-sm text-slate-400 mt-1">Check back later for downloadable resources</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default CourseDetail
