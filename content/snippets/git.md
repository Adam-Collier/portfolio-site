## Git

### Delete local branches

When you have merged and deleted a branch on github this command will delete the local branches that dont exist remotely.

```bash
$ git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}' | xargs git branch -d
```

### Add something to .gitignore

Refreshes the tracking of your files. Super useful for adding new things to your .gitignore file.

```bash
$ git rm -r --cached .
```
