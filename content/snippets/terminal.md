---
published: true
updatedDate: '2021-05-01T16:42:35.859Z'
---

## Terminal

### Tree command

Very common to find in Github README's the tree command makes it super easy to get directory structures in an easy to read format.

```bash
# Get the tree of the first directory level
$ tree -v -L 1

# Ignore node_modules and grab the tree two directory levels down
$ tree -I 'node_modules' -v -L 2
```
