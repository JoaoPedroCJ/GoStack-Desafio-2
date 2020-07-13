const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const validateRepository = require('./middlewares/validadeRepository')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/repositories/:id', validateRepository.validadeRepositoryId);

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const result = title
    ? repositories.filter(project => repositories.title.toLowerCase().includes(title.toLowerCase()))
    : repositories;

  return response.status(200).json(result);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: "Repository Not Found" });
  };

  const repository = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ message: "Repository Not Found" });
  };

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).send();
  }

  repositories[repositoryIndex].likes++;

  return response.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
