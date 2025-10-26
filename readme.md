# landonschropp.com

This repo contains the code powering my personal website. Is uses markdown files written with
[Obsidian](https://obsidian.md/), which are stored on the local file system, along with
[Next.js](https://nextjs.org/) to generate a static React site.

## Environment Variables

This project requires specific environment variables to locate content files.

- `NOTES_PATH`: The directory containing learning notes.
- `TODAY_I_LEARNED_PATH`: The directory containing Today I Learned (TIL) notes.
- `ARTICLES_PATH`: The directory containing articles.

## Development

Make sure you have [pnpm](https://pnpm.io/) and the [Node.js](https://nodejs.org/en/) version
listed in the [.node-version](.node-version) file installed locally. Then, you can use `pnpm` to do
everything else!

| Command            | Action                                        |
| :----------------- | :-------------------------------------------- |
| `pnpm dev`         | Starts a local dev server at `localhost:3000` |
| `pnpm build`       | Build the production site to `dist`           |
| `pnpm deploy`      | Deploys the site to GitHub Pages              |
| `pnpm lint`        | Run the linter                                |
| `pnpm test`        | Run the tests                                 |
| `pnpm check-types` | Run TypeScript type checking                  |

To see the other available commands, check the [package.json](package.json) file.
