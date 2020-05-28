---
title: Creating a Masonry Layout using CSS Grid
date: 2019-05-26
featuredImage: ./featured-image.png
thumbnail: ./thumbnail.jpg
tags: ["CSS", "CSS grid"]
---

In a recent project I came across a nifty way to create a masonry grid layout using CSS grid and a smidge of javascript . Initially I thought about using something like Masonry.js or Isotope but it kinda felt a little bit overkill. Whats cool about this approach its super flexible and it’s not relying on any frameworks! I’m going to try and keep this post short and sweet so you can get up and running and enjoy this trick yourselves.

Lets get started by adding some HTML to an index.html file

```html
<div class="grid">
  <article class="grid-item">
    <div class="thumbnail" style="padding-top: 100%">
      <img class="lazyloaded" data-src="/image-1" alt="" src="/image-1" />
    </div>
  </article>
  <article class="grid-item">
    <div class="thumbnail" style="padding-top: 100%">
      <img class="lazyloaded" data-src="/image-2" alt="" src="/image-2" />
    </div>
  </article>
  <article class="grid-item">
    <div class="thumbnail" style="padding-top: 150%">
      <img class="lazyloaded" data-src="/image-3" alt="" src="/image-3" />
    </div>
  </article>
  <article class="grid-item">
    <div class="thumbnail" style="padding-top: 100%">
      <img class="lazyloaded" data-src="/image-4" alt="" src="/image-4" />
    </div>
    >
  </article>
  <article class="grid-item">
    <div class="thumbnail" style="padding-top: 100%">
      <img class="lazyloaded" data-src="/image-5" alt="" src="/image-5" />
    </div>
  </article>
  <article class="grid-item">
    <div class="thumbnail" style="padding-top: 100%">
      <img class="lazyloaded" data-src="/image-6" alt="" src="/image-6" />
    </div>
  </article>
  <article class="grid-item">
    <div class="thumbnail" style="padding-top: 100%">
      <img class="lazyloaded" data-src="/image-7" alt="" src="/image-7" />
    </div>
    >
  </article>
</div>
```

Here we have created a simple grid with some grid items. Note: the padding-top and lazyloaded are to prevent the jumping of content when your images load in.

Now lets create some css

```css

.grid {
    display: grid;
    grid-row-gap: 0px;
    grid-column-gap: 40px;
    grid-template-columns: repeat(
        auto-fit,
        minmax(300px, var(--template-columns, 1fr))
    );
    grid-auto-rows: 5px;
    width: 80%;
    max-width: 1080px;
    margin: 0 auto;
    padding-bottom: 40px;
}

.grid-item {
    grid-row-end: var(--row-span, span 40)
    padding-bottom: 40px
}

img {
    width: 100%;
    height: auto
}

@media (max-width:800px) {
    .grid {
        width: 90%;
        grid-template-columns: 1fr;
        grid-auto-rows: auto
    }
    .grid-item {
        grid-row-end: auto
    }
}
```

Essentially what we are doing here is telling `.grid` that we want to display a responsive grid of items. minmax(300px, var( — template-columns, 1fr)) does a lot of the heavy lifting for us here by creating repeating columns with a minimum width of 300px and a max width of 1fr (fr is a fractional unit), when a column width falls below the minimum value the layout reshuffles and the number of columns reduces.

Some things to note here is grid-auto-rows: 5px which is what is going to allow us to create our masonry layout. Some stylistic preferences I have is to use grid-gap-columns and padding-bottom to create the spacing between elements. The reason for this is I found the spacing to become noticeably inconsistent if grid-gap-rows is also used.

```js
const grid = document.querySelector('.grid')
const gridItems = document.querySelectorAll('.grid-item')
const rowSize = 5

const setColumns = value => grid.style.setProperty('--template-columns', value)

gridItems.length <= 2 ? setColumns(`0.333fr`) : setColumns(`1fr`)

const positionGridItems = () => {
    gridItems.forEach((x, i) => {
        if (document.body.clientWidth < 711) {
            x.style = ''
            return
        } else {
            const rowSpan = Math.ceil(
                gridItems.offsetHeight) / rowSize
            )
            x.style.setProperty('--row-span', `span ${rowSpan}`)
        }
    })
}

function debounce(func, wait, immediate) {
    var timeout
    return function() {
        var context = this,
            args = arguments
        var later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

document.addEventListener('DOMContentLoaded', event => {
    positionGridItems()
})

window.addEventListener('resize', debounce(positionGridItems, 20))
```

Now here is where all of the magic happens. Firstly we get the grid and grid item DOM elements, we set the `rowSize` value (which is equivalent to the grid-auto-rows value in our css file). We create a `setColumns` function which changes the `grid-template-columns` variable if there are less than three items (a full row) to keep the grid item sizes consistent.

In our positionGridItems function we are looping through our gridItems , if the browser is less than 711px inline styles are removed. Anything above 711px we are getting the height of each item and dividing it by our rowSize value. Then we are setting our --row-span variable which is the value of our grid-row-ends css property. And that is pretty much all of the hard work done! We then go onto create a debounce function (taken from a David Walsh post) and then call our positionGridItems function on the DOMContendLoaded event. We call it on the DomContentLoaded event to prevent a flickering of content. Then to top it all off we add a debounced event listener to call the function again when the browser is resized

I hope you have enjoyed this post and don’t hesitate to HMU if you have any questions or just want to say hi 👋 [@collieradam](https://twitter.com/collieradam)
