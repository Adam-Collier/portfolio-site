---
updatedDate: '2021-01-06T19:11:53+00:00'
---
## Oh My ZSH

The Oh My ZSH framework for managing your ZSH configuration and comes bundled with thousands of helpful functions, plugins and themes. It's a real game changer.

### Install ZSH

Taken from the github [README](https://github.com/ohmyzsh/ohmyzsh).

```bash
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Add the Geometry theme

This is the theme that I use because it's super simple and as customisable as you want. Personally I like it for it's unobtrusive design.

```bash
# lets cd into our custom themes directory
$ cd ~/.oh-my-zsh/custom/themes
# clone the theme
$ git clone https://github.com/geometry-zsh/geometry
```

To activate the theme in your .zshrc file:

```bash
ZSH_THEME="geometry/geometry"
```

### Add Custom Plugins

Oh My ZSH can be a real time by utilising the community driven plugin ecosystem. A few of the plugins I like to use:

* [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
* [zsh-nvm](https://github.com/lukechilds/zsh-nvm)
* [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)

To add these plugins to your Oh My ZSH install:

```bash
# let's cd into our custom plugins directory
$ cd ~/.oh-my-zsh/custom/plugins
# clone the zsh-syntax-highlighting plugin
$ git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# clone the zsh-nvm plugin
$ git clone https://github.com/lukechilds/zsh-nvm ~/.oh-my-zsh/custom/plugins/zsh-nvm
# clone the zsh-autosuggestions plugin
$ git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

then in our .zshrc file lets initialise the plugins

```bash
plugins=(
    git
    zsh-syntax-highlighting
    zsh-autosuggestions
    zsh-nvm
)
```

### Prevent the Percentage Sign issue in Hyper

Annoyingly there is a percentage sign issue in Hyper, here's how to fix it. Let's add the below to the bottom of our .zshrc file.

```bash
# prevent percentage prompt when first open
unsetopt PROMPT_SP
```

### Amend the Terminal Title

It's always a nice touch to have your personal terminal title showing.

```bash
$ cd ~/.oh-my-zsh/custom/themes/geometry
# open vs code
$ code .
# find this line in geomatry.zsh
geometry::clear_title() { print -n '\e]0;%~\a'; }
# and amend to
geometry::clear_title() { print -n "\e]0;Adam's Terminal\a"; }
```
