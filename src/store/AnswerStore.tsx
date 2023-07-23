import { makeAutoObservable } from 'mobx';

class AnswerStore {
    answers = [];

    constructor() {
        makeAutoObservable(this);
    }

    addAnswer(answer) {
        this.answers.push(answer);
    }

    clearAnswers() {
        this.answers = [];
    }
}

export default new AnswerStore();
