export class Program {
    constructor(
        public id: string = "",
        public name: string = "",
        public description: string = "",
        public uid: string = "",
        public notes: string = "",
        public exercises: Exercise[] = [new Exercise()],
        public daysCompleted: Map<string, number> = new Map(),
        public duration: number = 0,
        public completionTitle: string = "",
    ){}

    create(): void {
        const completedMap = new Map()
        if (this.duration) {
            for (let x = 1; x <= this.duration; x++) {
                completedMap.set(`WK${x}`, 0);
            }
        }
        this.daysCompleted = completedMap;        
    }

    addExercise(): void {
        if (!this.exercises) {
            this.exercises = [new Exercise()];
        } else {
            this.exercises?.push(new Exercise());
        }
    }

    removeExercise(idx: number): void {
        if (this.exercises) {
            this.exercises.splice(idx, 1);
        }
    }
}


export class Exercise {
    constructor(
        public title: string = "",
        public name: string = "",
        public target: string = "",
        public setsXReps: string = "",
        public load: string = "",
        public videoUri: string = "",
        public notes: string = "",
    ){}
}