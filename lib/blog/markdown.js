/**
 * Minimal, dependency-free Markdown renderer.
 *
 * Everything is HTML-escaped before formatting, so author input cannot inject
 * markup. Supports the subset blog posts need: headings, paragraphs, lists,
 * blockquotes, fenced code, inline code, bold, italic, links and rules.
 * Headings get ids so the table of contents can link to them.
 */

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/** Only allow http(s) and root-relative links. */
function safeUrl(url) {
  const trimmed = String(url).trim();
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("#")
  ) {
    return escapeHtml(trimmed);
  }
  return "#";
}

function inline(text) {
  let out = escapeHtml(text);

  // inline code first, so its contents are not styled further
  const code = [];
  out = out.replace(/`([^`]+)`/g, (_, value) => {
    code.push(value);
    return `\u0000${code.length - 1}\u0000`;
  });

  out = out
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      const href = safeUrl(url);
      const external = href.startsWith("http");
      return `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
    });

  return out.replace(/\u0000(\d+)\u0000/g, (_, index) => `<code>${code[index]}</code>`);
}

export function renderMarkdown(markdown = "") {
  const lines = String(markdown).replace(/\r\n/g, "\n").split("\n");
  const html = [];
  const headings = [];
  let paragraph = [];
  let list = null;
  let quote = [];
  let fence = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list) {
      html.push(`<${list.type}>${list.items.map((item) => `<li>${inline(item)}</li>`).join("")}</${list.type}>`);
      list = null;
    }
  };

  const flushQuote = () => {
    if (quote.length) {
      html.push(`<blockquote>${inline(quote.join(" "))}</blockquote>`);
      quote = [];
    }
  };

  for (const line of lines) {
    // fenced code
    if (line.startsWith("```")) {
      if (fence === null) {
        flushParagraph();
        flushList();
        flushQuote();
        fence = [];
      } else {
        html.push(`<pre><code>${escapeHtml(fence.join("\n"))}</code></pre>`);
        fence = null;
      }
      continue;
    }
    if (fence !== null) {
      fence.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushQuote();
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      headings.push({ id, text, level });
      html.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushParagraph();
      flushList();
      flushQuote();
      html.push("<hr />");
      continue;
    }

    const quoteLine = line.match(/^>\s?(.*)$/);
    if (quoteLine) {
      flushParagraph();
      flushList();
      quote.push(quoteLine[1]);
      continue;
    }

    const orderedItem = line.match(/^\d+\.\s+(.*)$/);
    const bulletItem = line.match(/^[-*]\s+(.*)$/);
    if (orderedItem || bulletItem) {
      flushParagraph();
      flushQuote();
      const type = orderedItem ? "ol" : "ul";
      if (!list || list.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push((orderedItem || bulletItem)[1]);
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushQuote();

  return { html: html.join("\n"), headings };
}

export function extractHeadings(markdown = "") {
  return renderMarkdown(markdown).headings;
}
