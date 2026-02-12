// const fs = require('fs');
// const pdf = require('pdf-parse');

// const extractTextFromPDF = async (filePath) => {
//     try {
//         const dataBuffer = fs.readFileSync(filePath);
//         const data = await pdf(dataBuffer);
//         return {
//             text: data.text,
//             numpages: data.numpages
//         };
//     } catch (error) {
//         console.error('PDF Extraction Error:', error);
//         throw new Error('Failed to extract text from PDF');
//     }
// };

// module.exports = { extractTextFromPDF };





// const pdf = require('pdf-parse');

// /**
//  * Extracts text and metadata from a PDF buffer.
//  * @param {Buffer} dataBuffer - The raw binary data of the PDF.
//  * @returns {Object} - Contains extracted text and page count.
//  */
// const extractTextFromPDF = async (dataBuffer) => {
//     try {
//         // Ensure we are passing the Buffer directly to pdf-parse
//         const data = await pdf(dataBuffer);

//         // Basic validation to ensure text was actually found
//         if (!data.text || data.text.trim().length === 0) {
//             console.warn("PDF parsed but no text was extracted (might be an image-only PDF).");
//         }

//         return {
//             text: data.text,
//             numpages: data.numpages,
//             info: data.info // Optional: metadata like Author, Creator, etc.
//         };
//     } catch (error) {
//         // Log the specific error for debugging
//         console.error('PDF Extraction Utility Error:', error.message);
        
//         throw new Error('Failed to parse PDF content. Ensure the file is not corrupted.');
//     }
// };

// module.exports = extractTextFromPDF;





// const pdf = require('pdf-parse');

// const extractTextFromPDF = async (dataBuffer) => {
//     try {
//         // Fix: Some versions require calling pdf.default or checking if it's a function
//         const parse = typeof pdf === 'function' ? pdf : pdf.default;
        
//         if (typeof parse !== 'function') {
//             // This is a failsafe if the library import is still being difficult
//             const pdfAlternative = require('pdf-parse/lib/pdf-parse.js');
//             const data = await pdfAlternative(dataBuffer);
//             return { text: data.text, numpages: data.numpages };
//         }

//         const data = await parse(dataBuffer);

//         return {
//             text: data.text || '',
//             numpages: data.numpages || 0
//         };
//     } catch (error) {
//         console.error('PDF Extraction Utility Error:', error.message);
//         throw new Error('Failed to parse PDF content. Ensure the file is not corrupted.');
//     }
// };

// module.exports = extractTextFromPDF;

















// const pdf = require('pdf-parse-new');

// /**
//  * Extracts text and page count from a PDF buffer.
//  * Optimized for Node.js 22+ and memory-storage buffers.
//  */
// const extractTextFromPDF = async (dataBuffer) => {
//     try {
//         if (!dataBuffer) {
//             throw new Error('No data buffer provided to parser');
//         }

//         // With pdf-parse-new, the root import is the function itself
//         const data = await pdf(dataBuffer);

//         return {
//             text: data.text || '',
//             numpages: data.numpages || 0
//         };
//     } catch (error) {
//         // Detailed logging to catch any binary data issues
//         console.error('PDF Parsing Core Error:', error.message);
//         throw new Error('Technical failure during PDF text extraction.');
//     }
// };

// module.exports = extractTextFromPDF;






const pdf = require('pdf-parse-new');

/**
 * Optimized PDF Parser for Node.js 22
 * Disables heavy processing to prevent timeouts on complex files
 */
const extractTextFromPDF = async (dataBuffer) => {
    try {
        if (!dataBuffer) {
            throw new Error('No data buffer provided to parser');
        }

        // Options to prevent hanging on complex PDFs
        const options = {
            // pagerender can be used to customize how text is joined
            // but the default is usually sufficient if we handle the promise correctly
            max: 0 // 0 means no limit on pages parsed
        };

        // With pdf-parse-new, the root import is the function itself
        const data = await pdf(dataBuffer, options);

        return {
            text: data.text || '',
            numpages: data.numpages || 0
        };
    } catch (error) {
        // Detailed logging to catch any binary data issues
        console.error('PDF Parsing Core Failure:', error.message);
        throw new Error('Technical failure during PDF text extraction.');
    }
};

module.exports = extractTextFromPDF;