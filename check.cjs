// quick structural sanity check for index.html
const s = require("fs").readFileSync("index.html", "utf8");
const strip = s.replace(/<script[\s\S]*?<\/script>/g, "<script></script>").replace(/<!--[\s\S]*?-->/g, "");

const ids = [...strip.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
const hrefs = [...strip.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
const missing = [...new Set(hrefs.filter(h => !ids.includes(h)))];
const bad = strip.match(/undefined|NaN(?![a-z])|\[object/);

// stack-based tag balance for common containers
const stack = [];
const tagRe = /<(\/?)([a-z]+)[^>]*?(\/)?>/gi;
let m, errors = [];
const voids = new Set(["meta","link","br","img","input","hr","source"]);
while ((m = tagRe.exec(strip))) {
  const [, close, tag, self] = m;
  if (voids.has(tag.toLowerCase()) || self) continue;
  if (!close) stack.push(tag.toLowerCase());
  else {
    let top = stack.pop();
    if (top !== tag.toLowerCase()) {
      errors.push(`mismatch: expected </${top}> got </${tag.toLowerCase()}> @ ${m.index}`);
      while (stack.length && top !== tag.toLowerCase()) top = stack.pop();
    }
  }
}
if (stack.length) errors.push("unclosed: " + stack.join(", "));

console.log("duplicate ids :", dup.length ? dup.join(", ") : "none");
console.log("broken #anchors:", missing.length ? missing.join(", ") : "none");
console.log("bad tokens    :", bad ? bad[0] : "none");
console.log("tag balance   :", errors.length ? "\n  " + errors.join("\n  ") : "OK (all tags nested correctly)");
console.log("sections      :", (strip.match(/<section/g) || []).length, "| h2:", (strip.match(/<h2/g) || []).length);
console.log("bytes         :", s.length);
