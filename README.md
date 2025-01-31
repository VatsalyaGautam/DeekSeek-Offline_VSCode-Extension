# DeepSeek Offline for VS Code

A VS Code extension that brings DeepSeek's powerful AI capabilities offline to your editor. Get intelligent code assistance, explanations, and more without sending your code to external servers.

## Features

- Fully Offline: All processing happens locally on your machine
- Real-time Responses: Get instant AI assistance as you code
- Code Understanding: Get explanations and suggestions for your code
- Context-Aware: Understands your project's context for better assistance

## Prerequisites

Before using this extension, you need to:

1. Install Ollama
   - macOS/Linux: 
     ```bash
     curl -fsSL https://ollama.com/install.sh | sh
     ```
   - Windows: Download from [Ollama's official website](https://ollama.com/download)

2. Pull the DeepSeek model:
   ```bash
   ollama pull deepseek-coder:latest
   ```

## Quick Start

1. Install the Extension
   - Open VS Code
   - Press `Ctrl+P` / `Cmd+P`
   - Run `ext install your-publisher.deep-vscode`

2. Start Ollama
   ```bash
   ollama serve
   ```

3. Use the Extension
   - Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Type `DeepSeek: Start Chat`
   - Or click the DeepSeek icon in the sidebar

## System Requirements

- VS Code 1.60.0 or higher
- Windows 10/11, macOS 10.15+, or Linux
- Minimum 8GB RAM (16GB recommended)
- 10GB free disk space for model storage

## Troubleshooting

### Common Issues

Extension Can't Connect to Ollama:
```bash
# Verify Ollama is running
ollama serve

# Check if model is installed
ollama list

# Pull model if not installed
ollama pull deepseek-coder:latest
```

Slow Initial Response:
- First run requires model loading into memory
- Subsequent queries will be faster

No Response from Extension:
1. Ensure Ollama is running
2. Restart VS Code
3. Check VS Code logs for errors

## Configuration

```json
{
    "deepseek.model": "deepseek-coder:latest",
    "deepseek.maxTokens": 2048,
    "deepseek.temperature": 0.7
}
```

## Usage Tips

1. Keep Ollama running in the background
2. Use keyboard shortcut `Ctrl+Shift+D` / `Cmd+Shift+D` for quick access
3. First interaction might be slower as the model loads

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ollama for the local model serving capability
- DeepSeek for the AI model
- VS Code Extension community

---

Note: This extension requires Ollama to be running locally. Make sure to start the Ollama service before using the extension.

For more detailed information, visit our [Wiki](your-wiki-link) or [GitHub repository](your-repo-link).