import Project from '../models/Project';

class ProjectController {
  async store(req, res) {
    const { title, description, tasks } = await Project.create(req.body);

    return res.json({
      title,
      description,
      tasks,
    });
  }
}

export default new ProjectController();
