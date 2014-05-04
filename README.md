# Workshop Cast Maze

## Asset

* [Talk](http://xebia-france.github.io/workshop-cast-maze/talk/)
* [Workshop](http://xebia-france.github.io/workshop-cast-maze/workshop/)

## How To

### Receiver

Browse

    http://xebia-france.github.io/workshop-cast-maze/receiver/

Deploy on Chrome store
    
    $ grunt dist
    $ grunt gh-pages

### Sender

#### Javascript

Root folder

    sender/js
Start NodeJS

    $ node server.js
### Workshop

Root folder

    workshop
Start [Jekyll](http://jekyllrb.com) in development mode

    $ jekyll serve -w
Deploy on gh-pages

    $ cd workshop/ && jekyll build && grunt gh-pages
