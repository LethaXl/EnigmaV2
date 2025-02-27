// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import './mobile.css';  
import { encryptText, decryptText } from './crypto';
// Added import for performance metrics
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
    const [text, setText] = useState('');
    const [key, setKey] = useState('');
    const [output, setOutput] = useState('');
    const [showOutput, setShowOutput] = useState(false);

    // New scramble animation effect for the title
    useEffect(() => {
        const titleElement = document.getElementById('scramble-title');
        if (!titleElement) return;
        const originalText = "EnigmaV2"; // Set the original text explicitly
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const scrambleDuration = 3000;
        const scrambleInterval = 150;
        let step = 0;
        function scrambleText() {
            if (step < scrambleDuration / scrambleInterval) {
                const scrambledText = Array.from(originalText).map((char, index) =>
                    index < step ? char : letters.charAt(Math.floor(Math.random() * letters.length))
                ).join('');
                titleElement.textContent = scrambledText;
                step++;
                setTimeout(scrambleText, scrambleInterval);
            } else {
                titleElement.textContent = originalText;
            }
        }
        scrambleText();
    }, []);
    
    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setText(clipboardText);
        } catch (error) {
            console.error("Paste failed", error);
        }
    };

   
    const handlePasteKey = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setKey(clipboardText.slice(0, 18));
        } catch (error) {
            console.error("Paste key failed", error);
        }
    };

    
    const handleClearText = () => setText('');
    const handleClearKey = () => setKey('');
    const handleClearOutput = () => {
        setOutput('');  
        setTimeout(() => {
            setShowOutput(false);  
            document.querySelectorAll('.actionButtonsContainer a')
                .forEach(el => el.classList.remove("animate-click"));
        }, 100);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(output);
        } catch (error) {
            console.error("Copy failed", error);
        }
    };

    const handleEncrypt = async (e) => {
        document.querySelectorAll('.actionButtonsContainer a').forEach(el => el.classList.remove("animate-click"));
        
        if (e.currentTarget) {
            e.currentTarget.classList.add("animate-click");
            setTimeout(() => {
                e.currentTarget && e.currentTarget.classList.remove("animate-click");
            }, 1000);
        }
        if (!text.trim()) {
            updateOutput('Error: No text provided for encryption');
            return;
        }
        try {
            const result = await encryptText(text, key);
            updateOutput(result);
        } catch (error) {
            updateOutput('Error: Invalid input or key');
        }
    };

    const handleDecrypt = async (e) => {
        document.querySelectorAll('.actionButtonsContainer a').forEach(el => el.classList.remove("animate-click"));
        
        if (e.currentTarget) {
            e.currentTarget.classList.add("animate-click");
            setTimeout(() => {
                e.currentTarget && e.currentTarget.classList.remove("animate-click");
            }, 1000);
        }
        if (!text.trim()) {
            updateOutput('Error: No text provided for decryption');
            return;
        }
        try {
            let decryptedResults = [];
            try {
                const parsed = JSON.parse(text);
                const encryptedObjects = Array.isArray(parsed) ? parsed : [parsed];
                for (const obj of encryptedObjects) {
                    const result = await decryptText(obj, key);
                    decryptedResults.push(result);
                }
            } catch (e) {
                const regex = /([A-Za-z0-9+/]+={0,2}:[A-Za-z0-9+/]+={0,2})/g;
                const matches = text.match(regex);
                if (matches && matches.length > 0) {
                    for (const match of matches) {
                        const result = await decryptText(match, key);
                        decryptedResults.push(result);
                    }
                } else {
                    const parts = text.split(/[\n+]+/).filter(part => part.trim() !== '');
                    for (const part of parts) {
                        const result = await decryptText(part, key);
                        decryptedResults.push(result);
                    }
                }
            }
            updateOutput(decryptedResults.join('\n'));
        } catch (error) {
            updateOutput('Error: Invalid input or key');
        }
    };

    const updateOutput = (result) => {
        setOutput(result);
        if (result) setShowOutput(true);
    };

    return (
        <div className="container">
            <h1 id="scramble-title">EnigmaV2</h1>
            <div className="formContainer">
                {/* Text Field Section */}
                <div className="textAreaWrapper">
                    <textarea
                        id="textArea"
                        placeholder="Enter text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="5"
                    />
                    <div className="textAreaIcons">
                        <button type="button" title="Paste" onClick={handlePaste} className="iconButton">
                            <span className="material-icons-sharp">content_paste</span>
                        </button>
                        <button type="button" title="Clear" onClick={handleClearText} className="iconButton">
                            <span className="material-icons-sharp">clear</span>
                        </button>
                    </div>
                </div>
                {/* Key Field Section with Static Icon */}
                <div className="keyWrapper">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    <label htmlFor="keyInput">Key</label>
                    <span className="material-symbols-outlined">vpn_key</span>
                  </div>
                  <input
                    type="text"
                    id="keyInput"
                    placeholder="Enter your key here..."
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="keyInput"
                    maxLength="18"
                  />
                  <div className="keyIcons">
                    <button type="button" title="Paste" onClick={handlePasteKey} className="iconButton">
                      <span className="material-icons-sharp">content_paste</span>
                    </button>
                    <button type="button" title="Clear" onClick={handleClearKey} className="iconButton">
                      <span className="material-icons-sharp">clear</span>
                    </button>
                  </div>
                </div>
                {/* Action Buttons Container below Key Field */}
                <div className="actionButtonsContainer">
                  <a href="#" onClick={(e) => handleEncrypt(e)} className="button left-button">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Encrypt
                  </a>
                  <a href="#" onClick={(e) => handleDecrypt(e)} className="button right-button">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Decrypt
                  </a>
                </div>
            </div>
            {/* Always render output container; add .fade-out when hiding */}
            <div className={`outputContainer ${showOutput ? '' : 'fade-out'}`}>
                <div className="outputAreaWrapper">
                    <textarea
                        value={output}
                        readOnly
                        rows="5"
                    />
                    <div className="outputAreaIcons">
                        <button type="button" title="Copy" onClick={handleCopy} className="iconButton">
                            <span className="material-icons-sharp rotate-copy">content_copy</span>
                        </button>
                        <button type="button" title="Clear" onClick={handleClearOutput} className="iconButton">
                            <span className="material-icons-sharp">clear</span>
                        </button>
                    </div>
                </div>
            </div>
            <SpeedInsights />
        </div>
    );
}

export default App;
