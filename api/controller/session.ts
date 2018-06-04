import { controller, route } from "../core/injector";
import UserService from "../service/user";
import TokenService from "../service/token";
import validator from "../intercepror/validator";
import UserSchemas from "../schemas/user.schemas";
import CODE from "../constants/code";
import { SUCCESS, ERROR } from "../core/response";
import AUTH_TYPE from "../constants/auth";
import { auth } from "../intercepror/auth";
import ProjectService from "../service/project";


@controller({
  path: '/session'
})
class SessionController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private projectService: ProjectService,
  ) {}

  @route('/', 'post')
  @validator(UserSchemas.login)
  login(req, res) {
    let {
      user, password, remember,
    } = req.body;

    this.userService.find_user(user).then(
      _user => {
        if (_user.block) {
          return Promise.reject(CODE.ACCOUNT_HAS_BLOCKED);
        }
        return this.userService.valid_password(_user, user, password).then(() => {
          return Promise.resolve(this.tokenService.sign({
            _id: _user._id,
            name: _user.name,
            email: _user.email,
            phone: _user.phone,
            head: _user.head,
            auth: _user.auth,
            remember: remember,
          }, remember ? '30d' : '1d'))
        });
      }
    ).then(
      SUCCESS(req, res),
    ).catch(
      ERROR(req, res),
    );
  }

  @route('/projects', 'get')
  @auth(AUTH_TYPE.USER)
  list_user_projects(req, res) {
    const { _id } = req.user;
    const { current, size } = req.query;

    this.projectService.find_projects_by_owner(_id, size, current).then(
      SUCCESS(req, res),
    ).catch(
      ERROR(req, res),
    );
  }

  @route('/', 'get')
  @auth(AUTH_TYPE.USER)
  solve_auth(req, res) {
    let { user } = req;
    let { iat, exp, ...other } = user;
    console.log(user);
    this.userService.find_user_by_id(user._id).then(
      _user => {
        if (_user.block) {
          return Promise.reject(CODE.ACCOUNT_HAS_BLOCKED);
        }
        if (other.remember) {
          return Promise.resolve(other);
        }
        return Promise.resolve(this.tokenService.sign(other));
      }
    ).then(
      SUCCESS(req, res),
    ).catch(
      ERROR(req, res),
    );
  }

}

export default SessionController;
