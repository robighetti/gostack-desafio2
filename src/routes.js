const express = require('express')

const routes = express.Router();

const repositories = [];

routes.get("/repositories", (request, response) => {
  // TODO
});

routes.post("/repositories", (request, response) => {
  // TODO
});

routes.put("/repositories/:id", (request, response) => {
  // TODO
});

routes.delete("/repositories/:id", (request, response) => {
  // TODO
});

routes.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = routes;