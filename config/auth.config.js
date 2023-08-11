module.exports = {
  jwt: {
    secret: "lau-event-secret-key",
    expiration: 60 * 15 ,           // 15 min 
  },
  refresh: {
    secret: "lau-event-secret-key-refresh",
    expiration: 60 * 60 * 24 * 30, // 30 days
  }
};