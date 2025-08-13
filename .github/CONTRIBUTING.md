# Contributing to Sapar Mini

Thank you for your interest in the project! Below are some short guidelines to make collaboration easier for everyone.

## Getting Started
1. Fork the repository and create a branch from `main`:  
   `git checkout -b feat/short-name` or `fix/short-name`
2. Install dependencies: `npm install`
3. Run in development mode: `npm start` (or the actual command from README)
4. Before creating a PR, make sure the build passes (electron-builder/scripts in the project).

## Commit Messages
Keep it short and clear. Recommended format:
- `feat: ...` — new feature
- `fix: ...` — bug fix
- `docs: ...` — documentation changes
- `chore: ...` — infrastructure or minor changes
- `refactor: ...` — code refactoring without changing behavior

## Code Style
- Follow the existing style in the project (JS/EJS/CSS).
- Use the same formatting as in the repository (if Prettier/ESLint is configured, run them).

## Issues
- **Bugs** — use the `🐞 Bug Report` template.
- **Features** — use the `💡 Feature Request` template.
- **Questions** — use the `❓ Question` template.

Include as much context as possible: OS, app version, how you ran it, network conditions (Wi-Fi/Firewall/Proxy).

## Pull Requests
- PRs should be small and atomic.
- Describe the motivation and steps to test.
- If the UI/behavior changes — include a screenshot/GIF.
- Test on Windows whenever possible. If you can — also test on macOS/Linux.

## Security and Offline
Sapar Mini is focused on local networks and offline use cases. Do not add dependencies that send data outside without explicit agreement. If your code touches network/access functionality — describe it in the PR.

## License
The project is under the MIT license. By contributing, you agree that your code will be distributed under MIT.