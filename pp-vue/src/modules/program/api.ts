import { Program } from "./Program";

import { getDatabase, ref, set, child, push } from 'firebase/database';

interface IApi {
    createProgram: (program: Program) => Promise<void>;
}

const createProgram = async (program: Program): Promise<void> => {
    const db = getDatabase();
    const newPostKey = push(child(ref(db), 'programs')).key;
    program.daysCompleted = Object.assign({}, program.daysCompleted);
    set(ref(db, `progams/${program.uid}/${newPostKey}`), Object.assign({}, program));
}

export const api: IApi = {
    createProgram,
}

export default api;