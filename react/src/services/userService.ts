import axios from "axios";
import { ResponseBody, User } from "../types/entity";
import store from "../store/store";

class UserService {
  async getUserList(): Promise<Array<User> | null> {
    try {
      const state = store.getState();
      const accessToken = `${state.auth.token_type} ${state.auth.access_token}`;
      const response = await axios.get<ResponseBody>(
        "https://localhost:44378/api/identity/users",
        {
          headers: {
            Authorization: accessToken,
            withCredentials: true,
          },
        }
      );
      return response.data.items as Array<User>;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default new UserService();
