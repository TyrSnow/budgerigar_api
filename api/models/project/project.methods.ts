import PROJECT_AUTH from "../../constants/project.auth";

export function valid_auth(required: PROJECT_AUTH, user_id: string) {
  let member = this.members.id(user_id);
  if (member) {
    if (member.auth >= required) {
      return true;
    }
  }
  return false;
}

export function add_member(user_id: string, auth: PROJECT_AUTH = PROJECT_AUTH.NORMAL) {
  let member = this.members.id(user_id);
  if (!member) {
    this.members.push({
      _id: user_id,
      auth,
    });
  
    this.save();
  }
}

export function remove_member (user_id: string) {
  this.members.id(user_id).remove();
  this.save();
}
