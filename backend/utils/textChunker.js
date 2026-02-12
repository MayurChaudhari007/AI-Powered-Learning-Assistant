// const chunkText = (text, maxLength = 1000) => {
//     const chunks = [];
//     let currentChunk = '';

//     // Simple splitting by sentences or spaces could be improved
//     // For now, we'll split by rough character count, trying to respect sentence boundaries if possible

//     const sentences = text.match(/[^.!?]+[.!?]+|\s\n+/g) || [text];

//     for (const sentence of sentences) {
//         if ((currentChunk + sentence).length > maxLength) {
//             if (currentChunk.trim().length > 0) {
//                 chunks.push(currentChunk.trim());
//             }
//             currentChunk = sentence;
//         } else {
//             currentChunk += sentence;
//         }
//     }

//     if (currentChunk.trim().length > 0) {
//         chunks.push(currentChunk.trim());
//     }

//     return chunks;
// };

// module.exports = { chunkText };




/**
 * Advanced Text Chunker for AI Learning Assistant
 * Splits text into overlapping segments to preserve context.
 */
const chunkText = (text, maxLength = 1000, overlap = 200) => {
    if (!text) return [];
    
    const chunks = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
        // 1. Get a raw slice of the text
        let chunk = text.substr(currentIndex, maxLength);

        // 2. Optimization: If we're not at the end, try to snap to the last sentence
        if (currentIndex + maxLength < text.length) {
            const lastSentenceEnd = Math.max(
                chunk.lastIndexOf('.'),
                chunk.lastIndexOf('?'),
                chunk.lastIndexOf('!'),
                chunk.lastIndexOf('\n')
            );

            // Snapping to a sentence end keeps the AI context cleaner
            if (lastSentenceEnd > maxLength * 0.7) {
                chunk = chunk.substring(0, lastSentenceEnd + 1);
            }
        }

        chunks.push(chunk.trim());

        // 3. Move forward, but subtract overlap to keep context bridges
        currentIndex += (chunk.length - overlap);
        
        // Prevent infinite loops if overlap is too high
        if (chunk.length <= overlap) currentIndex += chunk.length;
    }

    return chunks;
};

module.exports = { chunkText };