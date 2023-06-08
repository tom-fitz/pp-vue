import { Program } from '../Program'
import { defineStore } from 'pinia'

export const Get = {
    GetPrograms: 'getPrograms'
}

export const useProgramStore = defineStore("programStore", {
    state: () => ({
        errorMsg: {} as unknown,
        successMsg: '',
        loading: false,
        programs: [] as Program[]
    }),
    getters: {
        [Get.GetPrograms]: (state) => state.programs,
    }
});