import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helper/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }

  if (req.method === "POST") {
    //Server side validation is must
    const { email, name, comment } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input values" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      comment,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const comments = await getAllDocuments(
        client,
        "comments",
        { eventId: eventId },
        { _id: -1 }
      );
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }
  client.close();
}
export default handler;
