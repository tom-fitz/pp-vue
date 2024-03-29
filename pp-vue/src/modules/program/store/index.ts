import { Program, Workout } from '../Program'
import { defineStore } from 'pinia'
import api from '../api'

export const useProgramStore = defineStore("programStore", {
    state: () => ({
        errorMsg: {} as unknown,
        successMsg: '',
        loading: false,
        programs: [] as Program[],
        templates: [] as Program[],
        workouts: [] as Workout[],
        currentProgram: new Program() as Program,
    }),
    getters: {
        getPrograms: (state): Program[] => state.programs,
    },
    actions: {
        getById (id: string): Program {
            return this.programs.find((p: Program) => p.id === id) ?? new Program();
        },
        async getAllPrograms (): Promise<void> {
            this.loading = true;
            try {
                this.programs = [...await api.getAllPrograms()];
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
        },
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
        async saveProgram (program: Program): Promise<void> {
            this.loading = true;
            try {
                await api.saveProgram(program);
                this.successMsg = `Successfully updated program ${program.id}`
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
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
        async getProgramById (id: string): Promise<Program> {
            this.loading = true;
            try {
                const program = await api.getProgramById(id);
                this.currentProgram = program;
                this.programs.push(program);
                this.programs = [...this.programs];
                return program;
            } catch (err) {
                this.errorMsg = err;
                return new Program();
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
        async saveWorkout (workout: Workout): Promise<string> {
            this.loading = true;
            try {
                const wid = await api.saveWorkout(workout);
                workout.id = wid;
                this.workouts = [...this.workouts, workout];
                workout.programIds.forEach((id: string) => {
                    this.programs.forEach((p: Program) => {
                        if (p.id === id) {
                            p.weeks[workout.weekIndex].days[workout.dayIndex].workout = workout;
                        }
                    });
                });
                return wid;
            } catch (err) {
                this.errorMsg = err;
            } finally {
                this.loading = false;
            }
            return '';
        }
    }
});