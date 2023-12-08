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

## The Dev Server

```
npm install
npm run dev
```


> [!NOTE]  
> This repository is only the front end for music box. If you want to run simulations and plot results, you have **two** options for connecting to the API server. You can [clone and run the api server](https://github.com/NCAR/music-box-interactive-api), or you can change the `.env.development` files value of `VITE_API_URL` to `'https://musicbox.acom.ucar.edu/musicbox'`  which will allow you to use the deployed version of the API server.


## Testing a production build before deploying

We use feature flags to turn features on and off. You can change the values in the development file, but you can also build the files for production and use all of the values in `.env.production` while pointing to the production version of the API server.

To do so, run

```
npm run build
npm run preview
```

Vite will build the files and then serve them as if this were a production build