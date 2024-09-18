import express from "express";

const app = new express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(req.rawHeaders)
  res.send("<h1>Hello World</h1>")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})