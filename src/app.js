const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
    const repository = { id: uuid(), title: request.body.title, url: request.body.url, techs: request.body.techs, likes: 0 }
    repositories.push(repository)
    return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
    const RepoIndex = repositories.findIndex(repo => repo.id == request.params.id)

    if (RepoIndex < 0) {
        return response.status(400).json({ error: "Repository not found." })
    }

    const updatedRepo = {...repositories[RepoIndex], title: request.body.title, url: request.body.url, techs: request.body.techs }

    repositories[RepoIndex] = updatedRepo
    return response.json(updatedRepo)

});

app.delete("/repositories/:id", (request, response) => {
    const RepoIndex = repositories.findIndex(repo => repo.id == request.params.id)

    if (RepoIndex < 0) {
        return response.status(400).json({ error: "Repository not found." })
    }

    repositories.splice(RepoIndex, 1)

    return response.send(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
    const RepoIndex = repositories.findIndex(repo => repo.id == request.params.id)

    if (RepoIndex < 0) {
        return response.status(400).json({ error: "Repository not found." })
    }

    const updatedRepo = {...repositories[RepoIndex], likes: repositories[RepoIndex].likes + 1 }
    repositories[RepoIndex] = updatedRepo
    return response.json(updatedRepo)

});

module.exports = app;