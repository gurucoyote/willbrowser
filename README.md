# Willbrowser . headless yet interactive browser

based on playwright  and chromium (headless)

## Goals

- allow browsing the web just like with a GUI browser and screen reader
- yes, the interaction is very much based on how one operates a browser when using a screen reader
    - eventually add much of the testing / inspection capabilities that chrome dev-tools would offer in a GUI browser

## Current State

- proof of concept with a vorpal based (repl style) interface: you enter a command, hit enter, and get the results
-  can navigate to an URL, output the accessibility tree, and even click on links, buttons, and type into  text boxes


## Tech Stack

- at its core, this is a TUI wrapper for the playwright browser automation framkework
-  uses chromium for now, but could likely also use firefox or webkit browsers if the installation of playwright offers these
-   can be started / run from within a docker container, to limit the dependancy pollution of the host machine 

## Installation

requires nodeJS (v14+) to be installed

```
# install deps
npm install
# start
node index.js
# start for URL
node index.js https://duckduckgo.com
```

## Usage

```
# at the will> promt, type commands:
will> goto https://duckduckgo.com
will>help
```
## Roadmap / TODO

- switch to vim style modal approach with key bindings that are familiar to a vim user
    - update the accessibility tree with user interactions like click etc.
    -  take care of all the dialog, alert, selection etc. stuff
    -   persist user settings, cookies, localStorage etc. like a normal browser would (need to figure out how tell playwright to do this)

