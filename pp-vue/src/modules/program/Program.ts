export class Program {
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public uid?: string,
        public notes?: string,
        public exercises?: Exercise[],
        public daysCompleted?: number[],
    ){}
}


export class Exercise {
    constructor(
        public name?: string,
        public target?: string,
        public setsXReps?: string,
        public load?: string,
        public videoUri?: string,
    ){}
}