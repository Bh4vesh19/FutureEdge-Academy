export const courses = [
    {
        id: 'generative-ai',
        name: 'Generative AI',
        title: 'Generative AI',
        description: 'Understand how machines create text, images, and innovative solutions using artificial intelligence.',
        highlights: [
            'Introduction to AI and machine learning fundamentals',
            'Understanding neural networks and deep learning',
            'Text generation with large language models',
            'Image synthesis and creation techniques',
            'Ethical considerations in AI development',
            'Real-world applications and use cases'
        ],
        pdfLink: null // To be added later by user
    },
    {
        id: 'ui-ux-design',
        name: 'UI/UX Design',
        title: 'UI/UX Design',
        description: 'Learn the principles of creating intuitive, user-centered digital experiences.',
        highlights: [
            'User research and persona development',
            'Information architecture and user flows',
            'Wireframing and prototyping',
            'Visual design principles and best practices',
            'Usability testing and feedback integration',
            'Design systems and component libraries'
        ],
        pdfLink: null
    },
    {
        id: 'dbms',
        name: 'DBMS',
        title: 'Database Management Systems',
        description: 'Explore how data is structured, stored, and managed in modern applications.',
        highlights: [
            'Relational database concepts and SQL',
            'Database design and normalization',
            'Query optimization techniques',
            'Transaction management and ACID properties',
            'NoSQL databases and when to use them',
            'Data security and backup strategies'
        ],
        pdfLink: null
    },
    {
        id: 'digital-marketing',
        name: 'Digital Marketing',
        title: 'Digital Marketing',
        description: 'Discover strategies that help brands grow and connect with audiences online.',
        highlights: [
            'Digital marketing fundamentals and channels',
            'SEO and content marketing strategies',
            'Social media marketing and engagement',
            'Email marketing and automation',
            'Analytics and performance measurement',
            'Conversion optimization techniques'
        ],
        pdfLink: null
    },
    {
        id: 'trending-technologies',
        name: 'Trending Technologies',
        title: 'Trending Technologies',
        description: 'Stay updated with emerging tools and innovations shaping the future.',
        highlights: [
            'Cloud computing and serverless architecture',
            'Blockchain and cryptocurrency basics',
            'Internet of Things (IoT) applications',
            'Augmented and virtual reality',
            'Edge computing and 5G technology',
            'Quantum computing fundamentals'
        ],
        pdfLink: null
    }
]

export const getCourseByName = (courseName) => {
    return courses.find(course => course.id === courseName)
}
