// src/lib/mongodb.js
import { MongoClient } from "mongodb";
import 'dotenv/config';


const uri = process.env.MONGODB_URI; // sua URI do MongoDB Atlas, coloque no .env.local
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Por favor defina a variável MONGODB_URI no .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Em dev, usamos uma variável global para evitar múltiplas conexões no hot reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Em produção, conexão simples
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
