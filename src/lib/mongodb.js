// src/lib/mongodb.js
import { MongoClient } from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  // tlsAllowInvalidCertificates: true, // só usar para testes locais, desative em produção
};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Por favor defina a variável MONGODB_URI no .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Em dev, usamos variável global para evitar múltiplas conexões no hot reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Em produção, conexão normal
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
