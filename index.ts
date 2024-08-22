import { App } from "@slack/bolt";

console.log("starting super spam!");

// Create a new instance of the Bolt app
const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Define the function to send a message to a thread
async function sendMessageToThread(
  channel: string,
  threadTs: string,
  message: string,
  announce?: boolean
) {
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_TOKEN,
      channel: channel,
      thread_ts: threadTs,
      text: message,
      reply_broadcast: announce,
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// Start the Bolt app
(async () => {
  console.log("⚡️ Bolt app is running!");
  let messagesSent = 0;

  // Define the loop to send messages continuously
  setInterval(async () => {
    if (messagesSent % 100 == 0) console.log("messages sent: ", messagesSent);

    const channel = "C06QV2T1P4G"; // Replace with your channel ID
    const threadTs = "1710818631.730789"; // Replace with your thread timestamp

    if (messagesSent % 1000 == 0 && messagesSent > 0) {
      // celebrate and send a message to the channel and thread with a annoucen proerty
      const message =
        "🎉 Celebrate! 🎉\nThis bot has sent: " +
        (messagesSent + 1) +
        " messages!";
      console.log(message);
      messagesSent++;
    }

    const message = "blaaaa: " + (messagesSent + 1);

    await sendMessageToThread(channel, threadTs, message);
    messagesSent++;
  }, 1100); // Send a message every 5 seconds
})();
