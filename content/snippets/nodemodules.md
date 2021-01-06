## Node Modules

### Check size of all Node Modules

Find all of the Node module directories, check how big each one is and the total amount of space it takes up (it can be a surprising amount of space)

```bash
$ find . -name "node_modules" -type d -prune -print | xargs du -chs
```

### Delete all Node Modules

Delete all of your node modules from your mac and sit there, shocked at the number of modules you've just erased.

```bash
$ find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;
```

taken from [Go Make Things](https://gomakethings.com/how-to-delete-all-node_modules-directories-from-your-computer/)