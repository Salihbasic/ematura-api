# ematura-api

API for eMatura data.

# How to use

All data is provided on a fair to use basis and it can be found in the `data/` directory.

Simply query the required endpoints with optionally supplied parameters.


| Endpoint                | Parameters              | Description                                          |
| ------------------------- | :------------------------ | :----------------------------------------------------- |
| `/tests`                | N/A                     | Returns a JSON array of all test names available     |
| `/test/:name`           | `questlimit`, `shuffle` | Returns a Test as JSON                               |
| `/test/:name/questions` | `questlimit`, `shuffle` | Returns only the questions without any Test metadata |

Parameters are defined as follows:

```typescript
interface QueryParams {

    questnum?: number,
    shuffled?: boolean

}
```

Return types are defined as follows:

```typescript
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
```
