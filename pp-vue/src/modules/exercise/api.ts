import axios from 'axios';
import { formatQuery, type Exercise, type IExerciseParams } from '../exercise/Exercise';
import { 
    getDatabase, 
    query, 
    ref, 
    orderByChild, 
    equalTo,
    get, 
    update,
    push,
    child
 } from 'firebase/database';

interface IApi {
    getExercises: (exParams: IExerciseParams) => Promise<Exercise[]>
}

const getExercises = async (params: IExerciseParams): Promise<Exercise[]> => {
    const db = getDatabase();
    const apiQuery = formatQuery(params);
    const resp = await axios({
        method: 'get',
        url: 'https://api.api-ninjas.com/v1/exercises?' + apiQuery,
        headers: { 'X-Api-Key': import.meta.env.VITE_EXERCISE_API_KEY },
    });

    const exercisesToSave = [];

    for (const e of resp.data) {
        const exQueryByName = query(
            ref(db, "exercises"),
            orderByChild("name"),
            equalTo(e.name)
        );
        const snapshot = await get(exQueryByName);
        if (!snapshot.exists()) {
            const newPostKey = push(child(ref(db), 'exercises')).key;
            e.id = newPostKey;
            exercisesToSave.push(e);
        }
    }

    if (exercisesToSave.length > 0) {
        const updates: { [path: string]: Exercise } = {};
        exercisesToSave.forEach((exercise) => {
            updates[`exercises/${exercise.id}`] = exercise;
        });
        await update(ref(db), updates);
        console.log(`${exercisesToSave.length} new exercises added to the database.`);
    } else {
        console.log("No new exercises to add.");
    }

    return resp.data;
}


const api: IApi = {
    getExercises,
}

export default api;