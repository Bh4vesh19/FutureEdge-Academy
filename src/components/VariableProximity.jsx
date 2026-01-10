import { useRef, useEffect, useState } from 'react'

/**
 * VariableProximity - Interactive text that reacts to cursor proximity
 * Uses variable font weight and optical size for dynamic effect
 * Preserves word-safe line breaking
 */
const VariableProximity = ({
    text,
    className = '',
    radius = 120,
    minWeight = 400,
    maxWeight = 900,
    minOpticalSize = 9,
    maxOpticalSize = 36,
}) => {
    const containerRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)
    const mousePos = useRef({ x: -1000, y: -1000 })
    const animationRef = useRef(null)

    // Detect mobile/touch device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Split text into words, preserving spaces
    const words = text.split(' ')

    // Mouse tracking with requestAnimationFrame
    useEffect(() => {
        if (isMobile) return

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
        }

        const updateCharacters = () => {
            if (!containerRef.current) {
                animationRef.current = requestAnimationFrame(updateCharacters)
                return
            }

            const spans = containerRef.current.querySelectorAll('.prox-char')

            spans.forEach((span) => {
                const rect = span.getBoundingClientRect()
                const charCenterX = rect.left + rect.width / 2
                const charCenterY = rect.top + rect.height / 2

                const distance = Math.sqrt(
                    Math.pow(mousePos.current.x - charCenterX, 2) +
                    Math.pow(mousePos.current.y - charCenterY, 2)
                )

                // Linear falloff
                const proximity = Math.max(0, 1 - distance / radius)

                // Interpolate weight and optical size
                const weight = minWeight + (maxWeight - minWeight) * proximity
                const opticalSize = minOpticalSize + (maxOpticalSize - minOpticalSize) * proximity

                span.style.fontVariationSettings = `'wght' ${weight}, 'opsz' ${opticalSize}`
            })

            animationRef.current = requestAnimationFrame(updateCharacters)
        }

        window.addEventListener('mousemove', handleMouseMove)
        animationRef.current = requestAnimationFrame(updateCharacters)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isMobile, radius, minWeight, maxWeight, minOpticalSize, maxOpticalSize])

    // Mobile: render static bold text
    if (isMobile) {
        return (
            <span
                className={className}
                style={{
                    fontVariationSettings: `'wght' 700, 'opsz' 24`,
                    wordBreak: 'normal',
                    overflowWrap: 'break-word',
                }}
            >
                {text}
            </span>
        )
    }

    return (
        <span
            ref={containerRef}
            className={className}
            style={{
                wordBreak: 'normal',
                overflowWrap: 'break-word',
                whiteSpace: 'normal',
            }}
        >
            {words.map((word, wordIndex) => (
                <span
                    key={wordIndex}
                    className="inline-block"
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {word.split('').map((char, charIndex) => (
                        <span
                            key={`${wordIndex}-${charIndex}`}
                            className="prox-char"
                            style={{
                                fontVariationSettings: `'wght' ${minWeight}, 'opsz' ${minOpticalSize}`,
                                display: 'inline',
                            }}
                        >
                            {char}
                        </span>
                    ))}
                    {/* Add space after word (except last word) */}
                    {wordIndex < words.length - 1 && (
                        <span className="prox-char" style={{ display: 'inline' }}>&nbsp;</span>
                    )}
                </span>
            ))}
        </span>
    )
}

export default VariableProximity
