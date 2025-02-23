# [EnigmaV2](https://enigma-v2.vercel.app/)

> **EnigmaV2** is a secure web-based application that allows users to encrypt and decrypt messages using AES encryption. With an intuitive interface, users can easily enter text and a secret key to encrypt or decrypt their data, ensuring privacy and confidentiality.

---

## ✨ Key Features:
- **AES Encryption:** Provides secure encryption and decryption using AES with a customizable secret key (max 18 characters).
- **Easy-to-Use Interface:** Enter text and key, and seamlessly encrypt or decrypt messages with a single click.
- **Clear Text and Key:** Simple buttons to clear the input fields and reset the app for a fresh start.
- **Quick Input:** Paste button for faster text input from clipboard.

---

## 🛡️ Security Features
- **AES-256 Encryption**: Military-grade encryption standard
- **Client-Side Processing**: All encryption/decryption happens locally
- **No Data Storage**: Messages are never stored or transmitted
- **Key Security**: Encryption keys are never saved or logged

## 🛠 Technical Overview:
- **Frontend:** Built with React for a dynamic and responsive user experience.
- **Encryption:** Uses AES encryption for secure data handling.
- **UI Framework:** Styled with CSS for a clean, modern look and feel.
- **Hosting:** Deployed on Vercel for quick and reliable hosting.

---

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LethaXl/EnigmaV2.git
   ```

2. Navigate into the repository directory:
   ```bash
   cd EnigmaV2
   ```

3. Install required dependencies:
   ```bash
   npm install
   ```

### Running Locally

1. Start the development server:
   ```bash
   npm start
   ```

2. Visit `http://localhost:3000` in your browser to view the app.

## 🔒 Usage

1. **Enter Text**: 
   - Input the message you want to encrypt or decrypt
   - Use the "Paste" button to quickly insert text from your clipboard
2. **Enter Key**: 
   - Provide a secret key for encryption/decryption
   - Maximum length: 18 characters
3. **Choose Operation**:
   - Click "Encrypt" to encrypt your message
   - Click "Decrypt" to decrypt an encrypted message
4. **Additional Actions**:
   - Use "Clear" buttons to reset inputs
   - Use "Paste" button to paste from clipboard
   - Copy results with the "Copy" button

## ❗ Troubleshooting

### Common Issues
1. **"Invalid Key"**: Ensure you're using the exact key used for encryption
2. **"Failed to Decrypt"**: Verify that the encrypted text wasn't modified
3. **"Blank Result"**: Check if both input fields are filled
4. **"Key Too Long"**: Ensure your encryption key is 18 characters or less

## 🌐 Deployment

The application is deployed on Vercel. You can:
- Access the live version at: [https://enigma-v2.vercel.app/](https://enigma-v2.vercel.app/)
