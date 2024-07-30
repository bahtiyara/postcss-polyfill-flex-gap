# PostCSS polyfill flex gap
[PostCSS] plugin This project polyfill all flexbox gaps into margins for older browsers.

### Input

```css
.list {
  display: flex;
  gap: 10px;
}
.item {
  display: flex;
  background-color: red;
}
```

### Output

```css
.list {
  display: flex;
}
.list:not(:last-child) {
  margin-right: 10px;
}
.item {
  display: flex;
  background-color: red;
}
```