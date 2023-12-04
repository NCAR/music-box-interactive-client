# Getting Started

## Install required packages

### MacOS
```
brew install node
```

### Windows

#### Install Node, binary download
Go to [https://nodejs.org/en/download](https://nodejs.org/en/download) and install node and npm

#### Install Node, winget

Open up a developer command prompt

```
winget install -e --id OpenJS.NodeJS
```

Once that install, close and reopen the command prompt and then move to the directory where `music-box-interactive-client` was cloned to

## Start the server
```
npm install
npm run dev
```