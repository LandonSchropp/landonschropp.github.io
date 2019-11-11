# landonschropp.com

This repo contains the code powering my personal website. It uses Contentful as a headless CMS to
host the content, and uses Gulp and Webpack to power the HTML, CSS, JavaScript and images.

## Development

First, make sure you have [Node.js](https://nodejs.org/en/) and Yarn installed locally. Define the
`CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` environment variables. Then you can use `yarn`
to do everything else!

* `yarn install`: Install all of the packages.
* `yarn lint`: Run the linter.
* `yarn build`: Build a static version of the project.
* `yarn watch`: Run a local development server.

To see the other available commands, check the [package.json](package.json) file.

## Deployment

This project uses GitHub Actions to manage all of the deployment. This is configured to run on
content update as well as code updates.
