const { MongoClient } = require("mongodb");
require("dotenv").config();

async function testConnection() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is not set in .env");
    process.exit(1);
  }

  console.log("🔄 Connecting to:", uri.replace(/:([^@]+)@/, ":****@")); // hide password

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ Connection failed:", err.message);

    if (err.message.includes("ENOTFOUND")) {
      console.log("→ Check your cluster URL in the connection string");
    } else if (err.message.includes("Authentication failed")) {
      console.log("→ Wrong username or password");
    } else if (err.message.includes("IP")) {
      console.log("→ Your IP is not whitelisted in Atlas Network Access");
    }
  } finally {
    await client.close();
  }
}

testConnection();
