import axios from "axios";
import { PermissionGroup } from "../types/entity";
import { GetPermissionResponseBody } from "../types/response";
import store from "../store/store";
import { PermissionChangeRequest } from "../types/request";

class RoleService {
  async getUserPermissions(
    providerName: string,
    providerKey: string
  ): Promise<Array<PermissionGroup> | null> {
    try {
      const state = store.getState();
      const accessToken = `${state.auth.token_type} ${state.auth.access_token}`;
      const response = await axios.get<GetPermissionResponseBody>(
        `https://localhost:44378/api/permission-management/permissions?providerName=${providerName}&providerKey=${providerKey}`,
        {
          headers: {
            Authorization: accessToken,
            withCredentials: true,
          },
        }
      );
      console.log(response.data.groups);
      return response.data.groups;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updatePermissions(
    providerName: string,
    providerKey: string,
    permissions: PermissionChangeRequest
  ): Promise<void> {
    try {
      const state = store.getState();
      const accessToken = `${state.auth.token_type} ${state.auth.access_token}`;
      await axios.put(
        `https://localhost:44378/api/permission-management/permissions?providerName=${providerName}&providerKey=${providerKey}`,
        permissions,
        {
          headers: {
            Authorization: accessToken,
            withCredentials: true,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

export default new RoleService();
