# GMod Lua Entity Creator for VS Code

GMod Lua Entity Creator is a Visual Studio Code extension that streamlines creating Garry's Mod (GMod) Lua entities. It guides you through common metadata prompts and generates the standard `cl_init.lua`, `init.lua`, and `shared.lua` files so you can start building faster.

## Overview

This extension helps you scaffold GMod Lua entities in seconds. It’s designed for creators who want a consistent, repeatable entity setup without manually writing boilerplate files.

## Features

- Create entities from the Explorer context menu
- Prompted setup for class name, display name, category, entity type, 3D name, and model path
- Automatic file generation for common GMod entity scaffolding

## Requirements

- Visual Studio Code `^1.90.0`
- A workspace folder open in VS Code

## Installation

1. Open Visual Studio Code.
2. Press `Ctrl+P` / `Cmd+P` to open Quick Open.
3. Run `ext install gmod-lua-entity-creator`.

## Usage

1. Open your GMod project folder in VS Code.
2. Right-click a destination folder in the Explorer.
3. Select **Create Blank Entity**.
4. Complete the prompts.
5. Review the generated `cl_init.lua`, `init.lua`, and `shared.lua` files.

## Generated Files

- `cl_init.lua`: client-side rendering and optional 3D name display
- `init.lua`: server-side initialization and interaction hooks
- `shared.lua`: entity metadata (name, category, spawn flags)

## Commands

| Command | Description |
| --- | --- |
| `Create Blank Entity` | Create a new GMod entity scaffold in the selected folder. |

## Configuration

This extension does not register any user settings. Adjust the generated Lua files to match your project conventions.

## Development

```bash
npm install
npm run compile
```

### Linting

```bash
npm run lint
```

### Tests

```bash
npm test
```

## Packaging & Publishing

```bash
npm run package
```

For publishing, follow the official VS Code extension guide: https://code.visualstudio.com/api/working-with-extensions/publishing-extension

## Contributing

Pull requests are welcome. Please open an issue to discuss major changes or feature requests.

## License

MIT — see [LICENSE](LICENSE).
