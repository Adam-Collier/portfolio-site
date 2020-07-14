---
title: Creating a Gutenberg block using npx create guten block
date: 2020-05-30
thumbnail: ./thumbnail.jpg
tags: ["wordpress", "gutenberg"]
published: true
---

This week I delved into the world of Gutenberg blocks and created my first block (it took a while...). In the following, I'll show you how to create your own and mention some of the trials and tribulations I encountered along the way. One important thing to note is none of this would have been possible without all of the hard work put into the `create guten block` project so a big thanks to those chaps. Okay, now the small talk is over with lets jump right in. First, we need to create our block, I'm going to call mine hero block, in our plugin directory by doing the following:

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

I would like to be able to throw this into a blocks directory in the theme instead of having to add it to the plugins, but that's just me. On another note what's amazing about create-guten-block is it sets everything up for us, including our development environment (webpack and all that jazz) saving the humble developer many an hour which can be spent pondering life instead.

Now we can just do a cheeky `cd` and start our development environment

```bash
$ cd hero-block
$ npm start
```

Also (and this is essential!) make sure to activate your block in the plugin dashboard otherwise you will be wondering why nothing is showing or happening as I did.

I feel as though a while ago you couldn't write JSX and use hooks in create-guten-block, but a lot seems to have changed (which is always the case with front end development).

So just to prepare you, I find the Gutenberg docs pretty darn awful for figuring out how to create blocks, which is a real shame because blocks are an amazing step forward for WordPress developers. Instead, I found some blog posts which helped with my understanding:

- [Creating a custom block type for WordPress gutenberg]("https://medium.com/stampede-team/creating-a-custom-block-type-for-wordpress-gutenberg-editor-a2539010bb4c")
- [Learning Gutenberg CSS Tricks]("https://css-tricks.com/learning-gutenberg-7-building-our-block-custom-card-block/")

Now there are quite a lot of helpers/components which WordPress have created to make it easier to build blocks, however, as mentioned before the docs make this extremely difficult to come by. Instead, I took to looking in the Gutenberg Github repo and just searching for a component I thought I might need. Examples of some components you can find:

- [PlainText]("https://github.com/WordPress/gutenberg/blob/2b2fc18075af17a5dbf658aa550d03896cc40c7a/packages/block-editor/src/components/plain-text/README.md") - A simple text input without any options to change the text style
- [TextControl]("https://github.com/WordPress/gutenberg/tree/master/packages/components/src/text-control") - Think PlainText with a label. Users always love a good label.
- [MediaUpload]("https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/media-upload") - Add media from your media library.

By understanding what components are available from the Gutenberg team anyone could hypothetically get a block up and running pretty quickly.

Okay enough of that tangent, let's get into the React side of things. First of all, let's sort out our block settings, you will see the below bit of code in your `src/block.js` file:

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

This is some nice setup create guten block has done for us and we can tweak it more in line with what we want.

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

Gutenberg has defined a tonne of dashicons we can readily use to identify our blocks and can be found in their [developer resources]("https://developer.wordpress.org/resource/dashicons/#arrow-right-alt"). Just make sure to remove the dashicons part of the name and it should work a dream.

Now, a biggie. We need to add our attributes, and this is fundamental to the block building process. Think of attributes as setting the initial state, or making them known to the block that this stuff is needed. In this instance I'm building a hero content block which is going to consist of an image, a title and a subtitle. So keeping that in mind my initial section would look like the below:

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

Note: I've got a type attribute here because eventually, I'm going to create a dropdown so users can mix up the layout on the front end. Again the attributes all depend on your needs.

So further down in our block.js file, we have an edit function and a save function which allows us to add our react goodness to the backend and frontend respectively. Create guten block puts some placeholder in there by default but we can strip all of that out as we want to be super cool and create our own.

At the top of the block we can import some components we can use in our edit function:

```jsx
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { TextControl, SelectControl } from "@wordpress/components"
import { Button } from "@wordpress/components"
```

and then in our edit function we can add the below:

```jsx
edit: (props) => {
    const { setAttributes, className, attributes } = props;

    const { title, subtitle, type, url } = attributes;

    const ALLOWED_MEDIA_TYPES = ["image"];

    return (
        <div className={className}>
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

            <TextControl
                label="Title"
                value={title}
                onChange={(value) => setAttributes({ title: value })}
            />

            <TextControl
                label="Subtitle"
                value={subtitle}
                onChange={(value) => setAttributes({ subtitle: value })}
            />

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

            {url && <img src={url} />}
        </div>
    );
},
```
