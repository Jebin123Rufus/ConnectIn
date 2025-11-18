const { MongoClient } = require('mongodb');
require('dotenv').config({path: "./config.env"});

async function main() {
    const Db = process.env.MONGODB_URI;
    const client = new MongoClient(Db);

    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
    }
}

main()