import { TwitterApi } from "twitter-api-v2";

// Instanciate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi(process.env.APP_USER_TOKEN_TWITTER);

const roClient = twitterClient.readOnly;

export const getTweet = async (tweetId) => {
  try {
    // Play with the built in methods
    const tweet = await roClient.v1.singleTweet(tweetId, {
      include_entities: true,
      include_card_uri: true,
    });

    const mediaUrl =
      tweet.extended_entities?.media?.[0].video_info.variants.find(
        (file) => file.content_type == "video/mp4"
      );

    return mediaUrl?.url;

    // const quality = mediaUrl.map((file) => {
    //   return file.url.includes("amplify_video")
    //     ? file.url.split("/")[6]
    //     : file.url.split("/")[7];
    // });
  } catch (error) {
    return null;
  }
};
