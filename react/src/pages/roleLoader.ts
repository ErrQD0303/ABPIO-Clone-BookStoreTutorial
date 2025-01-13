import { redirect } from "react-router-dom";
import roleService from "../services/roleService";
import userService from "../services/userService";
import { UserWithPermissions } from "../types/entity";

const loader = async () => {
  const users = await userService.getUserList();
  console.log(users);
  if (!users) return redirect("/");

  const usersWithPermissions = await Promise.all(
    users.map(
      async (user) =>
        ({
          ...user,
          groups: await roleService.getUserPermissions("U", user.id),
        } as UserWithPermissions)
    )
  );
  return {
    users: usersWithPermissions,
  };
};

export default loader;
