import { Document, Schema, Types } from 'mongoose';
import PROJECT_AUTH from "../../constants/project.auth";

declare namespace ProjectModel {
  interface MemberMethods {
    set_auth(auth: PROJECT_AUTH)
  }
  
  interface Member extends MemberMethods, Document {
    auth: PROJECT_AUTH,
  }

  interface ProjectMethods {
    add_member(user_id: string, auth: PROJECT_AUTH): Promise<Project>
    remove_member(user_id: string): Promise<Project>
    valid_auth(required: PROJECT_AUTH, user_id: string): boolean
  }

  interface ProjectInfo {
    name: string
    desc: string
    open: boolean
  }

  interface Project extends ProjectMethods, ProjectInfo, Document {
    members: Types.DocumentArray<Member>
  }
}
