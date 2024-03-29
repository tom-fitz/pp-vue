import api from "./../api";
import { User } from "./../User";
import { defineStore } from "pinia";

export const Get = {
  GetUser: "getUser",
};

export const Action = {
  RegisterUser: "registerUser",
};

export const useUserStore = defineStore("userStore", {
  state: () => ({
    errorMsg: {} as unknown,
    successMsg: "",
    loading: false,
    user: new User(),
    userList: [] as User[],
  }),
  getters: {
    [Get.GetUser]: (state) => state.user,
  },
  actions: {
    async registerUser(newUser: User): Promise<void> {
      this.resetMessages();
      this.loading = true;
      try {
        const returnedUser = await api.registerUser(newUser);
        newUser.id = returnedUser.uid;
        api.addUser(newUser);
      } catch (err) {
        this.errorMsg = err;
      } finally {
        this.loading = false;
      }
    },
    async loginUser(user: User): Promise<string> {
      this.resetMessages();
      this.loading = true;
      try {
        const returnedUser = await api.loginUser(user);
        this.successMsg = `Successfully logged in user ${returnedUser.email}`;
        return returnedUser.uid;
      } catch (err) {
        this.errorMsg = err;
        return "";
      } finally {
        this.loading = false;
      }
    },
    async listUsers(): Promise<void> {
      this.resetMessages();
      this.loading = true;
      try {
        const users = await api.listUsers();
        const ls: User[] = [];
        users.forEach((u: User) => {
          if (u.id !== this.user.id) {
            ls.push(u);
          }
        })
        this.userList = [...ls];
      } catch (err) {
        this.errorMsg = err;
      } finally {
        this.loading = false;
      }
    },
    async setCurrentUser(userId: string): Promise<void> {
      try {
        const storedUser = await api.getUser(userId);
        this.user = storedUser;
      } catch (err) {
        this.errorMsg = err;
      } finally {
        this.loading = false;
      }
    },
    resetMessages(): void {
      (this.successMsg = ""), (this.errorMsg = "");
    },
    async setErrorMessage(msg: string): Promise<void> {
      this.resetMessages();
      this.errorMsg = msg;
    },
    signOutUser(user: User): void {
      this.resetMessages();
      this.loading = true;
      try {
        api.signOutUser();
        this.user = new User();
        this.successMsg = `Successfully logged out user ${user.firstName}`;
      } catch (err) {
        this.errorMsg = err;
      } finally {
        this.loading = false;
      }
    },
    updateUser(updatedUser: User): void {
      this.resetMessages();
      this.loading = true;
      try {
        api.updateUser(updatedUser);
        this.user === updatedUser;
        this.successMsg = `Successfully updated user ${updatedUser.firstName}`;
      } catch (err) {
        this.errorMsg = err;
      } finally {
        this.loading = false;
      }
    }
  },
});
