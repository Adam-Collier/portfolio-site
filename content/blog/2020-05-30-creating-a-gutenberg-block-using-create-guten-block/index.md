---
title: Creating a Gutenberg block using npx create guten block
date: 2020-05-30
thumbnail: ./thumbnail.jpg
tags: ["wordpress", "gutenberg"]
description: Let's talk about Gutenberg blocks and how we can create a block of our own to create a wonderful UI experience.
published: true
---

This week I had my first play around with Gutenberg blocks and created my first block (it was a wild ride...). In this post, I thought I would give a little insight into the process of creating a block and some of the headaches I experienced along the way. One important thing to note is that none of this would have been possible without all of the hard work put into the `create-guten-block` open source project so a big thanks to those guys. Okay, now the small talk is over with lets jump right in.

## Setup Create Guten Block

First, we need to create our block (I'm going to call mine "hero block") and in our WordPress plugin directory we need to execute the following in our terminal:

```bash
# make sure you are in your plugins directory
$ npx create-guten-block hero-block
```

Now this will work some magic and our `hero-block` directory will be created with the following structure:

```bash
├── .gitignore
├── plugin.php
├── package.json
├── readme.md
|
├── dist
|  ├── blocks.build.js
|  ├── blocks.editor.build.css
|  └── blocks.style.build.css
|
└── src
   ├── block
   |  ├── block.js
   |  ├── editor.scss
   |  └── style.scss
   |
   ├── blocks.js
   ├── common.scss
   └── init.php
```

Now we can just do a cheeky `cd` and start our development environment

```bash
$ cd hero-block
$ npm start
```

Also (and this is crucial!) make sure to activate your block in the plugin dashboard otherwise you will be wondering why nothing is showing or happening as I did.

I do feel as though the last time I used create-guten-block I couldn't use JSX so it is a great feeling to see that this has been added to the project.

## Prerequisite Notes

So just to prepare you for the Gutenberg experience, I find the Gutenberg docs pretty darn awful for figuring out how to create blocks, which is a real shame because blocks are an amazing step forward for WordPress developers. Instead, I found some blog posts which helped with me understand the basics:

- [Creating a custom block type for WordPress gutenberg]("https://medium.com/stampede-team/creating-a-custom-block-type-for-wordpress-gutenberg-editor-a2539010bb4c")
- [Learning Gutenberg CSS Tricks]("https://css-tricks.com/learning-gutenberg-7-building-our-block-custom-card-block/")

When you read these you will notice some differences in best practices and styles. Once you get the general idea of how they work you can make some solid assumptions.

Now there are quite a lot of helpers/components which WordPress have created to make it easier to build blocks, however, as mentioned before the docs make this extremely difficult to come by. Instead, I took to looking in the Gutenberg Github repo and just searching for a component I thought I might need. Examples of some components you can find:

- [PlainText]("https://github.com/WordPress/gutenberg/blob/2b2fc18075af17a5dbf658aa550d03896cc40c7a/packages/block-editor/src/components/plain-text/README.md") - A simple text input without any options to change the text style
- [TextControl]("https://github.com/WordPress/gutenberg/tree/master/packages/components/src/text-control") - Think PlainText with a label. Users always love a good label.
- [MediaUpload]("https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/media-upload") - Add media from your media library.

By understanding what components are available from the Gutenberg team anyone could hypothetically get a block up and running pretty swiftly.

## Tweak the Default Settings

Let's get into the React side of things. First of all, let's sort out our block settings, you will see the below bit of code in your `src/block.js` file:

```js
// Block name. Block names must be a string that contains a namespace prefix. Example: my-plugin/my-custom-block.
title: __( 'my-block - CGB Block' ), // Block title.
icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
keywords: [
    __( 'my-block — CGB Block' ),
    __( 'CGB Example' ),
    __( 'create-guten-block' ),
],
```

This is some nice setup create guten block has done for us and we can start to put our own stamp on it.

```jsx
title: __("Hero Block"), // Block title.
icon: "format-image", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
category: "layout", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
keywords: [
    __("hero-block — CGB Block"),
    __("CGB Example"),
    __("create-guten-block"),
],
```

Gutenberg has defined a tonne of dashicons we can readily use to identify our blocks and can be found in their [developer resources]("https://developer.wordpress.org/resource/dashicons/#arrow-right-alt"). Just make sure to remove the dashicons part of the name and it should work like a dream.

## Adding Attributes

Now, a biggie. We need to add our attributes, and this is fundamental to the block building process. Think of attributes as setting the initial state, or making them known to the block that this content is needed. In this instance I'm building a hero content block which is going to consist of an image, a title and a subtitle. So keeping that in mind my initial section would look like the below:

```jsx{4-21}
title: __("Hero Block"), // Block title.
icon: "format-image", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
category: "layout", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
attributes: {
    // type of hero content
    type: { type: "string", default: "top" },
    // title of the post
    title: { type: "string" },
    // subtitle of the post
    subtitle: { type: "string" },
    // the image media url
    url: { type: "string", default: "" },
    // the image id
    id: { type: "number" },
    // image width
    width: { type: "number" },
    // image height
    height: { type: "number" },
    // image alt text
    alt: { type: "string" },
},
keywords: [
    __("hero-block — CGB Block"),
    __("CGB Example"),
    __("create-guten-block"),
],
```

Note: I've got a type attribute here because eventually, I'm going to create a dropdown so users can mix up the layout on the front end. The attributes are for you to decide, you can pick and choose whatever you want.

One thing to acknowledge is that the image id, width, height and alt attributes used above will all be used later on for some clever image wizardry Gutenberg supplies. If you're wondering why I've added them that is.

## The Edit Function

So further down in our block.js file, we have an edit function which allows us to add our react goodness to the backend. Create guten block puts some placeholder in there by default but we can strip all of that out to create our custom block.

At the top of the block we can import some components we can use in our edit function:

```jsx
// Get the media library component from the editor
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
// Grab a couple of text components we can use for the editor experience
import { TextControl, SelectControl } from "@wordpress/components"

// import the button component
import { Button } from "@wordpress/components"
```

and then in our function we can add the below (I've added a load of comments which will hopefully help you understand exactly what is going on):

```jsx
edit: (props) => {
    // lets grab the props we will need
    const { setAttributes, className, attributes } = props;
    // destructure all of the attributes we need for editing
    const { title, subtitle, type, url } = attributes;

    const ALLOWED_MEDIA_TYPES = ["image"];

    return (
        <div className={className}>
            // this is our dropdown
            // notice the onChange and setAttributes function being called
            // this updates the type attribute everytime it is changed
            <SelectControl
                label="Image position "
                value={type}
                options={[
                    { label: "Top", value: "top" },
                    { label: "Bottom", value: "bottom" },
                    { label: "Left", value: "left" },
                    { label: "Right", value: "right" },
                ]}
                onChange={(value) => setAttributes({ type: value })}
            />
            // text box for our title
            // the value will always be up to date because it is using the title attribute
            // on every change the title will be updated
            <TextControl
                label="Title"
                value={title}
                onChange={(value) => setAttributes({ title: value })}
            />
            // text box for our subtitle
            // the value will always be up to date because it is using the subtitle attribute
            <TextControl
                label="Subtitle"
                value={subtitle}
                onChange={(value) => setAttributes({ subtitle: value })}
            />
            // our media upload button
            // this will open a modal where we can select our image
            // notice that when the image is selected we are updating some of our attributes
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => {
                        setAttributes({
                            url: media.url,
                            id: media.id,
                            width: media.width,
                            height: media.height,
                            alt: media.alt,
                        });
                    }}
                    allowedTypes={ALLOWED_MEDIA_TYPES}
                    render={({ open }) => (
                        <Button isPrimary onClick={open}>
                            Open Media Library
                        </Button>
                    )}
                />
            </MediaUploadCheck>
            // lets display an image in the editor when one has been selected
            {url && <img src={url} />}
        </div>
    );
},
```

A reminder that everything in edit is for your backend and what is interacted with in the admin post editor.

## The Save Function

The Save function is where we can decide what is and isn't rendered on the client. This is the opportunity for our blocks to shine because we can utilise all the hard work we've done in the backend to get the content and now display it beautifully

> Something to bare in mind whilst developing our block, if we have saved our block to a post and then we got into our save function and edit the markup structure we will get an error in our console. This is nothing to worry about we just need to delete the block and readd our updated one.

It should be a little easier to see what is going on here but I'll shower you with comments anyway.

```jsx
save: (props) => {
    // let's grab the attributes props which filters through from our edit function
    const { attributes } = props;
    // define all of the variables we will need to use
    const { url, alt, id, width, height, title, subtitle, type } = attributes;

    // render the template with all of our variables
    return (
        <div className={`hero-content content-${type}`}>
            <div>
                <h1>{title}</h1>
                <h4>{subtitle}</h4>
            </div>
            <section>
                // this is some wordpress wizardry which I'll explain below
                <img
                    src={url}
                    alt={alt}
                    className={id ? `wp-image-${id}` : null}
                    // add a width and height to stop content from jumping on load
                    width={width}
                    height={height}
                />
            </section>
        </div>
    );
},
```

So relatively simple stuff right? Now let's talk through that image tag we touched upon earlier. I was wondering how they handled images in the core image Gutenberg block and I spotted that it outputs a srcset, which makes it a lot easier to handle responsive images. After browsing the Gutenberg issues and merged PR's the special sauce in this case all comes from the `wp-image-{id}` class name. Therefore, by grabbing the image id and creating a class name of a similar nature we could create some low-cost responsive images. This blew my mind when I figured it out especially because there was no mention of it in the docs, thank god for version control and Github. One frustrating thing at the moment is that it presumes your image is full width, so even though it's a very low-cost win it also comes with a lack of flexibility.

## Building your Block

Once you have created your incredibly amazing feat of engineering to show off to the world you can now build it! It's actually super simple and no intense labour required. Execute the below in your terminal, making sure you are in your block directory:

```bash
$ npm run build
```

So that should run with hopefully no issues and your block can be all built in all it's glory.

## Conclusion

Well thats it! A very swift introduction on creating Gutenberg Blocks based on my very limited experience. If you have any questions or even answers (I still need many) for anything above shoot me a message (no sliding here)
