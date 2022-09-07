interface Test {

    name: string,
    length: number,
    questions: Question[]

}

interface Question {

    type: string,
    question: string,
    answers: ButtonAnswer[] | DopuniAnswer

}

interface ButtonAnswer {

    answer: string,
    isCorrect: boolean

}

interface DopuniAnswer {

    [answer: string]: string[]

}

interface QueryParams {

    questnum?: number,
    shuffled?: boolean

}

export { Test, Question, ButtonAnswer, DopuniAnswer, QueryParams };