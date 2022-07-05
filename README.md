# What is this?
This is a repo strictly used for static html/js/css files to be used with music-box-interactive. The main functionality of music-box-interactive is not yet setup on these files (unless you host the https://github.com/NCAR/music-box-interactive server on your own computer). A public NCAR-maintained backend server will be up in the coming months.

# File structure (of completed files)
run-server.sh - used to host website on local machine. Simply do ./run-server.sh on a macOS computer and a HTTP server will be hosted on your device on port 80

index.html & home.html - the landing page of music-box-interactive

getting_started.html - select an example simulation to load, upload a file, start from scratch

mechanism.html - add/view species to simulation

mechanism/
  |_ species.html - add/view species to simulation
  |_ reactions.html - add/view reactions to simulation
  
conditions.html - add/view options of simulation

conditions/
  |_ options.html - add/view options of simulation
  |_ inital.html - add/view inital conditions of simulation
  |_ evolving.html - add/view evolving conditions of simulation

# Important notes
1) no backend functionality (such as saving mechanisms, species, or even running models) will work on these static pages as of now. If you want to use these pages and test the backend, head to https://github.com/NCAR/music-box-interactive and start a local docker container on your computer. These pages will automatically connect to that server.
2) some links (and buttons) may not work if you access these pages via https://ncar.github.io/music-box-interactive-static/ -- this is an issue that will be fixed once we get a permanent domain connected
3) as of now you cannot select an example or really do anything. once again, these are just the static website files and contain no backend server to connect to. within the next few months, there will be a public server these pages will automatically connect to
4) This repo is mostly used for testing + modifying html files UI as of now and is not designed to run any music box models as of yet
