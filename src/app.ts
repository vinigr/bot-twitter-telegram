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
    const urlVideo = await getTweet(ctx.match[1]);

    if (!urlVideo) {
      return ctx.reply("This tweet does not have a video");
    }

    ctx.replyWithVideo(urlVideo, {
      reply_to_message_id: ctx.message.message_id,
    });
  }
);

bot.on("message", (ctx) => {
  ctx.reply("Hello");
});

bot.launch();

const app = new Koa();

export default app;
