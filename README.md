# Client Document Portal

A simple and secure client document upload portal built using Filestack and JavaScript.

This demo shows how clients can upload, view, and download their documents safely, with file access control.

---

## Features

- Secure file uploads with Filestack
- File organization by user ID
- Access control: Users only see their own files
- Upload progress and file list display
- Local file metadata storage (demo purpose)
- Download links that open securely in a new tab

---

## How It Works

1. The page loads and initialises Filestack using your API key.
2. A user clicks "Choose Files to Upload" to open the Filestack file picker.
3. Uploaded files are stored in a folder linked to the user’s ID.
4. Metadata (file name, URL, date, etc.) is saved.
5. Only the current user’s files are displayed in the file list.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repo-url>
cd client-document-portal
```

### 2. Add Your Filestack API Key

Open `portal.js` and replace the placeholder with your actual key:

```js
const FILESTACK_API_KEY = "YOUR_API_KEY";
```

You can get your free key at [Filestack Developer Portal](https://www.filestack.com/).

---

### 3. Run the Project

Simply open the `index.html` file in your browser.
No server setup needed, it runs locally.

> 💡 Tip: For production, always use HTTPS and a backend for authentication.

---

## Testing

- Open the portal in your browser.
- Click "Choose Files to Upload" and select a few files.
- Uploaded files will appear in “Your Documents” below.
- Refresh the page, your uploaded files will stay saved.

---

## Security Notes

- Use real user authentication in production.
- Always host your portal over HTTPS.
- Limit file types and sizes for safety:

  ```js
  accept: [".pdf", ".doc", ".docx", ".jpg", ".png"];
  maxSize: 10 * 1024 * 1024; // 10MB
  ```

- Consider enabling Filestack’s virus scanning and encryption features.

---

## Resources

- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [MDN Web Security Guide](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Google's Web Fundamentals: Security](https://web.dev/secure/)
- [Filestack Documentation](https://www.filestack.com/docs/)

---
