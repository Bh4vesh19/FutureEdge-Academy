/**
 * Quick Response Handler
 * Handles greetings instantly without OpenAI call
 * Refinement #6: Instant response but maintain context
 */

const greetings = ['hi', 'hello', 'hey', 'namaste', 'namaskar', 'hola']

function isGreeting(message) {
    const lowerMsg = message.toLowerCase().trim()
    return greetings.some(g => lowerMsg === g || lowerMsg.startsWith(g + ' '))
}

const quickGreetings = {
    en: "Hi! 👋 I'm FutureEdge AI. How can I help you today?",
    hi: "नमस्ते! 👋 मैं FutureEdge AI हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    mixed: "Hi! 👋 Main FutureEdge AI hun. Aaj main tumhari kaise help kar sakta hun?",
    gu: "નમસ્તે! 👋 હું FutureEdge AI છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?",
    ta: "வணக்கம்! 👋 நான் FutureEdge AI. இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    te: "నమస్కారం! 👋 నేను FutureEdge AI. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?"
}

function getQuickGreeting(language) {
    return quickGreetings[language] || quickGreetings.en
}

module.exports = {
    isGreeting,
    getQuickGreeting
}
