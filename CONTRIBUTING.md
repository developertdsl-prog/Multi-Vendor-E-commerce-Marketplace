# Contributing to Multi-Vendor E-commerce Marketplace

Thank you for considering contributing to our project!

## Development Workflow

We follow a professional Git branching workflow:

1. **Main branches:**
   - `main`: Stable release branch
   - `develop`: Integration branch

2. **Feature branches:** Created from `develop`, named `feature/<name>`

3. **Process:**
   - Create feature branch from `develop`
   - Implement changes with meaningful commits
   - Push branch to GitHub
   - Open pull request targeting `develop`
   - Code review and testing
   - Merge into `develop`
   - On release, create PR from `develop` into `main`

## Commit Message Convention

Use conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for adding tests
- `chore:` for maintenance tasks
- `refactor:` for code refactoring

Example: `feat: implement user authentication`

## Pull Request Requirements

Every PR should include:
- Clear title describing the feature
- Description with objective, features implemented, files changed
- Related issue numbers
- Testing performed
- Screenshots where useful
- Remaining limitations

## Code Quality

- Write readable and maintainable code
- Use reusable frontend components
- Keep APIs organized
- Implement validation
- Handle errors properly
- Protect sensitive routes
- Use environment variables
- Never commit passwords, tokens, or secrets