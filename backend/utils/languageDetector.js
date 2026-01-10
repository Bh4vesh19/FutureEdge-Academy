/**
 * Language Detector Utility
 * Detects user language ONCE per request and stores in context
 * Refinement #1: Language consistency across all responses
 */

function detectLanguage(text) {
    const hasDevanagari = /[\u0900-\u097F]/.test(text)
    const hasGujarati = /[\u0A80-\u0AFF]/.test(text)
    const hasTamil = /[\u0B80-\u0BFF]/.test(text)
    const hasTelugu = /[\u0C00-\u0C7F]/.test(text)
    const hasEnglish = /[a-zA-Z]/.test(text)

    // Mixed language detection (Hinglish)
    if (hasEnglish && hasDevanagari) return 'mixed'
    if (hasDevanagari) return 'hi'
    if (hasGujarati) return 'gu'
    if (hasTamil) return 'ta'
    if (hasTelugu) return 'te'
    return 'en'
}

/**
 * Get error messages in detected language
 * All responses must follow the same language
 */
const errorMessages = {
    rate_limit: {
        en: "⏳ Please wait a moment before sending another message.",
        hi: "⏳ कृपया दूसरा message भेजने से पहले थोड़ा wait करें।",
        mixed: "⏳ Thoda wait karo, phir message bhejo 😊",
        gu: "⏳ બીજો સંદેશ મોકલતા પહેલા થોડી રાહ જુઓ.",
        ta: "⏳ அடுத்த செய்தியை அனுப்பும் முன் சிறிது காத்திருக்கவும்.",
        te: "⏳ మరొక సందేశం పంపే ముందు కొంత వేచి ఉండండి."
    },
    api_error: {
        en: "⚠️ I'm having trouble right now. Please try again in a moment.",
        hi: "⚠️ अभी मुझे problem हो रही है। कृपया कुछ देर बाद try करें।",
        mixed: "⚠️ Abhi problem hai, thodi der baad try karo.",
        gu: "⚠️ હમણાં મને મુશ્કેલી આવી રહી છે. કૃપા કરીને થોડા સમય પછી ફરી પ્રયાસ કરો.",
        ta: "⚠️ இப்போது எனக்கு சிக்கல் உள்ளது. சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்.",
        te: "⚠️ ఇప్పుడు నాకు సమస్య ఉంది. దయచేసి కొంత సమయం తర్వాత మళ్ళీ ప్రయత్నించండి."
    },
    retry_failed: {
        en: "😔 I couldn't process your request right now. Please try again.",
        hi: "😔 अभी मैं आपका request process नहीं कर पाया। कृपया फिर try करें।",
        mixed: "😔 Abhi tumhara request process nahi kar paya. Phir se try karo.",
        gu: "😔 હું હમણાં તમારી વિનંતી પર પ્રક્રિયા કરી શક્યો નહીં. કૃપા કરીને ફરી પ્રયાસ કરો.",
        ta: "😔 உங்கள் கோரிக்கையை இப்போது என்னால் செயலாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
        te: "😔 మీ అభ్యర్థనను ఇప్పుడు నేను ప్రాసెస్ చేయలేకపోయాను. దయచేసి మళ్ళీ ప్రయత్నించండి."
    }
}

function getErrorMessage(errorType, language) {
    return errorMessages[errorType][language] || errorMessages[errorType].en
}

module.exports = {
    detectLanguage,
    getErrorMessage
}
