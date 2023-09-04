const { User } = require("../models");
const { Expo } = require("expo-server-sdk");

// Helper function to get user notification tokens
const getNotificationTokens = async () => {
  try {
    const users = await User.findAll({
      attributes: ["notificationToken"],
    });
    console.log("users: ", users);
    return users
      .map((user) => user.notificationToken)
      .filter((token) => token !== null);
  } catch (error) {
    console.error("Failed to fetch user tokens:", error);
    return [];
  }
};

// Helper function to create messages
const createMessages = (tokens, event) => {
  const messages = [];
  for (const pushToken of tokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      sound: "default",
      title: "New Event",
      body: `Check out the new event: ${event.dataValues.eventName}`,
      data: { eventId: event.dataValues.id },
    });
  }
  return messages;
};

// Helper function to send messages
const sendMessages = async (messages, expo) => {
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error("Failed to send push notification chunk:", error);
    }
  }
  return tickets;
};

// Helper function to handle receipts
// Helper function to handle receipts and nullify invalid tokens
const handleReceipts = async (tickets, expo) => {
  const receiptIds = tickets.map((ticket) => ticket.id).filter(Boolean);
  console.log("receiptIds: ", receiptIds);
  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  console.log("receiptIdChunks: ", receiptIdChunks);
  for (const chunk of receiptIdChunks) {
    try {
      const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log("receipts: ", receipts);
      for (let receiptId in receipts) {
        const { status, details } = receipts[receiptId];

        if (status === "error") {
          if (
            details &&
            (details.error === "DeviceNotRegistered" ||
              details.error === "InvalidCredentials")
          ) {
            // Nullify the token in your database
            await User.update(
              { notificationToken: null },
              { where: { notificationToken: receiptId } }
            );
            console.error(
              `Token ${receiptId} set to null in db, details: ${details}`
            );
          }
        }
      }
    } catch (error) {
      console.error("Failed to get receipts:", error);
    }
  }
};

// Main function to send notifications to all users
const sendNotificationToAllUsers = async (event) => {
  console.log("Hi Elio");
  const expo = new Expo();
  console.log("Initialized Expo");

  // Get notification tokens
  const tokens = await getNotificationTokens();

  console.log("tokens: ", tokens);

  // Create messages
  const messages = createMessages(tokens, event);

  console.log("messages: ", messages);

  // Send messages and get tickets
  const tickets = await sendMessages(messages, expo);

  console.log("tickets: ", tickets);

  // Handle receipts
  await handleReceipts(tickets, expo);

  console.log("Done");
};

module.exports = sendNotificationToAllUsers;
