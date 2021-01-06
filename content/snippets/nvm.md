## NVM

[NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) is a tool which helps you easily manage your Node versions. Without NVM managing node versions locally is a real pain, install this once and breathe a sigh of relief.

### Install the latest version of node

Your Node install looking a little outdated? easily install the latest stable version of node.

```bash
$ nvm install node
```

### List versions of node installed

Check what versions of Node you have installed, if you have a new one installed you can switch it there and then

```bash
$ nvm list
```

### Specify a node version to use

If you need to use a specific version of Node for a project declare it in the command.

```bash
$ nvm install 6.14.4 # or 10.10.0, 8.9.1, etc
```

### Use current node version in all terminals

Are new terminal sessions using different versions of Node? Set your default version which will be used across everything.

```bash
$ nvm alias default node
```
