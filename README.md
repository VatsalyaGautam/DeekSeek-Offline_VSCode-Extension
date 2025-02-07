# DeepSeek Offline for VS Code

A VS Code extension that brings DeepSeek's powerful AI capabilities offline to your editor. Get intelligent code assistance, explanations, and more without sending your code to external servers.

## Features
- 🔒 Fully Offline: All processing happens locally on your machine
- ⚡ Real-time Responses: Get instant AI assistance as you code
- 💡 Code Understanding: Get explanations and suggestions for your code
- 📝 Context-Aware: Understands your project's context for better assistance
- 🌐 Cross-Platform: Supports Windows, macOS, and Linux

## Prerequisites

### macOS / Linux
1. Install Ollama:
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

2. Pull the DeepSeek model:
   ```bash
   ollama pull deepseek-r1:1.5b
   ```

### Windows
1. **Install WSL2 (Windows Subsystem for Linux 2)**
   ```powershell
   # Open PowerShell as Administrator and run:
   wsl --install
   ```
   After installation, restart your computer.

2. **Install Docker Desktop**
   - Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
   - During installation, ensure WSL2 is selected as the backend
   - Start Docker Desktop and wait for it to fully initialize

3. **Install Ollama in WSL2**
   ```bash
   # Open WSL terminal and run:
   curl -fsSL https://ollama.com/install.sh | sh
   ```

4. **Pull the DeepSeek model**
   ```bash
   ollama pull deepseek-r1:1.5b
   ```

## Quick Start

### Installation
1. **Install the Extension**
   - Open VS Code
   - Press `Ctrl+P` / `Cmd+P`
   - Run `ext install vatsalya-gautam.deep-vscode`

2. **Start Ollama**
   - macOS/Linux:
     ```bash
     ollama serve
     ```
   - Windows (in WSL terminal):
     ```bash
     ollama serve
     ```

3. **Use the Extension**
   - Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
   - Type `Run DeepSeek Offline`
   - Or click the DeepSeek icon in the sidebar

## System Requirements

### Common Requirements
- VS Code 1.60.0 or higher
- Minimum 8GB RAM (16GB recommended)
- 10GB free disk space for model storage

### Platform-Specific Requirements
- **Windows:**
  - Windows 10 (Build 19041+) or Windows 11
  - WSL2 enabled and running
  - Docker Desktop with WSL2 backend

- **macOS:**
  - macOS 10.15 (Catalina) or higher
  - Apple Silicon or Intel processor

- **Linux:**
  - x86_64 architecture
  - glibc 2.31 or higher
  - systemd (recommended)

## Troubleshooting

### Common Issues (All Platforms)

**Extension Can't Connect to Ollama:**
```bash
# Verify Ollama is running
ollama serve

# Check if model is installed
ollama list

# Pull model if not installed
ollama pull deepseek-r1:1.5b
```

**Performance Issues:**
- First run requires model loading into memory
- Subsequent queries will be faster
- Ensure sufficient RAM is available
- Close resource-intensive applications

### Platform-Specific Issues

#### macOS
```bash
# Check Ollama installation
which ollama

# Verify permissions
ls -l $(which ollama)

# Check service status
sudo lsof -i :11434
```

#### Linux
```bash
# Check system requirements
ldd --version

# Verify port availability
sudo netstat -tuln | grep 11434

# Check system resources
free -h
```

#### Windows
```powershell
# Check WSL status
wsl --status

# Verify Docker
docker info

# In WSL terminal:
curl http://localhost:11434/api/version
```

### WSL2 Resource Configuration (Windows)
Create or edit `%UserProfile%\.wslconfig`:
```
[wsl2]
memory=8GB
processors=4
```

## Usage Tips

### General Tips
1. Keep Ollama running in the background
2. First interaction might be slower (model loading)
3. Use clear, concise prompts for better results
4. Check system resources if responses are slow

### Platform-Specific Tips

#### macOS
- Enable "Prevent sleep" when running long tasks
- Use Activity Monitor to track memory usage

#### Linux
- Consider using `systemd` service for auto-starting Ollama
- Monitor system resources with `htop` or `glances`

#### Windows
- Keep Docker Desktop running
- Start Ollama in WSL2 before using extension
- Monitor resources in Task Manager

## Advanced Configuration

### Model Configuration
```bash
# List available models
ollama list

# Remove unused models
ollama rm modelname

# Pull specific model version
ollama pull deepseek-r1:1.5b@latest
```

### Network Configuration
- Default port: 11434
- Localhost only by default
- Configurable through environment variables

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development

### Building from Source
```bash
# Clone repository
git clone https://github.com/VatsalyaGautam/DeekSeek-Offline_VSCode-Extension.git

# Install dependencies
npm install

# Build extension
npm run build

# Package extension
vsce package
```

### Running Tests
```bash
npm run test
```

## Security Considerations
- All processing is done locally
- No data is sent to external servers
- Model files are verified via checksums
- Regular security updates recommended

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Ollama team for the local model serving capability
- DeepSeek team for the AI model
- VS Code Extension community
- All contributors and users

---
**Note:** Always ensure Ollama is running before using the extension. Keep your system updated for optimal performance.

For more detailed information, visit our [GitHub repository](https://github.com/VatsalyaGautam/DeekSeek-Offline_VSCode-Extension).

### Support
- 🐛 [Issue Tracker](https://github.com/VatsalyaGautam/DeekSeek-Offline_VSCode-Extension/issues)
- 💬 [Community Forum](https://github.com/VatsalyaGautam/DeekSeek-Offline_VSCode-Extension/discussions)

