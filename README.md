# aiload

## About

This repository contains code to generate a single text file from a codebase containing the full source-code with filepaths and EOF delimiters. This file can be uploaded to [Gemini](https://gemini.google.com/app) with > 1 million token context and the AI can then chat about the codebase.

## Installation

```bash
# install bun
curl -fsSL https://bun.sh/install | bash

# clone repo
git clone git@github.com:kapv89/aiload.git

# cd into repo
cd aiload

# install deps
bun install

# run build.sh
./build.sh
# this generates a binary named `aiload`

# copy `aiload` to a directory in your $PATH
sudo cp aiload /usr/local/bin

```

## Usage
Suppose you have a folder named `codebase` which you want to export into a single text file. You need to generate a *patterns* text file **in the root of the project** for the `codebase` folder so that `aiload` can know what files to export. Patterns file for my unlaunched multiplayer Entity Relation Diagram tool is named `erdtool.patterns` and looks something like this:

`erdtool.pattenrs`

```text
*.sh
package.json
turbo.json
*.gitignore
*.dockerignore
*.Dockerfile
docker-compose.yml

!runner/node_modules/**/*.*
runner/**/*.*
runner/ecosystem.config.js
runner/package.json

!infra/node_modules/**/*.*
infra/**/*.*

!apps/api/node_modules/**/*.*
apps/api/**/*.*

!apps/crdt-wss/node_modules/**/*.*
apps/crdt-wss/**/*.*

!apps/io/node_modules/**/*.*
apps/io/**/*.*

!apps/web/node_modules/**/*.*
apps/web/**/*.*

```

Pattenrs file uses [`glob`](https://www.npmjs.com/package/glob) patterns and supports **include** and **exclude** patterns. Exclude patterns start with `!`.

Once you have a patterns file, you can then run `aiload` using the command:

```bash
aiload erdtool.patterns
```

This will generate a file named `output` which will contain the full codebase.


### \*

Made using Gemini.
