const { Router } = require('express');
const { uuid } = require("uuidv4");

const routes = Router();

const repositories = [];

routes.get("/repositories", (request, response) => {
  return response.json(repositories);


});

routes.post("/repositories", (request, response) => {
  const { title, url, techs, likes = 0 } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  }

  repositories.push(repository);

  return response.json(repository);
});

routes.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  repositories.map(repo => {
    if (repo.id === id) {
      repo.title = title,
      repo.url = url,
      repo.techs = techs
    }
  })

  return response.json(repositories);
});

routes.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;  

  repositories.map((repo, index) => {
    if (repo.id === id) {
      repositories.splice(index)
    }
  })

  return response.json(repositories);
});

routes.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;  

  repositories.map(repo => {
    if (repo.id === id) {
      repo.likes ++;
    }
  })

  return response.json(repositories);
});

module.exports = routes;