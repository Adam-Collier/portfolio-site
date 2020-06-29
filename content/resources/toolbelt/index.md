---
title: Toolbelt
description: Helps developers build applications/websites faster and automate tedious processes. These tools are a great addition to anyones arsenal
color: "#21A3F1"
---

Helps developers build applications/websites faster and automate tedious processes. Just makes life a bit easier (which we all like)

## Text Editor

[Visual Studio Code](https://code.visualstudio.com/) - My go to editor of choice. No need for anymore suggestions, it's just that good

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

## Cheatsheets

[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) - The holy grail of markdown cheat sheets. It's the only one you'll every need (unless you're venturing down the MDX path)

## Task Runners + Bundlers

1. Task Runners - used to automate, enable faster and efficient builds; enhances developer workflow, with plugins.
2. Bundlers - are task runners, and with asset loading optimisation.

### Task Runners

[Gulp](https://gulpjs.com/) - simple, easy to learn task runner, producing efficient builds, automate task. The only one I tend to use.

The gulpfile I use for my wordpress projects:

```js
var { src, dest, series, watch } = require("gulp")
var browserSync = require("browser-sync").create()
var sass = require("gulp-sass")
const rename = require("gulp-rename")

let scss = () => {
  return src("./sass/main.scss")
    .pipe(sass())
    .pipe(rename("style.css"))
    .pipe(dest("./", { overwrite: true }))
}

let editorStyles = () => {
  return src("./sass/editor.scss")
    .pipe(sass())
    .pipe(rename("gutenberg-editor-styles.css"))
    .pipe(dest("./styles", { overwrite: true }))
}

let server = () => {
  return browserSync.init({
    proxy: "http://localhost:8888",
  })
}

let reload = done => {
  browserSync.reload()
  done()
}

watch(["**/*.scss"], series(scss, editorStyles, reload))

watch(["**/*.js", "**/*.php"], reload)

exports.scss = scss
exports.server = server
exports.default = series(scss, editorStyles, server)
```

### Bundlers

[Webpack](https://webpack.js.org/) - Builds a graph of dependencies makes loading dependencies faster and enables more modular code

[Parceljs](https://parceljs.org/) - Blazing fast, zero configuration web application bundler

## Collaboration

[MakeSpace](https://makespace.fun) - A whole new way to collaborate, apart. A place to co-create, co-work, or just hang out.

[Notion](https://www.notion.so) - Write, plan, collaborate, and get organized. A really great tool for note taking and prepping/recording meeting notes. Now it's free for personal accounts!

## Thinking

[Untools](https://untools.co/) - A collection of thinking tools and frameworks to help you solve problems, make decisions and understand systems. I've not read a lot of it yet but it seems pretty cool.
