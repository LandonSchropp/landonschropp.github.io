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

There are a few constraints that make deploying this repo a little more challenging than normal.

- First, Obsidian Sync does not provide an API for accessing the synced data. This means that I
  can't easily access the source content for this website in a CI environment.
- Second, GitHub Actions doesn't easily allow actions to be configured to run on a repeating
  basis on a free plan.

Given these limitations, I've decided instead to deploy on my personal laptop using the
[deploy](bin/deploy) script scheduled via `launchd`. This require a bit of setup, but once it's
running it will always deploy the site daily.

### Automated Deployments

Since this repo will be running on my local machine, it's important that a few preconditions are met
in order for the deployment to work correctly.

1. SSH must be configured to clone the repo and push up the deployment branch.
2. The repo must be cloned to `$HOME/Development/landonschropp.com` so `launchd` can find the
   `deploy` script.
3. The required environment variables must be set via an `.envrc` file. This deploy script will
   automatically load this file.

To manually deploy, run `bin/deploy`.

To set up `launchd` to automatically deploy, run `launchctl load -w deploy.plist`.
