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

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({error: 'Index not found'});
  }

  repositories[repoIndex] = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes,
  }

  return response.json(repositories[repoIndex]);
});

routes.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;  

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({error: 'index not found'});
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

routes.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;  

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({error: 'Index not found'});
  }

  repositories[repoIndex].likes++;

  return response.status(200).json(repositories[repoIndex]);
});

module.exports = routes;