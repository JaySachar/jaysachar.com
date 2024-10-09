const express = require('express');
const multer = require('multer');
const mega = require('mega');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temporary storage

// Replace these with your actual MEGA credentials
const megaEmail = process.env.MEGA_EMAIL;
const megaPassword = process.env.MEGA_PASSWORD;

// Endpoint to upload files
app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path;

    // Login to MEGA
    mega.login(megaEmail, megaPassword, (error, client) => {
        if (error) {
            return res.status(500).send('Login failed');
        }

        // Upload file to MEGA
        client.upload(filePath, (uploadError) => {
            if (uploadError) {
                return res.status(500).send('Upload failed');
            }

            // Clean up temporary file
            fs.unlinkSync(filePath); // Delete the file from temp storage
            res.send('File uploaded successfully!');
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
