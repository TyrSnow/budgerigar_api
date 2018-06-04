import { controller, route } from "../core/injector";
import ProjectService from "../service/project";
import { auth, AUTH_TYPE } from "../intercepror/auth";
import { SUCCESS, ERROR } from "../core/response";
import validator from "../intercepror/validator";
import projectSchemas from "../schemas/project.schemas";

@controller({
  path: '/projects',
})
class ProjectController {
  constructor(
    private projectService: ProjectService,
  ) {}

  @route('/', 'post')
  @auth(AUTH_TYPE.USER)
  @validator(projectSchemas.create)
  create(req, res) {
    const { name, desc, open } = req.body;
    const { _id } = req.user;

    this.projectService.create(_id, name, desc, open).then(
      SUCCESS(req, res),
    ).catch(
      ERROR(req, res),
    );
  }
}

export default ProjectController;
