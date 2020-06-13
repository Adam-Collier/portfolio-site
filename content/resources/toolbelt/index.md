---
title: Toolbelt
description: Helps developers build applications/websites faster and automate tedious processes. These tools are a great addition to anyones arsenal
color: "#21A3F1"
icon: "./icon.svg"
---

Helps developers build applications/websites faster and automate tedious processes. Just makes life a bit easier (which we all like)

## Text Editors

[Atom](https://atom.io/) - modern hackable text editor

- [10 essential Atom add ons](https://www.sitepoint.com/10-essential-atom-add-ons/)
- [12 Favorite Atom Tips and Shortcuts to Improve Your Workflow](https://www.sitepoint.com/12-favorite-atom-tips-and-shortcuts-to-improve-your-workflow/)
- [Handy Atom Shortcuts](https://gist.github.com/chrissimpkins/5bf5686bae86b8129bee#atom_file)
- [Atom Snippets](http://flight-manual.atom.io/using-atom/sections/snippets/)

## Boilerplates

Useful if you want something quick and easy to get off the ground.

[Express Generator](https://expressjs.com/en/starter/generator.html)

[Express Authentication Starter](https://github.com/sahat/hackathon-starter)

## Dependency Management

What if every everyone released the new version of their modules at the same time, and everyone updated the moment after. Simply put it, never gonna happen.

[Node Version Manager (NVM)](https://github.com/creationix/nvm) [Mac OSX and Linux]
Seemlessly manage the version of node, npm, npx.

### Setting up via homebrew

```bash
# install homebrew
$ brew install nvm

# set where to install
$ mkdir ~/.nvm

# go to your root directory
$ cd ~/

# create bash profile
$ touch .bash_profile

# open in your editor
$ code .

# paste this into the .bash_profile file and save
export NVM_DIR="$HOME/.nvm"
. "$(brew --prefix nvm)/nvm.sh"
```

### Useful NVM commands

```bash
# installs the latest version of node
$ nvm install node

# sets default node version for any new shell
$ nvm alias default node
```

[Node Package Manager (NPM)](https://docs.npmjs.com/getting-started/what-is-npm) - Every other languages are jealous cause of this elegant dependency management help. Keeps tracks of all the modules/packages you download

## Version Control

[Github Desktop](https://desktop.github.com/) - The official UI from Github, built with Electron

[Gitkraken](https://www.gitkraken.com/) - UI friendly git for Git novices and professionals alike. Git is a software industry standard, so it's a must!

[Pro Git](https://git-scm.com/book/en/v2) - A thorough guide to git and all its commands.

- [Git and GitHub for Poets](https://www.youtube.com/watch?v=BCQHnlnPusY)
- [Git for Noobs - command line](https://www.youtube.com/watch?v=JPKOESR1k04&t=1011s)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Useful git commands

When you have merged and deleted a branch on github this command will delete the local branches that dont exist remotely.

```bash
$ git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}' | xargs git branch -d
```

Refreshes the tracking of your files. Super useful for adding new things to your .gitignore file.

```bash
$ git rm -r --cached .
```

## Task Runners + Bundlers

1. Task Runners - used to automate, enable faster and efficient builds; enhances developer workflow, with plugins.
2. Bundlers - are task runners, and with asset loading optimisation.

[Gulp](https://gulpjs.com/) - simple, easy to learn task runner, producing efficient builds, automate task

- [Gulp Basics with LevelUpTuts](https://www.youtube.com/watch?v=wNlEK8qrb0M&list=PLLnpHn493BHE2RsdyUNpbiVn-cfuV7Fos)
- [Express, Browsersync, Nodemon and Sass config](https://gist.github.com/Adam-Collier/973abbb109a39c8be1cd2000666d9c3e) - Full-Stack config starter back for gulp users

[Webpack](https://webpack.js.org/) - Builds a graph of dependencies makes loading dependencies faster and enables more modular code

- [Getting Started with Webpack](https://webpack.js.org/guides/getting-started/)

[Parceljs](https://parceljs.org/) - Blazing fast, zero configuration web application bundler

[Untools](https://untools.co/) - A collection of thinking tools and frameworks to help you solve problems, make decisions and understand systems. I've not read a lot of it yet but it seems pretty cool.
