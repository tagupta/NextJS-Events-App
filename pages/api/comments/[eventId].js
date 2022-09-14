function handler(req, res) {
  const eventId = req.query.eventId;
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
      return;
    }

    const resBody = {
      id: new Date().toISOString(),
      email,
      name,
      comment,
    };
    res.status(201).json({ message: "Added comment", comment: resBody });
  }

  if (req.method === "GET") {
    const dummyResponse = [
      { id: 1, comment: "I am a dummy comment", name: "Website Owner" },
      { id: 2, comment: "I am a dummy comment", name: "Website Owner" },
      { id: 3, comment: "I am a dummy comment", name: "Website Owner" },
      { id: 4, comment: "I am a dummy comment", name: "Website Owner" },
    ];
    res.status(200).json({ comments: dummyResponse });
  }
}
export default handler;
