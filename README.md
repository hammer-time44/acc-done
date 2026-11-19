# AccDone

Personal algorithm practice. Static HTML, CSS and JavaScript with no build step and no dependencies.

## Pages

| Page | What it does |
| --- | --- |
| `index.html` | Home with CAT-1 and CAT-2 columns (click an algorithm for its Java code), Problems (real tests run in the browser), Mock exam |
| `ide.html` | Editor-style Java scratchpad |

Progress and code drafts save in the browser (`localStorage`).
The "Ask Claude" button and the IDE's Run button only work inside Claude. Everything else works anywhere.
The IDE loads highlight.js from a CDN; the main page needs no network.

## Structure

```
accdone/
├── index.html              home, problems, mock exam
├── ide.html                Java scratchpad
├── assets/
│   ├── favicon.svg
│   ├── css/
│   │   ├── ambient.css     shared surface tokens
│   │   ├── app.css         design system for index.html
│   │   └── ide.css         styles for ide.html
│   └── js/
│       ├── app.js          routing, code pages, problems, mock exam, test runner
│       ├── ide.js          IDE logic
│       ├── motion.js       pointer sheen
│       └── data/
│           ├── algos.js    the 26 topics with their Java code
│           └── problems.js coding problems and tests
├── java/                   the same Java programs as real source files
│   ├── cat1/               L01 to L13
│   └── cat2/               L14 to L26
├── .editorconfig
├── .gitignore
└── .nojekyll
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Run any Java program (JDK 11 or newer):

```bash
java java/cat1/L07_SimpleSieve.java
```

`L02_IOAndOperators.java` reads two integers from standard input.

## Topics

| Lecture | Topic | Bucket |
| --- | --- | --- |
| L1 | Java Introduction, Features, Structure, Data Types | CAT-1 |
| L2 | Basic I/O, Operators | CAT-1 |
| L3 | Decision making and Control structures | CAT-1 |
| L4 | Introduction to Algorithms | CAT-1 |
| L5 | Time & Space complexity-1.1 | CAT-1 |
| L6 | Time & Space complexity-1.2 | CAT-1 |
| L7 | Simple Sieve | CAT-1 |
| L8 | Segmented & Incremental Sieve | CAT-1 |
| L9 | Euler's phi Algorithm | CAT-1 |
| L10 | Strobogrammatic Number | CAT-1 |
| L11 | Remainder Theorem | CAT-1 |
| L12 | Toggle the switch & Alice Apple tree | CAT-1 |
| L13 | Binary Palindrome | CAT-1 |
| L14 | Booth's Algorithm | CAT-2 |
| L15 | Euclid's Algorithm | CAT-2 |
| L16 | Karatsuba Algorithm | CAT-2 |
| L17 | Longest Sequence of 1 after flipping a bit | CAT-2 |
| L18 | Swap two nibbles in a byte | CAT-2 |
| L19 | Block Swap Algorithm | CAT-2 |
| L20 | Max product subarray | CAT-2 |
| L21 | Maximum sum of hour glass in matrix | CAT-2 |
| L22 | Max Equilibrium Sum | CAT-2 |
| L23 | Leaders in array | CAT-2 |
| L24 | Majority element | CAT-2 |
| L25 | Lexicographically first palindromic string | CAT-2 |
| L26 | Natural Sort order | CAT-2 |

## Deploy

GitHub Pages: Settings, Pages, deploy from `main` and root.
Vercel or Netlify: import the repo, framework preset "Other", no build command.

## Add an algorithm

Add an object to `ALGOS` in `assets/js/data/algos.js` with `id`, `lec`, `name`, `cat` (`CAT-1` or `CAT-2`), `pattern` and `code` (the Java shown on its page). Add `idea` and `keys` (regex checks) to unlock the mock key-point check. Keep the matching file in `java/` in sync.

## Add a problem

Add an object to the `PROBS` array in `assets/js/data/problems.js` with `id`, `lec`, `cat`, `name`, `dif`, `tags`, `fn`, `text`, `con`, `start`, `hint`, `sol`, and `tests` as `[[args], expected]`. The first two tests are shown as examples, the rest stay hidden.

## Design

SF Pro via the system font stack, translucent panes over a black background, a segmented nav with an accent highlight, grouped lists, an orange accent, light and dark themes, and motion that turns off for reduced-motion. All tokens are CSS variables at the top of `assets/css/app.css` and `assets/css/ide.css`.
