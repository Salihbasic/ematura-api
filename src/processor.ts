import data from "../data/data.json";

import { Test, Question } from "./test"

export type TestKeys = keyof typeof data

export const getTest = (testName: TestKeys, questLimit: number | undefined, shuffle: boolean | undefined): Test => {
    
    const foundQuestions = getQuestions(testName, questLimit, shuffle);

    const resultTest: Test = {
        name: testName,
        length: foundQuestions.length,
        questions: foundQuestions
    }

    return resultTest;

}

export const getQuestions = (testName: TestKeys, questLimit: number | undefined, shuffle: boolean | undefined): Question[] => {

    var foundQuestions;

    if (questLimit === 0 || questLimit === undefined) {

        foundQuestions = data[testName];

    } else {

        foundQuestions = data[testName]

        if (questLimit > foundQuestions.length) {
            
            throw new Error(`Attempted to access ${questLimit} questions, but the maximum is ${foundQuestions.length}!`);
        
        } else {

            foundQuestions = foundQuestions.slice(0, questLimit);

        }

    }

    if (shuffle) {

        foundQuestions = fyShuffle(foundQuestions);

    }

    return (<Question[]>foundQuestions);

}

export const getTestNames = (): string[] => Object.keys(data)

/*
    Basic implementation of the Fisher-Yates shuffle algorithm.

    We use it here to shuffle the array of question objects passed onto the 
    component as a property before rendering it, so as to ensure randomised
    order.
*/
const fyShuffle = (array: any[]) => {

    var m = array.length;
    var i;

    while (m) {

        i = Math.floor(Math.random() * m--);

        [array[m], array[i]] = [array[i], array[m]]

    }

    return array;

}
