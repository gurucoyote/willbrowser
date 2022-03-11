import { chromium } from "playwright-chromium";
import Vorpal from "vorpal";
import grep from "vorpal-grep";
// https://github.com/sindresorhus/ansi-escapes
import ansiEscapes from "ansi-escapes";

const vorpal = Vorpal();
vorpal.use(grep);
let browser, page, acts, currIndex, currEl;
// console.log(process.argv);
let url = process.argv[2];
if (url) {
  await goto(url);
}

vorpal
  .mode("repl")
  .description("Enters the user into a REPL session.")
  .delimiter("repl:")
  .action(function (command, callback) {
    try {
      this.log(eval(command));
    } catch (e) {
      this.log(e.message);
    }
    callback();
  });
vorpal
  .command("clear", "clear the screen") //
  .action(function (_, callback) {
    process.stdout.write(ansiEscapes.eraseScreen);
    callback();
  });
vorpal
  .command("goto <url>", "goto an url") //
  .action(function (args, callback) {
    this.log("going to " + args.url);
    goto(args.url).then(async () => {
      callback();
    });
  });
vorpal
  .command("next [n]", "next [n] elemen(s)t in accessebilty tree")
  .action(function (args, callback) {
    reportElements(null, args.n || 1);
    callback();
  });
vorpal
  .command("prev [n]", "previous [n] element(s) in accessebilty tree")
  .action(function (args, callback) {
    reportElements(currIndex - (args.n || 1), args.n || 1);
    callback();
  });
vorpal
  .command("get <el>", "gets and element and prints its innertext")
  .action(function (args, cb) {
    page.innerText(args.el).then((r) => {
      this.log(r);
      cb();
    });
  });
vorpal.delimiter("will>").show();

async function reportElements(start, number) {
  if (!acts) return;
  if (!start) start = currIndex + 1;
  acts.children.map((el, i) => {
    if (i >= start && i < start + number) {
      console.log(accFormatElement(el));
      currIndex = i;
      currEl = el;
    }
  });
}
function accFormatElement(el) {
  let out = "";
  switch (el.role) {
    case "text":
      // don't prefix text elements
      break;
    case "heading":
      out = el.role + el.level;
      break;
    default:
      out = el.role;
      break;
  }
  out += ` : ${el.name}`;
  return out;
}
async function setup() {
  browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN,
  });

  page = await browser.newPage();
  page.setViewportSize({ width: 600, height: 400 });
  page.on("load", async function (p) {
    acts = await page.accessibility.snapshot();
    console.log(acts.name, " at ", p.url());
    console.log("page with ", acts.children.length, " elements");
    currIndex = 0;
    currEl = acts[currIndex];
    reportElements(currIndex, 2);
  });
}
async function goto(url) {
  await setup(); // ;
  try {
    await page.goto(url);
  } catch (e) {
    console.warn("goto error: ", e.message);
    return;
  }
}
