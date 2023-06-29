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
    ){}

    parseVideoId(url: string): void {
        const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?.*v=|shorts\/)|youtu\.be\/)([\w-]{11})$/;
        const match = url.match(urlRegex) ?? '';
        this.videoId = match[1];
    }
}

export class DayCompletion {
    constructor(
        public title: string = "",
        public days: number = 0,
        public weekIdx: number = 0,
    ){}
}