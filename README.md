# PostCSS polyfill flex gap
This plugin polyfills all flexbox gaps into margins for older browsers.

### Basic example

```css
/* input */
.list {
  display: flex;
  gap: 10px;
}
.item {
  display: flex;
  background-color: red;
}

/* output */
.list {
  display: flex;
}
.list > *:not(:last-child) {
  margin-right: 10px;
}
.item {
  display: flex;
  background-color: red;
}
```

### flex-wrap
This plugin DOES NOT process `flex-wrap: wrap`

```css
/* input */
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* output */
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
```
