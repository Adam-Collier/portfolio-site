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

### Git stash

```bash
# to save changes in a stash
$ git stash save "optional message for yourself"

# view stash list
$ git stash list

# apply the stash
$ git stash apply

# apply the stash and remove the files from the stash
$ git stash pop

# clear the entire stash
$ git stash clear
```
