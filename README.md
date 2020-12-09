# Language-Client/Server Extension for Tool Integrations


## Outline

- [Overview](#overview)
- [Extension](#extension)
- [Prerequisites](#prerequisites)
- [Development](#development)
- [License](#license)
- [Trademark](#trademark)


## Overview

The following repository is an example `language-client`/`language-server` extension
used to leverage the capabilities of the `Language Server Protocol (LSP)` in order to
easily integrate external tools into a `theia`-based or `vscode` application.

As an example, the extension uses `LSP` in order to provide diagnostics (problem markers) to end-users by parsing output of an external tool to determine if any `cryptography` is present.

The complete `crypto-detector` implementation can be found on the `main` (master) branch:
- https://github.com/eclipse-theia/cryptodetector

The current branch contains a streamlined version of the `crypto-detector` example with additional documentation, and guides.


## Extension

The extension follows the [vscode language server extension guide](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide) and contains the following components:

- [`language-client`](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide#explaining-the-language-client)
  - Note: the `client` has access to all [vscode namespace apis](https://code.visualstudio.com/api/references/vscode-api)
- [`language-server`](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide#explaining-the-language-client)


## Prerequisites

- `node`: install [`node v12`](https://nodejs.org/en/download/releases/) - alternatively it is possible to use [nvm](https://github.com/nvm-sh/nvm) (`node version manager`) to install and manage different versions of `node`.
- [`vscode`](https://code.visualstudio.com/download): as an IDE you can `vscode` which is supported, and can easily run in `hosted debug mode` to quickly test and verify the extension.
- [`vsce`](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce): is used to package, publish, and manage vscode extensions. In our case we use `vsce` to package the application which can be be consumed by `theia`-based applications.
  - install: `npm install -g vsce`
  - package: `vsce package` (the packaged extension can then be consume in different applications)

## Development

- **install dependencies and build**: perform `npm install` from the root directory to install and build the extension.
- **launch extension**: the extension can be launched in a `hosted plugin mode` so it can be easily verified and debugged directly in `vscode`. To begin, start vscode and open this repository as a workspace. Press <kbd>F5</kbd> and select `launch client`. A new window should open with the extension loaded for developers to test or debug their extension.


## License

- [Eclipse Public License 2.0](./LICENSE)
- [一 (Secondary) GNU General Public License, version 2 with the GNU Classpath Exception](./LICENSE)


## Trademark

"Theia" is a trademark of the Eclipse Foundation
https://www.eclipse.org/theia

