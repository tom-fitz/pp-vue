import { Program } from "./Program";
import { 
    getDatabase, 
    ref, 
    set, 
    child, 
    push, 
    onValue,
    get
} from 'firebase/database';

interface IApi {
    createProgram: (program: Program) => Promise<void>;
    getProgramsByUID: (uid: string) => Promise<Program[]>;
}

const createProgram = async (program: Program): Promise<void> => {
    const db = getDatabase();
    const newPostKey = push(child(ref(db), 'programs')).key;
    program.daysCompleted = Object.assign({}, program.daysCompleted);
    set(ref(db, `programs/${program.uid}/${newPostKey}`), Object.assign({}, program));
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

export const api: IApi = {
    createProgram,
    getProgramsByUID
}

export default api;