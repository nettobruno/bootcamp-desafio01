const express = require('express');

const app = express();

app.use(express.json());

app.listen(3333);


const projects = [];
let count = 0;

function checkidExists(req, res, next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if(!project) {
    return res.status(400).json({ error: 'ID not found' });
  }

  return next();
}

// Counts the number of requests
function countReq(req, res, next){
  count++;
  console.log(`Requests: ${count}`);
  return next();
}

app.use(countReq);

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: [],
  };

  projects.push(project);

  return res.json(project);
});

app.get('/projects', (req, res) => {
  if(projects == ''){
    return res.json({ message: 'No projects have been created' });
  }

  return res.json(projects);
});

app.put('/projects/:id', checkidExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

app.delete('/projects/:id', checkidExists, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id == id);

  projects.splice(project, 1);

  return res.json('Project deleted successfully');
});

app.post('/projects/:id/tasks', checkidExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});