import { Exercise } from "../exercise/Exercise";

export class Workout {
    constructor(
        public name: string = "",
        public exercises: Exercise[] = [new Exercise()],
        public warmup: string = "",
        public cooldown: string = "",
        public position: number = 0,
        public dayIndex: number = 0,
        public weekIndex: number = 0,
        public id: string = "",
        public programIds: string[] = []
    ){}

    addExercise() {
        if (!this.exercises) {
            this.exercises = [new Exercise()];
        } else {
            this.exercises.push(new Exercise());
        }
    }

    reset() {
        this.name = '';
        this.exercises = [new Exercise()];
        this.warmup = '';
        this.cooldown = '';
    }
}

export class Day {
    constructor(
        public position: number = 0,
        public long_title: string = '',
        public short_title: string = '',
        public workouts: Workout[] = [],
        public workout: Workout = new Workout(),
        public weekIndex: number = 0
    ){}

    reset() {
        this.long_title = '';
        this.short_title = '';
        this.workouts = [];
    }
}

export class Week {
    constructor(
        public position: number = 0,
        public days: Day[] = []
    ){
        this.days = this.newWeek()
    }

    newWeek(): Day[] {
        const dayNames = [['Sunday','sun'],['Monday','mon'],['Tuesday','tues'],['Wednesday','wed'],['Thursday','thur'],['Friday','fri'],['Saturday','sat']];
        const resp: Day[] = [];
        dayNames.forEach((x: string[], idx: number) => {
            resp.push(new Day(idx, x[0], x[1]))
        });
        return resp;
    }
}

export class Program {
    constructor(
        public id: string = "",
        public name: string = "",
        public description: string = "",
        public uids: string[] = [],
        public notes: string = "",
        public exercises: Exercise[] = [new Exercise()],
        public daysCompleted: DayCompletion[] = [new DayCompletion()],
        public duration: number = 0,
        public completionTitle: string = "",
        public weeks: Week[] = [new Week()]
    ){
        this.uids = []
    }

    create(): Program {
        const newPro = new Program();
        newPro.weeks.push(new Week(0, this.newWeek()));
        return newPro;
    }

    newWeek(): Day[] {
        const dayNames = [['Sunday','sun'],['Monday','mon'],['Tuesday','tues'],['Wednesday','wed'],['Thursday','thur'],['Friday','fri'],['Saturday','sat']];
        const resp: Day[] = [];
        dayNames.forEach((x: string[], idx: number) => {
            resp.push(new Day(idx, x[0], x[1]))
        });
        return resp;
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

    removeExercise(idx: number): void {
        if (this.exercises) {
            this.exercises.splice(idx, 1);
        }
    }

    initializeWeek(): Workout[][] {
        const resp: Workout[][] = [];
        const week: Workout[] = [];
        for (let i=0; i < 7; i++) {
            week.push(new Workout())
        }
        resp.push([...week]);
        return resp;
    }
}

export class DayCompletion {
    constructor(
        public title: string = "",
        public days: number = 0,
        public weekIdx: number = 0,
    ){}
}