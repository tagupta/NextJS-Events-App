import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://root:root@cluster0.9fz2dvn.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, _collection, filter, sort) {
  const db = client.db();
  const collection = db.collection(_collection);
  const result = await collection.find(filter).sort(sort).toArray();

  return result;
}
