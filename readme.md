# Landon Schropp's Personal Website

This repo contains the code powering my personal website. It uses [Notion](https://www.notion.so/)
as a headless CMS to host the content, and uses [Astro](https://astro.build/) to generate
static HTML pages.

## Commands

First, make sure you have [Node.js](https://nodejs.org/en/) and pnpm installed locally. Define the
`NOTION_API_TOKEN` environment variable. Then you can use `pnpm` to do everything else!

| Command          | Action                                           |
| :--------------- | :----------------------------------------------- |
| `pnpm dev`       | Starts local dev server at `localhost:4321`      |
| `pnpm build`     | Build your production site to `./dist/`          |
| `pnpm preview`   | Preview your build locally, before deploying     |
| `pnpm astro ...` | Run CLI commands like `astro add`, `astro check` |

To see the other available commands, check the [package.json](package.json) file.

## Deployment

This project uses GitHub Actions to manage all of the deployment. This is configured to run on
content update as well as code updates.
