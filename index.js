import { selectors, chromium } from "playwright-chromium";
import { selectorScript } from "./role-selector/dist/playwright.js";

import Vorpal from "vorpal";
// https://github.com/sindresorhus/ansi-escapes
import ansiEscapes from "ansi-escapes";
// setup the role-selector
selectors.register("role", selectorScript, { contentScript: true });
const vorpal = Vorpal();
let browser, page, acts, currIndex, currEl;
let url = process.argv[2];
if (url) {
  await goto(url);
}

vorpal
  .mode("repl") //
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
  .command("goto <url>", "goto url") //
  .action(function (args, callback) {
    this.log("going to " + args.url);
    goto(args.url).then(() => {
      callback();
    });
  });
vorpal
  .command(
    "click [nth]",
    "click the [nth] element, or the current if no number is selected"
  )
  .action(async function (args, callback) {
    if (args.nth) currIndex = args.nth;
    const el = acts.children[currIndex];
    this.log("clicking", accFormatElement(el));
    try {
      await getLocator(el).click({ timeout: 2000 });
    } catch (e) {
      this.log("click error", e.message);
    }
    callback();
  });
vorpal
  .command("type [text]", "type into current element if possible.")
  .action(async function (args, callback) {
    const el = acts.children[currIndex];
    this.log("typing into", accFormatElement(el));
    try {
      await getLocator(el).type(args.text, { timeout: 2000 });
    } catch (e) {
      this.log("click error", e.message);
    }
    callback();
  });
vorpal
  .command("next [n]", "next [n] elemen(s)t in accessibilty tree")
  .action(function (args, callback) {
    reportElements(null, args.n || 1);
    callback();
  });
vorpal
  .command("prev [n]", "previous [n] element(s) in accessibilty tree")
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
      console.log(i, accFormatElement(el));
      currIndex = i;
      currEl = getLocator(el);
    }
  });
}
function getLocator(el) {
  // const userNameInput = page.locator('role=textbox[name="User Name"]');
  return page.locator(`role=${el.role}[name="${el.name}"]`);
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
    currIndex = 0;
    if (acts.children) {
      console.log("page with ", acts.children.length, " elements");
      reportElements(currIndex, 2);
    }
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
