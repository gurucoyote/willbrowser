import { chromium } from "playwright-chromium";

import Vorpal from "vorpal";
import grep from "vorpal-grep";
// https://github.com/sindresorhus/ansi-escapes
import ansiEscapes from "ansi-escapes";
const vorpal = Vorpal();
let browser, page;
async function setup() {
  browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN,
  });

  page = await browser.newPage();
  page.setViewportSize({ width: 600, height: 400 });

  // await browser.close();
}
async function run() {
  await setup();
  const res = await page.goto("https://ifconfig.io/ip");
  const body = await res.body();
  console.log("body", body.toString());
}
async function goto(url) {
  await setup(); // ;
  const res = await page.goto(url);
  const body = await res.body();
  console.log("body", body.toString());
}

vorpal.use(grep);

vorpal
  .mode("repl")
  .description("Enters the user into a REPL session.")
  .delimiter("repl:")
  .action(function (command, callback) {
    try {
      this.log(eval(command));
    } catch (e) {
      this.log(e);
    }
    callback();
  });
vorpal.command("clear", "clear the screen").action(function (args, callback) {
  process.stdout.write(ansiEscapes.eraseScreen);
  callback();
});
vorpal.command("goto <url>", "goto an url").action(function (args, callback) {
  this.log("going to " + args.url);
  goto(args.url).then(callback);
});
vorpal
  .command("run", "runs the default playwright action")
  .action(function (args, callback) {
    this.log("running now...");
    run().then(callback);
  });
vorpal.delimiter("will>").show();
