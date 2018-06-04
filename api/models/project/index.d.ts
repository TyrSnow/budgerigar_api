import { Document, Schema } from 'mongoose';
import PROJECT_AUTH from "../../constants/project.auth";

declare namespace ProjectModel {
  interface MemberMethods {
    set_auth(auth: PROJECT_AUTH)
  }

  interface Member extends MemberMethods, Schema {
    user_id: string
    auth: PROJECT_AUTH,
  }

  interface ProjectMethods {
    add_member(user_id: string, auth: PROJECT_AUTH)
    remove_member(user_id: string)
  }

  interface ProjectInfo {
    name: string
    desc: string
    open: boolean
  }

  interface Project extends ProjectMethods, ProjectInfo, Document {
    members: [Member]
  }
}
