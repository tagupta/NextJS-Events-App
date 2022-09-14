function handler(req, res) {
  if (req.method === "POST") {
    const subscriptionEmail = req.body.subscriptionEmail;

    if (!subscriptionEmail || !subscriptionEmail.includes("@")) {
      res.status(422).json({ message: "Incorrect email address" });
      return;
    }
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
