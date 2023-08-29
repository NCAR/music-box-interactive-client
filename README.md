# Getting Started

## Install gatsby

### MacOS
```
brew install node gatsby-cli
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

#### Install gatsby

```
npm install -g gatsby-cli
```

## Start the server
```
npm install --legacy-peer-deps
gatsby develop -p 8002
```