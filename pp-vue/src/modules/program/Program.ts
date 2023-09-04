import { Exercise } from "../exercise/Exercise";

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

    create(): void {
        this.exercises.forEach((e: Exercise) => {
            if (e.videoUri && e.videoUri !== '') {
                e.parseVideoId(e.videoUri);
            }
        });
        this.setDaysCompleted();
    }

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

export class DayCompletion {
    constructor(
        public title: string = "",
        public days: number = 0,
        public weekIdx: number = 0,
    ){}
}