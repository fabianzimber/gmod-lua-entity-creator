# GMod Entity Creator for VS Code

A Visual Studio Code extension that simplifies the process of creating new Garry's Mod (GMod) entities using Lua.

## Features

- Create new GMod entities by right-clicking on a folder in the file explorer
- Prompt for entity settings such as class name, print name, category, type (prop or entity), and more
- Automatically generate `cl_init.lua`, `init.lua`, and `shared.lua` files with the appropriate content based on user input

## Installation

1. Open Visual Studio Code
2. Press `Ctrl+P` to open the Quick Open dialog
3. Type `ext install gmod-lua-entity-creator` and press `Enter`

## Usage

1. Navigate to the file explorer in Visual Studio Code
2. Right-click on the folder where you want to create a new entity
3. Select "Create Entity" from the context menu
4. Fill in the entity settings in the input prompts
5. The extension will generate the required files (`cl_init.lua`, `init.lua`, and `shared.lua`) in a new folder named after the specified class name

## Contributing

If you want to contribute to this project, please submit a pull request on the GitHub repository.

## License

This extension is released under the [MIT License](LICENSE).

