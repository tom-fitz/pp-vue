import { Program, Workout } from "./Program";
import { 
    getDatabase, 
    ref, 
    set, 
    child, 
    push,
    get
} from 'firebase/database';

interface IApi {
    createProgram: (program: Program) => Promise<string>;
    createProgramFS: (program: Program) => Promise<string>;
    getProgramsByUID: (uid: string) => Promise<Program[]>;
    createProgramTemplate: (program: Program) => Promise<void>;
    getProgramTemplates: () => Promise<Program[]>;
    getProgramById: (id: string) => Promise<Program>;
    saveProgram: (program: Program) => Promise<void>;
    saveWorkout: (workout: Workout) => Promise<string>;
}

const createProgram = async (program: Program): Promise<string> => {
    const db = getDatabase();
    const newPostKey = push(child(ref(db), 'programs')).key;
    program.daysCompleted = Object.assign({}, program.daysCompleted);
    await set(ref(db, `programs/${program.uid}/${newPostKey}`), Object.assign({}, program));
    return newPostKey ?? '';
};

const createProgramFS = async (program: Program): Promise<string> => {
    const db = getDatabase();
    const newPostKey = push(child(ref(db), 'programs')).key;
    program.id = newPostKey ?? '';
    await set(ref(db, `programs/${newPostKey}`), Object.assign({}, program));
    return newPostKey ?? '';
}

const saveProgram = async (program: Program): Promise<void> => {
    const db = getDatabase();
    await set(ref(db, `programs/${program.id}`), Object.assign({}, program));
}

const getProgramsByUID = async (uid: string): Promise<Program[]> => {
    const dbRef = ref(getDatabase(), `/programs/${uid}/`);
    const programs: Program[] = [];
    const snapshot = await get(dbRef);
    const prgms = snapshot.val();
    Object.keys(prgms).forEach((key: string) => {
        prgms[key].id = key;
        programs.push(prgms[key]);
    });
    return programs;
}

const getProgramById = async (id: string): Promise<Program> => {
    const dbRef = ref(getDatabase(), `/programs/${id}`);
    const snapshot = await get(dbRef);
    return snapshot.val();
}

const createProgramTemplate = async (program: Program): Promise<void> => {
    const db = getDatabase();
    const newPostKey = push(child(ref(db), 'templates')).key;
    program.daysCompleted = Object.assign({}, program.daysCompleted);
    await set(ref(db, `templates/${newPostKey}`), Object.assign({}, program))
}

const getProgramTemplates = async (): Promise<Program[]> => {
    const dbRef = ref(getDatabase(), `/templates`);
    const templates: Program[] = [];
    const snapshot = (await get(dbRef)).val();
    Object.keys(snapshot).forEach((key: string) => {
        snapshot[key].id = key;
        templates.push(snapshot[key]);
    });
    return templates;
}

const saveWorkout = async (workout: Workout): Promise<string> => {
    const db = getDatabase();
    const newPostKey = push(child(ref(db), `/workouts` )).key ?? '';
    workout.id = newPostKey;
    await set(ref(db, `/workouts/${newPostKey}`), Object.assign({}, workout));
    return newPostKey;
}

// const getExercises = async (): Promise<> => {}

export const api: IApi = {
    createProgram,
    getProgramsByUID,
    createProgramTemplate,
    getProgramTemplates,
    createProgramFS,
    getProgramById,
    saveProgram,
    saveWorkout
}

export default api;