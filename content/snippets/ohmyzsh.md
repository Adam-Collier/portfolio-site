## Oh My ZSH

### Install ZSH

```bash
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Add the Geometry theme

```bash
# lets cd into our custom themes directory
$ cd ~/.oh-my-zsh/custom/themes
# clone the theme
$ git clone https://github.com/geometry-zsh/geometry
```

activate the theme in your .zshrc file

```bash
ZSH_THEME="geometry/geometry"
```

### Add Custom Plugins

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

then in our .zshrc file lets add the plugins

```bash
plugins=(
    git
    zsh-syntax-highlighting
    zsh-autosuggestions
    zsh-nvm
)
```

### Prevent the Percentage Sign issue in Hyper

Add to the bottom of our .zshrc

```bash
# prevent percentage prompt when first open
unsetopt PROMPT_SP
```

### Amend the Terminal Title

```bash
$ cd ~/.oh-my-zsh/custom/themes/geometry
# open vs code
$ code .
# find this line in geomatry.zsh
geometry::clear_title() { print -n '\e]0;%~\a'; }
# and amend to
geometry::clear_title() { print -n "\e]0;Adam's Terminal\a"; }
```
