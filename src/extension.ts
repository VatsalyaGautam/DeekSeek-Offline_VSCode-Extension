import * as vscode from "vscode";
import ollama from "ollama";
export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand("extension.start", () => {
    const panel = vscode.window.createWebviewPanel(
      "deepseekchat",
      "DeepSeek Offline Chat",
      vscode.ViewColumn.One,
      { enableScripts: true }
    );
    panel.webview.html = getWebviewContent();
    panel.webview.onDidReceiveMessage(async (message: any) => {
      if (message.command === "chat") {
        const userPrompt = message.text;
        let responseText = "";
        try {
          const streamResponse = await ollama.chat({
            model: "deepseek-r1:latest",
            messages: [{ role: "user", content: userPrompt }],
            stream: true,
          });
          for await (const part of streamResponse) {
            responseText += part.message.content;
            panel.webview.postMessage({
              command: "chatResponse",
              text: responseText,
            });
          }
        } catch (error: any) {
          responseText = error.message;
        }
      }
    });
    context.subscriptions.push(disposable);
  });
}
function getWebviewContent(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DeepSeek Offline</title>
    <style>
        :root {
            /* Core Theme Colors */
            --github-dark: #0d1117;
            --github-dark-secondary: #161b22;
            --github-border: #30363d;
            --github-text: #c9d1d9;
            --github-primary: #238636;
            --github-primary-hover: #2ea043;
            --github-link: #58a6ff;
            --github-danger: #f85149;
            --github-warning: #d29922;
            --github-success: #238636;
            --github-purple: #8957e5;
            --github-orange: #db6d28;
            
            /* Enhanced Gradients */
            --gradient-purple: linear-gradient(135deg, #8957e5 0%, #58a6ff 100%);
            --gradient-green: linear-gradient(135deg, #238636 0%, #2ea043 100%);
            --gradient-glow: linear-gradient(180deg, rgba(88, 166, 255, 0.15) 0%, rgba(88, 166, 255, 0) 100%);
            
            /* Refined Shadows */
            --shadow-sm: 0 2px 4px rgba(0,0,0,0.2);
            --shadow-md: 0 4px 8px rgba(0,0,0,0.25);
            --shadow-lg: 0 8px 16px rgba(0,0,0,0.3);
            
            /* Animations */
            --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            --transition-normal: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            --transition-slow: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            background: var(--github-dark);
            color: var(--github-text);
            line-height: 1.5;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .app-container {
            display: grid;
            grid-template-rows: auto 1fr auto;
            min-height: 100vh;
            max-width: 1200px;
            margin: 0 auto;
            padding: 1.5rem;
            gap: 2rem;
        }

        /* Enhanced Header Styles */
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem;
            background: var(--github-dark-secondary);
            border-radius: 16px;
            margin-bottom: 1rem;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--github-border);
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--gradient-purple);
        }

        .header::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-glow);
            opacity: 0.5;
            pointer-events: none;
        }

        .logo-container {
            display: flex;
            align-items: center;
            gap: 1.25rem;
        }

        .logo {
            width: 48px;
            height: 48px;
            background: var(--gradient-purple);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 24px;
            color: white;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            position: relative;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
        }

        .logo::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent 0%,
                rgba(255,255,255,0.1) 50%,
                transparent 100%
            );
            animation: shine 3s infinite;
        }

        .header-title {
            font-size: 1.75rem;
            font-weight: 600;
            background: var(--gradient-purple);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* Enhanced Chat Container */
        .chat-container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 1rem;
            min-height: 400px;
        }

        /* Enhanced Input Area */
        .input-container {
            position: relative;
            border-radius: 16px;
            background: var(--github-dark-secondary);
            padding: 1.75rem;
            border: 1px solid var(--github-border);
            box-shadow: var(--shadow-md);
        }

        .input-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-glow);
            opacity: 0.1;
            pointer-events: none;
            border-radius: 16px;
        }

        #prompt {
            width: 100%;
            min-height: 120px;
            padding: 1.25rem;
            background: var(--github-dark);
            color: var(--github-text);
            border: 1px solid var(--github-border);
            border-radius: 12px;
            font-size: 15px;
            resize: vertical;
            transition: all var(--transition-normal);
            line-height: 1.6;
        }

        #prompt:focus {
            outline: none;
            border-color: var(--github-link);
            box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2);
        }

        .button-container {
            display: flex;
            gap: 1rem;
            margin-top: 1.25rem;
        }

        #askBtn {
            padding: 0.875rem 2rem;
            font-size: 15px;
            font-weight: 600;
            color: white;
            background: var(--gradient-green);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all var(--transition-fast);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            position: relative;
            overflow: hidden;
            box-shadow: var(--shadow-sm);
        }

        #askBtn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }

        #askBtn:active {
            transform: translateY(1px);
            box-shadow: var(--shadow-sm);
        }

        /* Enhanced Response Area */
        .response-container {
            position: relative;
            padding: 1.75rem;
            background: var(--github-dark-secondary);
            border-radius: 16px;
            border: 1px solid var(--github-border);
            box-shadow: var(--shadow-md);
            min-height: 200px;
        }

        .response-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-glow);
            opacity: 0.1;
            pointer-events: none;
            border-radius: 16px;
        }

        #response {
            font-size: 15px;
            line-height: 1.7;
            white-space: pre-wrap;
            opacity: 0;
            transform: translateY(10px);
            animation: fadeIn 0.5s ease forwards;
        }

        /* Enhanced Loading Animation */
        .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: none;
        }

        .loading-dots {
            display: flex;
            gap: 0.6rem;
        }

        .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--github-link);
            animation: bounce 0.5s infinite alternate;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        /* Enhanced Status Bar */
        .status-bar {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.25rem;
            background: var(--github-dark-secondary);
            border-radius: 12px;
            border: 1px solid var(--github-border);
            box-shadow: var(--shadow-sm);
        }

        .status-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--github-success);
            position: relative;
        }

        .status-indicator::after {
            content: '';
            position: absolute;
            top: -3px;
            left: -3px;
            right: -3px;
            bottom: -3px;
            background: var(--github-success);
            border-radius: 50%;
            opacity: 0.4;
            animation: pulse 2s infinite;
        }

        .status-text {
            font-size: 14px;
            color: var(--github-text);
            font-weight: 500;
        }

        /* Enhanced Animations */
        @keyframes shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
        }

        @keyframes fadeIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes bounce {
            to { transform: translateY(-8px); }
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(2); opacity: 0; }
            100% { transform: scale(1); opacity: 0; }
        }

        /* Enhanced Responsive Design */
        @media (max-width: 768px) {
            .app-container {
                padding: 1rem;
            }

            .header {
                padding: 1.25rem;
            }

            .logo {
                width: 40px;
                height: 40px;
                font-size: 20px;
            }

            .header-title {
                font-size: 1.5rem;
            }

            .input-container, .response-container {
                padding: 1.25rem;
            }

            #askBtn {
                width: 100%;
                justify-content: center;
                padding: 0.75rem 1.5rem;
            }
        }

        /* New Enhancement: Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 12px;
        }

        ::-webkit-scrollbar-track {
            background: var(--github-dark);
            border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb {
            background: var(--github-border);
            border-radius: 6px;
            border: 3px solid var(--github-dark);
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #3f4448;
        }
			#mainlogo{
			width: 85%;;
			}
    </style>
</head>
<body>
    <div class="app-container">
        <header class="header">
            <div class="logo-container">
                <div class="logo">
					<img id="mainlogo" src="https://cdn-uploads.huggingface.co/production/uploads/6797cadeb825d5b94ea8bacb/ZZWmmroc9BCvlhmxPSciH.png">
				</div>
                <h1 class="header-title">DeepSeek Offline</h1>
            </div>
        </header>

        <main class="chat-container">
            <div class="input-container">
                <textarea 
                    id="prompt" 
                    placeholder="Ask anything... Your AI assistant is ready to help!"
                    autofocus
                ></textarea>
                <div class="button-container">
                    <button id="askBtn">Send Message</button>
                </div>
            </div>

            <div class="response-container">
                <div id="response"></div>
                <div class="loading">
                    <div class="loading-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="status-bar">
            <div class="status-indicator"></div>
            <span class="status-text">AI Assistant Ready</span>
        </footer>
    </div>

    <script>
       const vscode = acquireVsCodeApi();
const loading = document.querySelector('.loading');
const responseDiv = document.getElementById('response');
const promptArea = document.getElementById('prompt');
const statusText = document.querySelector('.status-text');
const statusIndicator = document.querySelector('.status-indicator');

let isProcessing = false;

document.getElementById('askBtn').addEventListener('click', sendMessage);

function sendMessage() {
    if (isProcessing) return;

    const text = promptArea.value.trim();
    if (!text) return;
    
    isProcessing = true;
    loading.style.display = 'flex';
    responseDiv.style.opacity = '0';
    statusText.textContent = 'Processing your request...';
    statusIndicator.style.background = 'var(--github-warning)';
    
    vscode.postMessage({ command: 'chat', text });
}

window.addEventListener('message', event => {
    const { command, text } = event.data;
    if (command === 'chatResponse') {
        isProcessing = false;
        loading.style.display = 'none';
        responseDiv.innerText = text;
        responseDiv.style.opacity = '1';
        statusText.textContent = 'AI Assistant Ready';
        statusIndicator.style.background = 'var(--github-success)';

        // Clear input after successful response
        promptArea.value = '';
        promptArea.style.height = 'auto';
    }
});

// Auto-resize textarea
promptArea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// Enhanced button animation
const askBtn = document.getElementById('askBtn');
askBtn.addEventListener('mousedown', () => {
    askBtn.style.transform = 'scale(0.98) translateY(1px)';
});
askBtn.addEventListener('mouseup', () => {
    askBtn.style.transform = 'scale(1) translateY(-2px)';
});
askBtn.addEventListener('mouseleave', () => {
    askBtn.style.transform = 'scale(1) translateY(-2px)';
});

// Initial status
setTimeout(() => {
    statusText.textContent = 'AI Assistant Ready';
    statusIndicator.style.background = 'var(--github-success)';
}, 1000);
`;
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log('Your extension "deep-vscode" is now deactivated!');
}
