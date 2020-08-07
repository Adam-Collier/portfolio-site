---
title: Using Hast to create tables from Notions .md and .csv exports
date: 2020-08-05
thumbnail: ./thumbnail.jpg
category: Code
tags: ["hast", "javascript"]
description: Discover the power of Hast and how we can use it to manipulate markdown content. Let's turn some .md table links into the real deal.
published: true
---

I love Notion, I envy their illustrations on the daily but we won't get into that (super illustrator Procreate skills still in progress...) and I think it's a great tool which offers an incredible amount of flexibility to tackle pretty much any task you can think of. Add some collaboration in there with a sprinkle of organisation and you've got something special. I thought great let's collaborate on some boring document work and we can just export it to markdown, upload it and revel in our mastery of the internets. However... A bit of a snag was hit.

### The problem

Take a humble Notion export and look at it twice and you'll probably notice some things you didn't expect. One assumption I made was that a table would just become a simple markdown table... but no, thats not the case. Instead, what you're left with is a link to a .csv file. I mean I put my table on the page for a reason, I don't want to be clicking off to another page with a tiny table front and centre. So I thought, this needs to be fixed.

### What is AST and Hast?

Abstract Syntax Trees (AST) and Hypertext Abstract Syntax Trees (Hast) are pretty much the same, the only difference being we use "types" to identify elements in AST and "tagNames" in Hast. That's it, easy right? As an overall concept AST's are generally used for turning Markdown content into HTML markup but thats not all... we can take our tree, analyze it and transform/manipulate any of it we like. I want to give you a more visual understanding so I'll throw together something more visual

Take a bit of markdown like so:
```md
# Hello World!
This a paragraph
```

We create our AST and we would get the below: 
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
          "value": "Hello World!",
        }
      ],
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph",
        }
      ],
    }
  ],
}
```

as a Hast this would look like:
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
          "value": "Hello World!",
        }
      ],
    },
    {
      "type": "element",
      "tagName": "p",
      "children": [
        {
          "type": "text",
          "value": "This is a paragraph",
        }
      ],
    }
  ],
}
```

We will be using Hast from here on out but have a play and see what you prefer. I couldnt find one for Hast but check out this [AST explorer](https://astexplorer.net/#/gist/d9029a2e8827265fbb9b190083b59d4d/3384f3ce6a3084e50043d0c8ce34628ed7477603)

### Setup

Lets keep it super simple and create a package.json using

```bash
$ npm init -y
```

a `script.js` file where we can write our script and a plugins directory where we can add our plugins.

so you will have 

```bash
.
├── package.json
├── plugins
└── script.js
```

### Unified.js

So what is Unified? Unified is a project that will do a temendous amount of heavy lifting for us. Through the power of open source they have created an easy to use interface to interact and manipulate syntax trees. It sits at the centre of [Rehype](https://github.com/rehypejs/rehype) (HTML), [Remark](https://github.com/remarkjs/remark) (Markdown) and [Retext](https://github.com/retextjs/retext) (Natural Language... whatever that is) and it's this project that allows [MDX](https://mdxjs.com/) to add JSX to markdown files, which is pretty amazing.

Think of unified as being your starting block in your lego masterpiece (of course), each piece of functionality can be attached to that block, but you need that block for everything to work. It's the oven that brings all of the ingredients together. For us we will be attaching Remark (for our Markdown), Rehype (for our HTML) and our own custom plugin to convert csv links to simple tables.

### Setting up the script






