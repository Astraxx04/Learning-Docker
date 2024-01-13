const qr = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const { BadRequestError, NotFoundError } = require("../errors");

// Function to generate unique IDs
const generateUniqueIDs = (count) => {
    const uniqueIDs = [];
    for (let i = 0; i < count; i++) {
        uniqueIDs.push(uuidv4());
    }
    return uniqueIDs;
}

// Function to generate QR codes as base64-encoded images with unique IDs
const generateQRCodeImagesWithUniqueIDs = async(count) => {
    const uniqueIDs = generateUniqueIDs(count);
    const qrCodeImages = [];

    for (const uniqueID of uniqueIDs) {
        try {
            const qrCodeDataURL = await qr.toDataURL(uniqueID);
            qrCodeImages.push(qrCodeDataURL);
        } catch (error) {
            console.error(`Error generating QR code for "${uniqueID}":`, error);
        }
    }
    return qrCodeImages;
}



const createQrCodes = async(req, res) => {
    const qrcodes=[]
    const { numberOfQrCodes } = req.body;
    try {
        const qrCodeImages = await generateQRCodeImagesWithUniqueIDs(numberOfQrCodes);
        res.status(200).json(qrCodeImages);
    } catch (error) {
        console.error('Error generating QR codes:', error);
        res.status(500).json({ error: 'Error generating QR codes' });
    }
}

module.exports = { createQrCodes };