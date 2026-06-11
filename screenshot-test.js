const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("console: " + m.text());
  });

  await page.goto("http://127.0.0.1:4173/airplane-simulator.html", {
    waitUntil: "networkidle0"
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: "/tmp/sim-start.png" });

  // 开始游戏
  await page.click("#startButton");
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: "/tmp/sim-flying.png" });

  // 按住右转 + 拉升飞一会儿
  await page.keyboard.down("ArrowRight");
  await new Promise((r) => setTimeout(r, 1200));
  await page.keyboard.up("ArrowRight");
  await page.keyboard.down("ArrowUp");
  await new Promise((r) => setTimeout(r, 900));
  await page.keyboard.up("ArrowUp");
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: "/tmp/sim-turning.png" });

  // 俯冲撞地，验证结算界面
  await page.keyboard.down("ArrowDown");
  await new Promise((r) => setTimeout(r, 2500));
  await page.keyboard.up("ArrowDown");
  await new Promise((r) => setTimeout(r, 4000));
  await page.screenshot({ path: "/tmp/sim-end.png" });

  const overlayVisible = await page.$eval(
    "#resultOverlay",
    (el) => !el.classList.contains("hidden")
  );

  console.log("result overlay visible:", overlayVisible);
  console.log("errors:", errors.length ? errors : "none");
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
