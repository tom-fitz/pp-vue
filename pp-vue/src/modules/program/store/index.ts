import { Program } from '../Program'
import { defineStore } from 'pinia'
import api from '../api'

export const useProgramStore = defineStore("programStore", {
    state: () => ({
        errorMsg: {} as unknown,
        successMsg: '',
        loading: false,
        programs: [] as Program[],
        templates: [] as Program[],
    }),
    getters: {
        getPrograms: (state) => state.programs,
    },
    actions: {
        async createProgramFS (program: Program): Promise<string> {
            this.loading = true;
            try {
                const id = await api.createProgramFS(program);
                program.id = id;
                this.programs.push(program);
                this.programs = [...this.programs];
                return id;
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
            return '';
        },
        async createProgram (program: Program): Promise<string> {
            this.loading = true;
            try {
                const id = await api.createProgram(program);
                program.id = id;
                this.programs.push(program);
                this.programs = [...this.programs];
                return id;
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
            return '';
        },
        async getProgramsByUID (uid: string): Promise<void> {
            this.loading = true;
            try {
                const programs = await api.getProgramsByUID(uid);
                this.programs = [...programs];
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
        },
        async getProgramById (id: string): Promise<void> {
            this.loading = true;
            try {
                const program = await api.getProgramById(id);
                this.programs.push(program);
                this.programs = [...this.programs];
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
        },
        async createProgramTemplate (program: Program): Promise<void> {
            this.loading = true;
            try {
                await api.createProgramTemplate(program)
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
        },
        async getProgramTemplates (): Promise<void> {
            this.loading = true;
            try {
                const templates = await api.getProgramTemplates();
                this.templates = [...templates];
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
        },
    }
});