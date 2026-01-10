import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ExploreTopics from '../components/ExploreTopics'
import Subjects from '../components/Subjects'
import About from '../components/About'
import Footer from '../components/Footer'
import AiAssistant from '../components/AiAssistant'

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <ExploreTopics />
            <Subjects />
            <About />
            <Footer />
            <AiAssistant />
        </div>
    )
}

export default Home
