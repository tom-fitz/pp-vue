export class Program {
    constructor(
        public id: string = "",
        public name: string = "",
        public description: string = "",
        public uid: string = "",
        public notes: string = "",
        public exercises: Exercise[] = [new Exercise()],
        public daysCompleted: DayCompletion[] = [new DayCompletion()],
        public duration: number = 0,
        public completionTitle: string = "",
    ){}

    // setCompletedMap(): Map<string, number> {
    //     const completedMap = new Map()
    //     if (this.duration) {
    //         for (let x = 1; x <= this.duration; x++) {
    //             completedMap.set(`WK${x}`, 0);
    //         }
    //     }
    //     this.daysCompleted = completedMap;
    //     return this.daysCompleted;    
    // }

    setDaysCompleted(): void {
        const completedArr = [];
        if (this.duration) {
            for (let x = 1; x <= this.duration; x++) {
                const item = new DayCompletion(`WK${x}`, 0, x);
                completedArr.push(item);
            }
            this.daysCompleted = [...completedArr];
        }
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

export class DayCompletion extends Program {
    constructor(
        public title: string = "",
        public days: number = 0,
        public weekIdx: number = 0,
    ){
        super();
    }
}