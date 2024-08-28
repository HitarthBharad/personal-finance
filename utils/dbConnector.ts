import { MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION_URI || '';
const options = {};

if (!process.env.MONGO_CONNECTION_URI) {
	throw new Error("Please add your Atlas MongoDB URI to .env.local");
}

let client = new MongoClient(uri, options);
let dbConnectorPromise = client.connect();

export default dbConnectorPromise;