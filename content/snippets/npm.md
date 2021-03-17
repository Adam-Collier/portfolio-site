---
updatedDate: '2021-03-17T17:57:20.590Z'
published: true
---

## NPM

### Interactively update packages

```bash
$ npx npm-check -u
```

### Yalc (local component package workflow)

Yalc is a great little tool similar to the likes of yarn link and npm link. What it allows us to do is use our local component packages as dependencies of other projects. I prefer Yalc because it physically changes your package.json so you are always aware of which component package you're using and where from.

Install Yalc globally:

```bash
# install globally
$ npm i -g yalc

# publish component locally
$ yalc publish

# add your local package as a dependency
$ yalc add my-package
# (This will change/add the package location in your package.json)

# remove it from / revert your package.json
$ yalc remove my-package
```
