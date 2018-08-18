import { controller, route, use } from "../core";
import ProjectService from "../service/project";
import { auth } from "../middleware/auth";
import { SUCCESS, ERROR } from "../helper/response";
import { validate } from "../middleware/validator";
import projectSchemas from "../schemas/project.schemas";
import PROJECT_AUTH from "../constants/project.auth";
import { AUTH_TYPE } from "../constants/auth";

@controller({
  path: '/projects',
})
class ProjectController {
  constructor(
    private projectService: ProjectService,
  ) {}

  @route('/', 'post')
  @use(auth(AUTH_TYPE.USER))
  @use(validate(projectSchemas.create))
  create(req, res) {
    const { name, desc, open } = req.body;
    const { _id } = req.user;

    this.projectService.create(_id, name, desc, open).then(
      SUCCESS(req, res),
    ).catch(
      ERROR(req, res),
    );
  }

  @route('/:project_id', 'get')
  @use(auth(AUTH_TYPE.USER))
  get_one_detail(req, res) {
    const { project_id } = req.params;
    const { _id } = req.user;

    this.projectService.valid_user_auth(project_id, _id, PROJECT_AUTH.NORMAL).then(
      (project) => {
        return this.projectService.get_selective_detail(project);
      }
    ).then(
      SUCCESS(req, res),
    ).catch(
      ERROR(req, res),
    );
  }
}

export default ProjectController;
