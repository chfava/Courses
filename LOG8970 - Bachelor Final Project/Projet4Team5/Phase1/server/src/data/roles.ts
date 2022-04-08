/*
To populate permissions, remove the auth and permission guard on the role controller and the populate route.
Then make a POST request to the /roles/populate endpoint. The database you are using should get populated with
the rolesData. Make sure the user you are connected at has the right role as well.
 */

export interface RolesData {
  roles: Array<{
    name: string;
    permissions: string[];
  }>;
}

export const rolesData: RolesData = {
  roles: [
    {
      name: "super-admin",
      permissions: [
        "meditrinae-api:permissions:create",
        "meditrinae-api:permissions:update",
        "meditrinae-api:roles:create",
        "meditrinae-api:users:create",
        "meditrinae-api:users:get",
        "meditrinae-api:users:update-password-self",
        "meditrinae-api:users:delete",
        "meditrinae-api:clinic:create",
        "meditrinae-api:clinic:get",
        "meditrinae-api:clinic:update",
        "meditrinae-api:secretaries:create",
        "meditrinae-api:secretaries:get",
        "meditrinae-api:secretaries:update",
        "meditrinae-api:secretaries:delete",
        "meditrinae-api:practicians:create",
        "meditrinae-api:practicians:get",
        "meditrinae-api:practicians:update",
        "meditrinae-api:practicians:delete",
        "meditrinae-api:admins:create",
        "meditrinae-api:admins:get",
        "meditrinae-api:admins:update",
        "meditrinae-api:admins:delete",
        "meditrinae-api:ai:get",
        "meditrinae-api:ai:predict",
        "meditrinae-api:patients:get",
        "meditrinae-api:patients:create",
        "meditrinae-api:patients:delete",
        "meditrinae-api:patients:update",
        "meditrinae-api:medical-exams:create",
        "meditrinae-api:medical-exams:update",
        "meditrinae-api:medical-exams:get",

        // for testing purposes
        "meditrinae-api:exam-results:create",
        "meditrinae-api:exam-results:update",
        "meditrinae-api:exam-results:get",

        "meditrinae-api:users:update-password-other",
        "meditrinae-api:ai:train",
        "meditrinae-api:forms-templates:create",
        "meditrinae-api:forms-templates:get"
      ]
    },
    {
      name: "admin",
      permissions: [
        "meditrinae-api:users:create",
        "meditrinae-api:users:get",
        "meditrinae-api:users:update-password-self",
        "meditrinae-api:users:delete",
        "meditrinae-api:clinic:get",
        "meditrinae-api:clinic:update",
        "meditrinae-api:secretaries:create",
        "meditrinae-api:secretaries:get",
        "meditrinae-api:secretaries:update",
        "meditrinae-api:secretaries:delete",
        "meditrinae-api:practicians:create",
        "meditrinae-api:practicians:get",
        "meditrinae-api:practicians:update",
        "meditrinae-api:practicians:delete",
        "meditrinae-api:admins:create",
        "meditrinae-api:admins:get",
        "meditrinae-api:admins:update",
        "meditrinae-api:admins:delete",
        "meditrinae-api:users:update-password-other"
      ]
    },
    {
      name: "practician",
      permissions: [
        "meditrinae-api:decision-tree:get",
        "meditrinae-api:forms-results:create",
        "meditrinae-api:forms-results:update",
        "meditrinae-api:forms-results:get",
        "meditrinae-api:medical-exams:create",
        "meditrinae-api:medical-exams:update",
        "meditrinae-api:medical-exams:get",
        "meditrinae-api:exam-results:create",
        "meditrinae-api:exam-results:update",
        "meditrinae-api:exam-results:get",
        "meditrinae-api:patients:get",
        "meditrinae-api:patients:create",
        "meditrinae-api:patients:delete",
        "meditrinae-api:patients:update",
        "meditrinae-api:users:get",
        "meditrinae-api:users:update-password-self",
        "meditrinae-api:forms-templates:get",
        "meditrinae-api:clinic:get",
        "meditrinae-api:practicians:get",
        "meditrinae-api:practicians:update",
        "meditrinae-api:ai:predict"
      ]
    },
    {
      name: "secretary",
      permissions: [
        "meditrinae-api:forms-results:get",
        "meditrinae-api:forms-results:update",
        "meditrinae-api:medical-exams:create",
        "meditrinae-api:medical-exams:update",
        "meditrinae-api:medical-exams:get",
        "meditrinae-api:exam-results:update",
        "meditrinae-api:exam-results:get",
        "meditrinae-api:patients:get",
        "meditrinae-api:patients:create",
        "meditrinae-api:patients:delete",
        "meditrinae-api:patients:update",
        "meditrinae-api:users:get",
        "meditrinae-api:users:update-password-self",
        "meditrinae-api:forms-templates:get",
        "meditrinae-api:clinic:get",
        "meditrinae-api:secretaries:get",
        "meditrinae-api:secretaries:update",
        "meditrinae-api:practicians:get"
      ]
    }
  ]
};
