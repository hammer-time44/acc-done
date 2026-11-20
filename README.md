# AccDone

Personal algorithm practice. Static HTML, CSS and JavaScript with no build step and no dependencies.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Algorithms (CAT-1, CAT-2 and FAT lists with Java code, a short About and the key logic), Problems (tests run in the browser), Mock exam, Guide |
| `ide.html` | Editor-style Java scratchpad with files and tabs |

Progress and code drafts save in the browser (`localStorage`). The main page needs no network. The IDE loads highlight.js from a CDN.

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Esc` | Back to the home page |
| `/` | Search topics |
| `1` `2` `3` | Show or hide CAT-1, CAT-2, FAT |
| `a` `p` `m` | Algorithms, Problems, Mock exam |
| `?` | Guide |
| `c` | Copy the code on a topic page |
| `g` then `i` | Open the IDE |

## Structure

```
.
├── index.html
├── ide.html
├── assets/
│   ├── favicon.svg
│   ├── css/        ambient.css, app.css, ide.css
│   └── js/
│       ├── app.js
│       ├── ide.js
│       └── data/   algos.js, problems.js
└── java/           the same Java programs as source files
    ├── cat1/       L01 to L13
    ├── cat2/       L14 to L26
    └── fat/        L27 to L45
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Run a Java program (JDK 11 or newer):

```bash
java java/cat1/L09_EulerPhi.java
```

## Deploy

GitHub Pages: Settings, Pages, deploy from `main` and root.
Vercel or Netlify: import the repo, framework preset "Other", no build command.

## Add an algorithm

Add an object to `ALGOS` in `assets/js/data/algos.js` with `id`, `lec`, `name`, `cat` (`CAT-1`, `CAT-2` or `FAT`), `pattern`, `about`, `logic` and `code`. Keep the matching file in `java/` in sync.

## Add a problem

Add an object to `PROBS` in `assets/js/data/problems.js` with `id`, `lec`, `cat`, `name`, `dif`, `tags`, `fn`, `text`, `con`, `start`, `hint`, `sol`, and `tests` as `[[args], expected]`. The first two tests are shown, the rest stay hidden.
