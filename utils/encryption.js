// encrypt and decrypt are functions that use the crypto module to encrypt and decrypt the notificationToken field.

const crypto = require("crypto");
const env = require("dotenv").config().parsed;

const algorithm = "aes-256-cbc";
const key = env.ENCRYPTION_KEY;
const iv = env.ENCRYPTION_IV;

const encrypt = (text) => {
  console.log(key, iv);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (text) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
