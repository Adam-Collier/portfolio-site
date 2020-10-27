---
thumbnail: ./thumbnail.jpg
category: Code
tags: ["hast", "javascript"]
description: Discover the power of Hast and how we can use it to manipulate markdown content. Let's turn some .md table links into the real deal.
published: true
---

I love Notion, I envy their illustrations more than I care to admit... but thats besides the point. I think it's a great tool which offers an incredible amount of flexibility to tackle a vast range of tasks. Add some collaboration in there with a sprinkle of organisation and you've got something special. I thought great let's collaborate on some boring document work and we can just export it to markdown, upload it and revel in our mastery of the internets. However... A bit of a snag was hit.

### The problem

Take a humble Notion export and look at it twice and you'll probably notice some things you didn't expect. One assumption I made was that a table would just become a simple markdown table... but no, that's not the case. Instead, what you're left with is a link to a .csv file. I mean, call me old fashioned but I put my table on the page for a reason, I don't want to be clicking off to another page with a tiny table front and centre. So I thought, I know things, this can probably be fixed. Then comes a long Jason Lengstorf's [How to Modify Nodes in an Abstract Syntax Tree](https://css-tricks.com/how-to-modify-nodes-in-an-abstract-syntax-tree/) and my introduction to the AST.

### What is AST and Hast?

Abstract Syntax Trees (AST) and Hypertext Abstract Syntax Trees (Hast) are pretty much the same, the only difference being we use "types" to identify elements in AST and "tagNames" in Hast. That's it, easy right? As an overall concept, AST's are generally used for turning Markdown content into HTML markup but that's not all... we can take our tree, analyze it and transform/manipulate any of it we like. I want to give you a more visual understanding so I'll throw together something more visual

Take a bit of markdown like so:

```md
# Hello World!

This a paragraph
```

And from that our AST would look like the below:

```json
{
  "type": "root",
  "children": [
    {
      "type": "heading",
      "depth": 1,
      "children": [
        {
          "type": "text",
          "value": "Hello World!"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    }
  ]
}
```

As a Hast this would look like:

```json
{
  "type": "root",
  "children": [
    {
      "type": "element",
      "tagName": "h1",
      "depth": 1,
      "children": [
        {
          "type": "text",
          "value": "Hello World!"
        }
      ]
    },
    {
      "type": "element",
      "tagName": "p",
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph"
        }
      ]
    }
  ]
}
```

Note: We will be using Hast from here on out but have a play and see what you prefer. I couldn't find one for Hast but check out the [AST explorer](https://astexplorer.net/#/gist/d9029a2e8827265fbb9b190083b59d4d/3384f3ce6a3084e50043d0c8ce34628ed7477603), throw in some Markdown content and familiarise yourself with the AST equivelent.

### Setup

Let's keep our setup super simple and create a package.json using

```bash
$ npm init -y
```

We will also create a `script.js` as our main script file and a plugins directory where we can add our plugins.

So you should have the below:

```bash
.
├── package.json
├── plugins
└── script.js
```

This simple setup gives us a good starting point to construct our script.

### Unified.js

So what is Unified? Unified is a project that will do a tremendous amount of heavy lifting for us. Through the power of open source, they have created an easy to use interface to interact and manipulate syntax trees. It sits at the centre of [Rehype](https://github.com/rehypejs/rehype) (HTML), [Remark](https://github.com/remarkjs/remark) (Markdown) and [Retext](https://github.com/retextjs/retext) (Natural Language... whatever that is) and it's this project that allows [MDX](https://mdxjs.com/) to add JSX to markdown files, which I didn't know, but thought it was pretty cool.

In terms of a mental model think of unified as being the starting block in your lego construction, each piece of functionality can be attached to that block, but you need that block for everything to work. It's the oven that brings all of the ingredients together. For us we will be attaching Remark (for our Markdown), Rehype (for our HTML) and our custom plugin to convert CSV links to simple tables.

### Setting up the script

Below is the basic structure of what we need and then we can start to flesh it out from there.

```js
const fs = require("fs")
const unified = require("unified")

const contents = unified()
  .processSync(
    fs.readFileSync(
      // file path here
      ``
    )
  )
  .toString()
```

Here we read the markdown and pass it into the unified ecosystem. Then we add our HTML and markdown plugins: remark-parse to parse the markdown, remark-rehype to turn the markdown into an HTML tree and rehype-stringify to generate the HTML markup to eventually output.

```js{3-5,8-10}
const fs = require("fs")
const unified = require("unified")
const markdown = require("remark-parse")
const remark2rehype = require("remark-rehype")
const html = require("rehype-stringify")

const contents = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(html)
  .processSync(
    fs.readFileSync(
      // file path here
      ``
    )
  )
  .toString()
```

### Creating a custom plugin

So now we have added the basics we can start to add our plugin. First, we need to create a `link-to-table.js` file in our plugins directory and then export a module

```js
module.exports = () => (tree) => {

})
```

Notice how the tree is passed in as an argument we can use that in our plugin? Next, we need to import and use our plugin so we can add that to our main script file

```js{8,13}
const fs = require("fs")
const unified = require("unified")
const prettier = require("prettier")
const markdown = require("remark-parse")
const remark2rehype = require("remark-rehype")
const html = require("rehype-stringify")

const linkToTable = require("./plugins/link-to-table")

const contents = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(linkToTable)
  .use(html)
  .processSync(
    fs.readFileSync(
      // file path here
      ``
    )
  )
  .toString()

const outputDir = `${process.cwd()}/public`

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

fs.writeFile(
  `${outputDir}/index.html`,
  prettier.format(contents, { parser: "html" }),
  err => {
    if (err) console.log(err)
    console.log("Success! Your html has been created")
  }
)
```

So, we have added our custom plugins to our unified workflow, the problem is it doesn't exactly do anything at the moment. So let's add that.

### Traversing the tree

Jumping back to our custom plugin we now need to traverse the tree and grab all of the a tags that link to a CSV file. To do this we need to use the `unist-util-visit-parents` package, which is an unist utility to find nodes.

```js{1,5-11}
const visit = require("unist-util-visit-parents")

module.exports = () => tree => {
  visit(
    tree,
    node => node.tagName === "a" && node.properties.href.includes(".csv"),
    (node, ancestors) => {
      //do stuff with the nodes here
    }
  )
}
```

Here we are almost running a test on each node. First, we are checking if it's an `a` tag and secondly whether it contains `.csv` in its href string. If it satisfies our requirements it gets passed to the callback, otherwise, it's ignored. And just like that we have all of the nodes we need to convert to tables.

### How to get CSV data and assign it

Now we need to read the data from the CSV before we can create the table, we do this by using the npm package `parser` and utilise nodes very own `readFileSync` method.

```js{2-3,10-14}
const visit = require("unist-util-visit-parents")
const parse = require("csv-parse/lib/sync")
const fs = require("fs")

module.exports = () => tree => {
  visit(
    tree,
    node => node.tagName === "a" && node.properties.href.includes(".csv"),
    (node, ancestors) => {
      let markdownData = fs.readFileSync(`./${decodeURI(node.properties.href)}`)
      let rows = parse(markdownData, { columns: false, trim: true })
      const [tableHeaders, ...tableRows] = rows
    }
  )
}
```

We are reading the CSV data using readFileSync, parsing that data into an array and then destructuring the array and assigning tableHeaders and tableRows. Destructing at this point makes it a little easier for us later on.

### Creating the table

Since we now have the CSV data nicely formatted for us and assigned to variables we can now map those and create our table markup. By using template literals here it makes it super easy for us to create the markup, imagine having to concatenate a load of strings (no thank you).

```html{18-39}
const visit = require('unist-util-visit-parents'); const parse =
require('csv-parse/lib/sync'); const fs = require('fs'); module.exports = () =>
(tree) => { visit( tree, (node) => node.tagName === 'a' &&
node.properties.href.includes('.csv'), (node, ancestors) => { let baseNode =
ancestors ? ancestors[ancestors.length - 1] : node; let markdownData =
fs.readFileSync( `./${decodeURI(node.properties.href)}` ); let rows =
parse(markdownData, { columns: false, trim: true }); const [tableHeaders,
...tableRows] = rows; let tableMarkup = `
<table>
  <thead>
    <tr>
      ${tableHeaders .map((header) => `
      <th>${header}</th>
      `) .join('')}
    </tr>
  </thead>
  <tbody>
    ${tableRows .map((row) => { return `
    <tr>
      ${row .map((value) => `
      <td>${value}</td>
      `) .join('')}
    </tr>
    `; }) .join('')}
  </tbody>
</table>
`; } ); };
```

### Converting HTML to a Hast node

So now we have our table markup but we need to replace the a tag node with our table. At the moment we can't do this because nodes need to be replaced with nodes, and at the moment our table is a string of HTML content. So let's turn our table string into a node.

```js{4-5, 40-42}
const visit = require("unist-util-visit-parents")
const parse = require("csv-parse/lib/sync")
const fs = require("fs")
const parse5 = require("parse5")
const fromParse5 = require("hast-util-from-parse5")

module.exports = () => tree => {
  visit(
    tree,
    node => node.tagName === "a" && node.properties.href.includes(".csv"),
    (node, ancestors) => {
      let markdownData = fs.readFileSync(`./${decodeURI(node.properties.href)}`)
      let rows = parse(markdownData, { columns: false, trim: true })
      const [tableHeaders, ...tableRows] = rows

      let tableMarkup = `<table>
                  <thead>
                      <tr>
                          ${tableHeaders
                            .map(header => `<th>${header}</th>`)
                            .join("")}
                      </tr>
                  </thead>
                  <tbody>
                      ${tableRows
                        .map(row => {
                          return `
                              <tr>
                                  ${row
                                    .map(value => `<td>${value}</td>`)
                                    .join("")}
                              </tr>
                          `
                        })
                        .join("")}
                  </tbody>
              </table>`

      let ast = parse5.parseFragment(String(tableMarkup))
      let hast = fromParse5(ast)

      node.tagName = hast.children[0].tagName
      node.children = hast.children[0].children
      node.properties = {}
    }
  )
}
```

We are taking advantage of the `parse5` and `hast-util-from-parse5` packages here to create our node. Parse5 to parse our HTML string and `hast-util-from-parse5` to turn the HTML structure into a hast node.

### Manipulating the tree

Finally, we can directly manipulate the node attributes which replaces the link node with our newly created table node.

```js{43-46}
const visit = require("unist-util-visit-parents")
const parse = require("csv-parse/lib/sync")
const fs = require("fs")
const parse5 = require("parse5")
const fromParse5 = require("hast-util-from-parse5")

module.exports = () => tree => {
  visit(
    tree,
    node => node.tagName === "a" && node.properties.href.includes(".csv"),
    (node, ancestors) => {
      let markdownData = fs.readFileSync(`./${decodeURI(node.properties.href)}`)
      let rows = parse(markdownData, { columns: false, trim: true })
      const [tableHeaders, ...tableRows] = rows

      let tableMarkup = `<table>
                  <thead>
                      <tr>
                          ${tableHeaders
                            .map(header => `<th>${header}</th>`)
                            .join("")}
                      </tr>
                  </thead>
                  <tbody>
                      ${tableRows
                        .map(row => {
                          return `
                              <tr>
                                  ${row
                                    .map(value => `<td>${value}</td>`)
                                    .join("")}
                              </tr>
                          `
                        })
                        .join("")}
                  </tbody>
              </table>`

      let ast = parse5.parseFragment(String(tableMarkup))
      let hast = fromParse5(ast)

      node.tagName = hast.children[0].tagName
      node.children = hast.children[0].children
      node.properties = {}
    }
  )
}
```

As a general rule you wouldn't normally mutate the global state but in the context of AST's it has become pretty much the standard, especially when some AST's can be pretty huge!

### Run the script

Now if we run the script and check our outputted HTML you should see that our table has been outputted as we expected.

```bash
$ node script
```

We have now achieved the status of ultimate AST tree wrangler.

### Conclusion

And that's all folks! So now you should have a somewhat solid understanding of ASTs and how we can use them to manipulate Markdown. The possibilities with this technique are pretty much endless and what that allows us to do is focus on creating simple, readable content in markdown and add the flair and finesse later on in the build process. I do hope this has helped in some shape or form and of course if you deem something untrue and in need of amending in this article let me know and as always thanks for taking the time to read this article.

### Useful Links

As always here are a few links I found useful whilst writing this post:

- [How to Modify Nodes in an Abstract Syntax Tree by Jason Lengstorf](https://css-tricks.com/how-to-modify-nodes-in-an-abstract-syntax-tree/)
- [Creating a Remark Transformer Plugin](https://www.gatsbyjs.org/tutorial/remark-plugin-tutorial/)
