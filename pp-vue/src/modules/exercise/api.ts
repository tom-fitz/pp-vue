import axios from 'axios';
import { formatQuery, type Exercise, type IExerciseParams } from '../exercise/Exercise';

interface IApi {
    getExercises: (exParams: IExerciseParams) => Promise<Exercise[]>
}

const getExercises = async (params: IExerciseParams): Promise<Exercise[]> => {
    const query = formatQuery(params);
    return await axios({
        method: 'get',
        url: 'https://api.api-ninjas.com/v1/exercises?' + query,
        headers: { 'X-Api-Key': import.meta.env.VITE_EXERCISE_API_KEY},
    })
    .then((resp) => {
        return resp.data;
    })
    .catch((err) => err)
}

const api: IApi = {
    getExercises,
}

export default api;