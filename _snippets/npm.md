---
updatedDate: '2021-06-01T17:04:17.236Z'
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

# publish package locally
$ yalc publish

# publish and update all projects using that yalc store
$ yalc publish --push

# add your local package as a dependency
$ yalc add my-package
# (This will change/add the package location in your package.json)

# remove it from / revert your package.json
$ yalc remove my-package
```
