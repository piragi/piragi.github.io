# piragi

A deliberately small personal blog built with plain HTML, CSS, and a tiny theme script. There is no build step or package installation. Post pages load a pinned version of KaTeX for mathematical notation.

## Run locally

From this directory, start any static file server:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish a post

1. Copy an existing file in `posts/` and update its title, description, date, and article content.
2. Add the new entry to the top of the post list in `index.html`.
3. Update the entry count beside “Posts”.

Shared visual styles live in `style.css`. `site.js` initializes the saved light/dark theme and renders math when KaTeX is present. Header markup stays in each page so the site remains readable without JavaScript.

## Write math

KaTeX is loaded on post pages. Use dollar delimiters directly in the article text:

```html
<p>Einstein's equation is $E = mc^2$.</p>

<p>For a displayed equation:</p>
$$
\int_0^\infty e^{-x}\,dx = 1
$$
```

Inline `\(...\)` and display `\[...\]` delimiters are also supported. Math inside `<code>` and `<pre>` is left untouched. Escape a literal dollar sign as `\$`.
