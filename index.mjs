import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
let TODO = [];

app.post("/todo", (req, res) => {
  const body = req.body;
  if (body.todo) {
    TODO.push({
      todo: body.todo,
      id: String(new Date().getTime()),
    });
    res
      .send({
        message: "Add Todo Successfully",
        data: body.todo,
      })
      .status(200);
  } else {
    res
      .send({
        message: "Todo is not added",
      })
      .status(404);
  }
});

app.get("/todos", (req, res) => {
  res
    .send({
      message: "Got all data successfully",
      data: TODO,
    })
    .status(200);
});

app.delete("/todo/:id", (req, res) => {
  const id = req.params.id;

  let isFound = false;
  for (let i = 0; i < TODO.length; i++) {
    if (TODO[i].id === id) {
      TODO.splice(i, 1);
      res.send({
        message: "product deleted successfully",
      });
      isFound = true;
      break;
    }
  }
  if (isFound === false) {
    res.status(404);
    res.send({
      message: "delete fail: product not found",
    });
  }
});

app.delete("/todos", (req, res) => {
  TODO = [];
  res
    .send({
      message: "Deleted  all data successfully",
      data: TODO,
    })
    .status(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
