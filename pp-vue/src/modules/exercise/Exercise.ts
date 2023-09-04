export class Exercise {
    constructor(
        public title: string = "",
        public name: string = "",
        public target: string = "",
        public setsXReps: string = "",
        public load: string = "",
        public videoUri: string = "",
        public videoId: string = "",
        public notes: string = "",
        public type: string = "",
        public muscle: string = "",
        public equipment: string = "",
        public instructions: string = "",
        public difficulty: string = "",
        public description: string = ""
    ){}

    parseVideoId(url: string): void {
        const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?.*v=|shorts\/)|youtu\.be\/)([\w-]{11})$/;
        const match = url.match(urlRegex) ?? '';
        this.videoId = match[1];
    }
}

export interface IExerciseParams {
    type?: string,
    name?: string,
    muscle?: string,
    difficulty?: string,
    offset?: number,
}

export const formatQuery = (x: IExerciseParams): string => {
    let query: string = '';
    if (x.name && x.name !== '') {
        query = query + `name=${x.name}&`
    }
    if (x.muscle && x.muscle !== '') {
        query = query + `muscle=${x.muscle}&`
    }
    if (x.difficulty && x.difficulty !== '') {
        query = query + `difficulty=${x.difficulty}&`
    }
    if (x.type && x.type !== '') {
        query = query + `type=${x.type}&`
    }
    return query;
}