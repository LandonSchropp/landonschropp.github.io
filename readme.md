# landonschropp.com

This repo contains the code powering my personal website. Is uses markdown files written with
[Obsidian](https://obsidian.md/) stored on the local file system along with
[Next.js](https://nextjs.org/) to generate a static React site.

## Development

Make sure you have [pnpm](https://pnpm.io/) and the [Node.js](https://nodejs.org/en/) version
listed in the [.node-version](.node-version) file installed locally. Then, you can use `pnpm` to do
everything else!

| Command      | Action                                        |
| :----------- | :-------------------------------------------- |
| `pnpm dev`   | Starts a local dev server at `localhost:3000` |
| `pnpm build` | Build the production site to `dist`           |
| `pnpm lint`  | Run the linter                                |
| `pnpm test`  | Run the tests                                 |

To see the other available commands, check the [package.json](package.json) file.
