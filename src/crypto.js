// src/utils/crypto.js
// Helper functions for Base64 conversion
function arrayBufferToBase64(buffer) {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binary = window.atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

export async function encryptText(text, key) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const encodedKey = encoder.encode(key.padEnd(32, '0').slice(0, 32)); // AES-256 key

    const cryptoKey = await crypto.subtle.importKey("raw", encodedKey, "AES-GCM", false, ["encrypt"]);
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cryptoKey, data);

    // New: return Base64 encoded string: iv:ciphertext
    const ivBase64 = arrayBufferToBase64(iv.buffer);
    const encryptedBase64 = arrayBufferToBase64(encrypted);
    return ivBase64 + ':' + encryptedBase64;
}

export async function decryptText(encryptedData, key) {
    const decoder = new TextDecoder();
    const encodedKey = new TextEncoder().encode(key.padEnd(32, '0').slice(0, 32));

    const cryptoKey = await crypto.subtle.importKey("raw", encodedKey, "AES-GCM", false, ["decrypt"]);
    let iv, encrypted;
    
    // Modified: allow extra colons in the ciphertext by taking the first part as iv and the rest as ciphertext
    if (typeof encryptedData === 'string') {
        const parts = encryptedData.split(':');
        if (parts.length < 2) throw new Error("Invalid encrypted data format.");
        const ivBase64 = parts.shift();
        const encryptedBase64 = parts.join(':');
        iv = new Uint8Array(base64ToArrayBuffer(ivBase64));
        encrypted = new Uint8Array(base64ToArrayBuffer(encryptedBase64));
    } else {
        // Fallback for previous format
        iv = new Uint8Array(encryptedData.iv);
        encrypted = new Uint8Array(encryptedData.encrypted);
    }

    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, cryptoKey, encrypted);
    return decoder.decode(decrypted);
}
