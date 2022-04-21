import Koa from "koa";
import { Telegraf } from "telegraf";
import { getTweet } from "./twitter";

const token = process.env.TOKEN_BOT_TELEGRAM;
if (token === undefined) {
  throw new Error("TOKEN_BOT_TELEGRAM must be provided!");
}

const bot = new Telegraf(token);

bot.hears(
  /https?:\/\/twitter.com\/[0-9-a-zA-Z_]{1,20}\/status\/([0-9]*)/,
  async (ctx) => {
    ctx.reply(await getTweet(ctx.match[1]));
  }
);

bot.on("message", (ctx) => {
  ctx.reply("Hello");
});

bot.launch();

const app = new Koa();

export default app;