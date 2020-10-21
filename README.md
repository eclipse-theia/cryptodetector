<br />

<div align='center'>

<img src='./assets/logo.png' width='100px'>

</div>

# Crypto-Detector

## Description

The **crypto-detector** extension is a language-server and client extension which uses static analysis of source code in order to detect use of **cryptography**.

The tool uses [Wind-River/crypto-detector]( https://github.com/Wind-River/crypto-detector) in order to scan source code and determine if cryptography exists using the following [two methods](https://github.com/Wind-River/crypto-detector#methods-of-scanning-code):

1. _keyword_: simple scan for any use of terms, words related to cryptography.
2. _API finder_: deeper scan for use of API calls and libraries related to cryptography.

The extension is tested and works successfully in both `Eclipse Theia` based products and `VS Code`.

## Components

1. **crypto-detector** language-server
2. **crypto-detector** language-client

## Prerequisites

1. [Wind-River/crypto-detector]( https://github.com/Wind-River/crypto-detector): clone the following repo under the `home` directory.

## Development

- run `npm install` from the root directory.
- execute <kbd>F5</kbd> (`launch client`) which runs the extension under a hosted-mode.

## License

- [Eclipse Public License 2.0](./LICENSE)
- [一 (Secondary) GNU General Public License, version 2 with the GNU Classpath Exception](./LICENSE)

## Trademark
"Theia" is a trademark of the Eclipse Foundation
https://www.eclipse.org/theia

