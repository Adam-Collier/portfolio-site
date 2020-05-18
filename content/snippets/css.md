## CSS

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
