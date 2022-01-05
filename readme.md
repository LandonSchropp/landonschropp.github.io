# landonschropp.com

This repo contains the code powering my personal website. It uses [Notion](https://www.notion.so/)
as a headless CMS to host the content, and uses [Gatsby](https://www.gatsbyjs.com/) to generate
static HTML pages.

## Development

First, make sure you have [Node.js](https://nodejs.org/en/) and Yarn installed locally. Define the
`NOTION_API_TOKEN` environment variable. Then you can use `yarn` to do everything else!

* `yarn lint`: Run the linter.
* `yarn build`: Build a static version of the project.
* `yarn develop`: Run a local development server.

To see the other available commands, check the [package.json](package.json) file.

## Deployment

This project uses GitHub Actions to manage all of the deployment. This is configured to run on
content update as well as code updates.
