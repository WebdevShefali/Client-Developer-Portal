// Replace with your actual Filestack API key
const FILESTACK_API_KEY = "YOUR_API_KEY";

// Initialise Filestack client
const client = filestack.init(FILESTACK_API_KEY);

// Store the current user's ID (in a real app, this comes from your authentication system)
const currentUserId = "client_123"; // Example placeholder

// Upload button click handler
document.getElementById("uploadBtn").addEventListener("click", () => {
  // Configure the file picker with security options
  const options = {
    maxFiles: 5, // Maximum number of files allowed per upload
    uploadInBackground: false, // Wait until upload finishes before closing picker
    onUploadDone: (result) => handleUploadComplete(result), // Callback after upload
    accept: [".pdf", ".doc", ".docx", ".jpg", ".png"], // Restrict allowed file types
    maxSize: 10 * 1024 * 1024, // Max file size: 10MB
    storeTo: {
      path: `client-documents/${currentUserId}/`, // Store files organized by user ID
    },
  };

  // Open the Filestack file picker
  client.picker(options).open();
});

// Handle successful uploads
function handleUploadComplete(result) {
  console.log("Upload successful:", result);

  // Save metadata of each uploaded file
  result.filesUploaded.forEach((file) => {
    saveFileMetadata({
      fileName: file.filename,
      fileUrl: file.url,
      fileHandle: file.handle,
      uploadDate: new Date().toISOString(), // Current timestamp
      userId: currentUserId,
      fileSize: file.size,
      fileType: file.mimetype,
    });
  });

  // Refresh the file list in the portal
  loadUserFiles();
}

// Save file metadata (for demo purposes, stored in localStorage)
function saveFileMetadata(fileData) {
  // In production, send this to your backend server
  let userFiles = JSON.parse(localStorage.getItem("userFiles") || "[]"); // Get existing files
  userFiles.push(fileData); // Add new file
  localStorage.setItem("userFiles", JSON.stringify(userFiles)); // Save back
}

// Load and display only the current user's files
function loadUserFiles() {
  const allFiles = JSON.parse(localStorage.getItem("userFiles") || "[]"); // Retrieve files
  const container = document.getElementById("fileListContainer"); // Container element

  // Filter files to only show those uploaded by current user
  const userFiles = allFiles.filter((file) => file.userId === currentUserId);

  if (userFiles.length === 0) {
    container.innerHTML =
      '<p style="color: #666;">No documents uploaded yet.</p>';
    return;
  }
  // Generate HTML for each file
  container.innerHTML = userFiles
    .map(
      (file) => `
        <div class="file-item">
            <div>
                <strong>${file.fileName}</strong>
                <br>
                <small>Uploaded: ${new Date(
                  file.uploadDate
                ).toLocaleDateString()}</small>
            </div>
            <button onclick="downloadFile('${file.fileUrl}')">Download</button>
        </div>
    `
    )
    .join("");
}

// Download file securely in a new tab
function downloadFile(url) {
  window.open(url, "_blank");
}

// Load user files when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadUserFiles();
});
