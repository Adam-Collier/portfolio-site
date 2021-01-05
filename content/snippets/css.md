## CSS

### Responsive CSS grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* This is better for small screens, once min() is better supported */
  /* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
  grid-gap: 1rem;
  /* This is the standardized property now, but has slightly less support */
  /* gap: 1rem */
}
```

### Full width in restricted container

```css
.full-width {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
```

### Max width in restricted container

```css
.not-full-but-bigger {
  margin: auto calc(50% - 50vw);
  width: 60vw;
  transform: translateX(calc(50vw - 50%));
}
```

### Line Clamp

```css
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Device hover state

```css
@media (hover: hover) {
  .element {
    opacity: 0;
  }
  .element:hover {
    opacity: 1;
  }
}

@media (hover: none) {
  .element {
    opacity: 1;
  }
}
```

### Carousel

A CSS only carousel, made possible by the introduction of scroll-snap. If you're wanting chevrons and click to slide functionality stick to a JS library, but for a mobile only carousel it works great.

```css
.carousel {
  display: flex;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.carousel .item {
  flex-shrink: 0;
  width: 100%;
  scroll-snap-align: center;
}

/* hide horizontal scroll bar Chrome/Safari */
.carousel::-webkit-scrollbar-track,
.carousel::-webkit-scrollbar,
.carousel::-webkit-scrollbar-thumb {
  width: 0 !important;
}

.carousel {
  /* Firefox */
  scrollbar-width: none;
  /* IE */
  ms-overflow-style: none;
}
```

### Background shorthand

Sometimes it can be a pain remembering the order of each background property

```css
/* image, position, size and repeat */
body {
  background: url(sweettexture.jpg) top center / 200px 200px no-repeat;
}
```

### Multiple background images

Remember that the icon/image is declared after the colour. A good use case for this is image placeholders, for example you could have your companys logo above their brand grey.

```css
.image-placeholder {
  background: #eff0f2 url('./icons/logo.svg');
}

/* alternatively we can define colour and image seperately for the same effect */
.image-placeholder {
  background-color: #eff0f2;
  background-image: url('./icons/logo.svg');
}
```

### Underline styles

Although improving, underlining text in CSS doesn't give you many stylistic options (like stroke width or space from the text). The below solution creates a flexible underline which skips any descenders.

```css
li {
  // for the underline to "skip" the descenders
  text-shadow: 1px 1px var(--primary-background), 1px -1px var(--primary-background),
    -1px 1px var(--primary-background), -1px -1px var(--primary-background);
}

.current-menu-item {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1.5px;
    bottom: 1px;
    background: var(--primary-foreground);
    z-index: -1;
  }
}
```
