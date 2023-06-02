import { defineStore } from 'pinia';
import { User } from '../User';

export const Get = {
    GetCurrentUser: 'getCurrentUser'
}

export const useUserStore = defineStore('user', {
    state: () => ({
        loading: false,
        errorMsg: {} as unknown,
        successMsg: "" as string,
        currentUser: {} as User,
    }),
    getters: {
        [Get.GetCurrentUser]: (state) => state.currentUser
    },
    actions: {
        async loginUser(user: User): Promise<void> {
            this.loading = true;
            try {
                // call api layer here and set the returned user tokens and data.
                this.successMsg = `Succesfully logged in user ${user.email}`
            } finally {
                this.loading = false;
            }
        }
    }
})