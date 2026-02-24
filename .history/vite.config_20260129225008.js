import { defineConfig } from "vite";
import pug from "pug";
import fs from "fs";
import { resolve, basename, dirname, extname, relative } from "path";
import { glob } from "glob";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import { viteStaticCopy } from "vite-plugin-static-copy";

// =====================
// Paths
// =====================
const ROOT = resolve(__dirname);
const PAGES_ROOT = resolve(ROOT, "src/pages");
const APP_ROOT = resolve(ROOT, "src/app");

// =====================
// Helpers
// =====================
function findFirstExisting(paths) {
  return paths.find((p) => fs.existsSync(p)) || null;
}

function getMainEntryAbs() {
  return findFirstExisting([resolve(APP_ROOT, "main.ts"), resolve(APP_ROOT, "main.js")]);
}

function getPageEntryAbs(pugPathAbs) {
  const dir = dirname(pugPathAbs); // .../src/pages/home
  return findFirstExisting([resolve(dir, "index.ts"), resolve(dir, "index.js")]);
}

function toViteSrcUrl(absPath) {
  const rel = relative(ROOT, absPath).replace(/\\/g, "/");
  return `/${rel}`; // -> /src/pages/home/index.js
}

function injectScripts(html, { mainSrc, pageSrc }) {
  const tags = [
    mainSrc ? `<script type="module" src="${mainSrc}"></script>` : "",
    pageSrc ? `<script type="module" src="${pageSrc}"></script>` : "",
  ].filter(Boolean);

  if (!tags.length) return html;

  const block = `\n${tags.join("\n")}\n`;
  if (html.includes("</body>")) return html.replace("</body>", `${block}</body>`);
  return html + block;
}

// =====================
// HTML entry points (MPA)
// =====================
function buildEntryPoints() {
  const entries = {
    "index.html": resolve(ROOT, "src/pages/home/home.pug"), // головна = home
  };

  const pages = glob.sync("src/pages/**/*.pug", { nodir: true });

  for (const filePath of pages) {
    const abs = resolve(ROOT, filePath);
    const file = basename(filePath, ".pug");
    const folder = basename(dirname(filePath));

    if (file.startsWith("_")) continue;

    // якщо хочеш НЕ дублювати home як home/index.html, розкоментуй:
    // if (folder === "home" && file === "home") continue;

    if (folder === file) {
      entries[`${file}/index.html`] = abs;
    } else {
      entries[`${folder}/${file}.html`] = abs;
    }
  }

  return entries;
}

const entryPoints = buildEntryPoints();
const htmlInputs = Object.keys(entryPoints);

// map "virtual html id" -> pug file
const virtualModuleMap = htmlInputs.reduce((acc, htmlKey) => {
  acc[resolve(ROOT, htmlKey)] = entryPoints[htmlKey];
  return acc;
}, {});

