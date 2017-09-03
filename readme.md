## Development

This project uses Jekyll. Why? Because it's simple and works with GitHub Pages.

To get started, install all the dependencies with `bundle install`. Then, run `bundle exec jekyll
serve` to start up the server.

## Design Considerations

Why is there so much funkiness in this repo?

Starting out, I had two design goals:

* I want to be able to update the site when I make a change to the design. I shouldn't have to
  manually update the content at each step.
* I want to host the site via GitHub Pages. This means it needs to be coded in Jekyll.

My first approach was to split all of the individual values into partials, and to move them around
using CSS transformations. This *works*, but it has one glaring problem: by using CSS
transformations, the backgrounds are no longer aligned. Bummer.

After a lot of thought, I decided to take the images exported from sketch and stick them directly
inside `<template>` elements. Then, I'll query the contents to pull out the paths and dynamically
update the DOM. Normally I'd do the dirty work as part of the build, but in this case I can't
because GitHub Pages won't run custom plugins. For the same reason, using a framework like Preact is
also out.

In the end, I arrivated at an imperfect solution. It's not pretty, but it works and it's easy to
maintain. Â¯\_(ãƒ„)_/Â¯

## Vim Cleanup Macro

Rather than muck around with manually cleaning up the files, here's a quick Vim macro that does it
for you:

```
ddjdd...dd.Gkkdd.ggVG=/widthdf ./versionhdt .dt>
:% s/ fill="[]€kl^"€kr*"//g
:% s/id=/data-id=/
```
