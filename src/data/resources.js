/**
 * Subject-wise PDF Resources
 * Centralized configuration for all study materials
 * 
 * To add a new PDF:
 * 1. Add the PDF file to src/assets/pdfs/{subject-folder}/
 * 2. Import it below
 * 3. Add to the appropriate subject's pdfs array
 */

// PDF Imports - Generative AI
import generativeAiPdf from '../assets/Generative-AI.pdf'

// PDF Imports - UI/UX Design
import uiuxDesignPdf from '../assets/UIUX-Design-Fundamentals.pdf'

// PDF Imports - DBMS
import dbmsPdf from '../assets/Database-Management-Systems-DBMS.pdf'

// PDF Imports - Digital Marketing
import digitalMarketingPdf from '../assets/Digital-Marketing-for-Beginners.pdf'

// PDF Imports - Trending Technologies
import trendingTechPdf from '../assets/Trending-Technologies-Every-Student-Should-Know.pdf'

/**
 * Subject Resources Configuration
 * Each subject has a title and array of PDFs
 */
export const subjectResources = {
    'generative-ai': {
        title: 'Generative AI',
        description: 'AI and Machine Learning study materials',
        pdfs: [
            {
                id: 'gen-ai-intro',
                name: 'Generative AI - Complete Guide',
                file: generativeAiPdf,
                description: 'Introduction to AI, neural networks, and LLMs'
            }
        ]
    },
    'ui-ux-design': {
        title: 'UI/UX Design',
        description: 'Design principles and UX fundamentals',
        pdfs: [
            {
                id: 'uiux-fundamentals',
                name: 'UI/UX Design Fundamentals',
                file: uiuxDesignPdf,
                description: 'User research, wireframing, and visual design'
            }
        ]
    },
    'dbms': {
        title: 'Database Management Systems',
        description: 'SQL, database design, and data management',
        pdfs: [
            {
                id: 'dbms-complete',
                name: 'DBMS Complete Notes',
                file: dbmsPdf,
                description: 'Relational databases, SQL, normalization'
            }
        ]
    },
    'digital-marketing': {
        title: 'Digital Marketing',
        description: 'Marketing strategies and online growth',
        pdfs: [
            {
                id: 'dm-beginners',
                name: 'Digital Marketing for Beginners',
                file: digitalMarketingPdf,
                description: 'SEO, social media, and content marketing'
            }
        ]
    },
    'trending-technologies': {
        title: 'Trending Technologies',
        description: 'Emerging tech and future innovations',
        pdfs: [
            {
                id: 'trending-tech',
                name: 'Trending Technologies Guide',
                file: trendingTechPdf,
                description: 'Cloud, blockchain, IoT, AR/VR, and more'
            }
        ]
    }
}

/**
 * Get resources for a specific subject
 */
export const getSubjectResources = (subjectId) => {
    return subjectResources[subjectId] || null
}

/**
 * Get all subjects with their resource counts
 */
export const getAllSubjectsWithCounts = () => {
    return Object.entries(subjectResources).map(([id, data]) => ({
        id,
        title: data.title,
        pdfCount: data.pdfs.length
    }))
}
