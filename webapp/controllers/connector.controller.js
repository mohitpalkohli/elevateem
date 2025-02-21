const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

// Initialize the OAuth2 client
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Initialize the Google Docs API client
const docs = google.docs({ version: 'v1' });

exports.getGoogleDoc = async (req, res) => {
  try {
    const { docId } = req.query;
    const tokens = req.session.tokens; // Get tokens from session

    if (!tokens) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!docId) {
      return res.status(400).json({ message: 'Document ID is required' });
    }

    oauth2Client.setCredentials(tokens);

    const response = await docs.documents.get({
      documentId: docId,
      auth: oauth2Client,
    });

    res.json({
      content: response.data,
      documentId: docId,
    });
  } catch (error) {
    console.error('Error fetching Google Doc:', error);
    res.status(500).json({ message: 'Error fetching Google Doc', error: error.message });
  }
}; 