// =====================
// JS entry points (AUTO)
// =====================
function buildJsEntries() {
  const entries = {};

  // main.(js|ts)
  const mainAbs = getMainEntryAbs();
  if (mainAbs) entries["main"] = mainAbs;

  // pages/**/index.(js|ts)
  const pageIndexFiles = glob.sync("src/pages/**/index.{js,ts}", { nodir: true });

  for (const filePath of pageIndexFiles) {
    const abs = resolve(ROOT, filePath);

    // name by folder path:
    // src/pages/home/index.js -> "home"
    // src/pages/blog/post/index.js -> "blog-post"
    const relDir = relative(PAGES_ROOT, dirname(abs)).replace(/\\/g, "/");
    const name = (relDir || "page").replace(/\//g, "-");

    entries[name] = abs;
  }

  return entries;
}

const jsEntries = buildJsEntries();

// =====================
// Rollup input: HTML (auto from entryPoints) + JS (auto from pages)
// =====================
function buildRollupInput() {
  const input = {};

  // HTML: робимо стабільні ключі, а значення = "index.html" / "about/index.html" ...
  for (const htmlKey of htmlInputs) {
    // "about/index.html" -> "html_about_index"
    const safe = htmlKey
      .replace(/\.html$/i, "")
      .replace(/[\\/]/g, "_")
      .replace(/[^a-z0-9_]/gi, "_");
    input[`html_${safe}`] = htmlKey; // важливо: значення рядок "about/index.html"
  }

  // JS entries
  Object.assign(input, jsEntries);

  return input;
}

export default defineConfig({
  // ми копіюємо статичні самі
  publicDir: false,

  plugins: [
    // sprite -> public_static/icons.svg
    iconsSpritesheet({
      inputDir: "./src/shared/icons",
      outputDir: "./public_static",
      fileName: "icons.svg",
    }),

    // static -> dist/assets/*
    viteStaticCopy({
      targets: [
        { src: "public_static/img/**/*", dest: "assets/images" },
        { src: "public_static/fonts/**/*", dest: "assets/fonts" },
        { src: "public_static/videos/**/*", dest: "assets/videos" },
        { src: "public_static/icons.svg", dest: "assets" },
      ],
    }),

    // Pug MPA
    {
      name: "vite-plugin-pug-mpa",

      resolveId(id, importer) {
        // only for "virtual" html inputs
        if (!importer && entryPoints[id]) {
          return resolve(ROOT, id);
        }
        return null;
      },

      load(id) {
        const pugPath = virtualModuleMap[id];
        if (!pugPath) return null;

        const content = fs.readFileSync(pugPath, "utf-8");

        let html = pug.render(content, {
          filename: pugPath,
          basedir: resolve(ROOT, "src"),
          pretty: true,
        });

        // inject main + page entry (dev: /src/... ; build: Vite replace)
        const mainAbs = getMainEntryAbs();
        const pageAbs = getPageEntryAbs(pugPath);

        html = injectScripts(html, {
          mainSrc: mainAbs ? toViteSrcUrl(mainAbs) : null,
          pageSrc: pageAbs ? toViteSrcUrl(pageAbs) : null,
        });

        return html;
      },

      configureServer(server) {
        server.watcher.on("change", (file) => {
          if (/\.(pug|scss|css|js|ts)$/.test(file)) {
            server.ws.send({ type: "full-reload", path: "*" });
          }
        });

        server.middlewares.use(async (req, res, next) => {
          try {
            const url = (req.url || "/").split("?")[0].split("#")[0];

            // / -> home.pug
            if (url === "/" || url === "/index.html") {
              const filePath = resolve(ROOT, "src/pages/home/home.pug");
              const content = fs.readFileSync(filePath, "utf-8");

              let html = pug.render(content, {
                filename: filePath,
                basedir: resolve(ROOT, "src"),
                pretty: true,
              });

              const mainAbs = getMainEntryAbs();
              const pageAbs = getPageEntryAbs(filePath);

              html = injectScripts(html, {
                mainSrc: mainAbs ? toViteSrcUrl(mainAbs) : null,
                pageSrc: pageAbs ? toViteSrcUrl(pageAbs) : null,
              });

              const processed = await server.transformIndexHtml(req.url, html);
              res.setHeader("Content-Type", "text/html; charset=utf-8");
              res.end(processed);
              return;
            }

            // other pages
            const clean = url.replace(/^\//, "").replace(/\/$/, "");
            const raw = clean.replace(/\.html$/, "");

            const candidates = [
              resolve(ROOT, "src/pages", raw, `${basename(raw)}.pug`),
              resolve(ROOT, "src/pages", raw + ".pug"),
            ];

            for (const filePath of candidates) {
              if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, "utf-8");

                let html = pug.render(content, {
                  filename: filePath,
                  basedir: resolve(ROOT, "src"),
                  pretty: true,
                });

                const mainAbs = getMainEntryAbs();
                const pageAbs = getPageEntryAbs(filePath);

                html = injectScripts(html, {
                  mainSrc: mainAbs ? toViteSrcUrl(mainAbs) : null,
                  pageSrc: pageAbs ? toViteSrcUrl(pageAbs) : null,
                });

                const processed = await server.transformIndexHtml(req.url, html);
                res.setHeader("Content-Type", "text/html; charset=utf-8");
                res.end(processed);
                return;
              }
            }
          } catch (err) {
            return next(err);
          }

          next();
        });
      },
    },
  ],

  root: ".",
  base: "./",

  build: {
    outDir: "dist",
    emptyOutDir: true,

    rollupOptions: {
      input: buildRollupInput(),

      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "main") return "assets/scripts/main.bundle.js";
          if (chunkInfo.name.startsWith("html_")) return "assets/scripts/html/[name].js";
          return `assets/scripts/${chunkInfo.name}.bundle.js`;
        },

        chunkFileNames: "assets/scripts/chunks/[name]-[hash].js",

        assetFileNames: (assetInfo) => {
          const ext = extname(assetInfo.name || "")
            .slice(1)
            .toLowerCase();

          if (ext === "css") return "assets/styles/[name][extname]";
          if (["mp4", "webm", "ogg", "mov", "avi", "wmv"].includes(ext))
            return "assets/videos/[name][extname]";
          if (["png", "jpg", "jpeg", "svg", "gif", "tiff", "bmp", "ico", "webp"].includes(ext))
            return "assets/images/[name][extname]";
          if (["woff", "woff2", "eot", "ttf", "otf"].includes(ext)) return "assets/fonts/[name][extname]";

          return "assets/[name][extname]";
        },
      },
    },
  },

  resolve: {
    alias: {
      "@": resolve(ROOT, "src"),
      "@app": resolve(ROOT, "src/app"),
      "@pages": resolve(ROOT, "src/pages"),
      "@widgets": resolve(ROOT, "src/widgets"),
      "@features": resolve(ROOT, "src/features"),
      "@shared": resolve(ROOT, "src/shared"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
@use "@app/styles/vars.scss" as *;
@use "@app/styles/mixins.scss" as *;`,
      },
    },
  },
});
