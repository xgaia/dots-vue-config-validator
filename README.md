# dots‑vue‑config‑validator

A tiny Node.js utility that validates a JSON configuration file using **Zod**.

## Features
- Simple command‑line script (`yarn run validate <config>.json`).
- Schema defined with Zod – easy to extend.
- Linting/formatting powered by **Biome** (plus ESLint for basic rules).
- Licensed under the GNU AGPL‑v3.

## Prerequisites
- **Node.js** (>=14 recommended)
- **Yarn** package manager

## Setup
```bash
# Clone the repo (if it were remote)
# cd dots-vue-config-validator

yarn install   # install dependencies
```

## Usage
```bash
# Validate a configuration file
yarn run validate path/to/config.json
```
The script will output either:
- `✅ Configuration is valid` – when the file matches the schema.
- Detailed error information if validation fails.

## Extending the schema
Edit `src/validate.js` and modify the `ConfigSchema` constant to match the shape of your configuration.

## Development
- **Lint**: `yarn biome lint` (Biome will automatically run ESLint rules as well).
- **Format**: `yarn biome format`.

## License
This project is licensed under the **GNU Affero General Public License v3.0** – see the `LICENSE` file for details.
