// Import MongoDB Client
import { MongoClient, ServerApiVersion } from "mongodb";

// Check for environment variable
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// Connection options
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development to prevent multiple connections
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
    console.log("🔗 Connecting to MongoDB in development mode...");
  }
  client = globalWithMongo._mongoClient;
} else {
  // No global variable in production
  client = new MongoClient(uri, options);
  console.log("🔗 Connecting to MongoDB in production mode...");
}

// Add a log for successful connection
client
  .connect()
  .then(() => {
    const dbName = uri.split("/").pop()?.split("?")[0]; // Extract database name from URI
    console.log(`✅ Successfully connected to MongoDB. Database: ${dbName}`);
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
  });

// Export the client
export default client;
