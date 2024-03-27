import { group } from "k6";
import { createBookScenario } from "./src/scenarios/createBook.scenario.js";
import { getBookScenario } from "./src/scenarios/getBook.scenario.js";
import { updateBookScenario, updateNewCreatedBookScenario } from "./src/scenarios/updateBook.scenario.js";
import { deleteBookScenario } from "./src/scenarios/deleteBook.scenario.js";
import { compositeScenario } from "./src/scenarios/composite.scenario.js";

const stages = [
    { duration: "60s", target: 5 },
    // { duration: "15m", target: 15 },
    // { duration: "15m", target: 30 },
    // { duration: "10m", target: 10 },
    // { duration: "5m", target: 5 },
];

export const options = {
    summaryTrendStats: ["avg", "min", "max", "med", "p(30)", "p(50)", "p(80)", "p(90)", "p(95)"],
    scenarios: {
        scn_1: {
            executor: "ramping-vus",
            startVUs: 1,
            stages: stages,
            gracefulRampDown: "0s",
            exec: "scn_1_createBook",
        },

        scn_2: {
            executor: "ramping-vus",
            startVUs: 1,
            stages: stages,
            gracefulRampDown: "0s",
            exec: "scn_2_getBook",
        },

        scn_3: {
            executor: "ramping-vus",
            startVUs: 1,
            stages: stages,
            gracefulRampDown: "0s",
            exec: "scn_3_updateBook",
        },

        scn_4: {
            executor: "ramping-vus",
            startVUs: 1,
            stages: stages,
            gracefulRampDown: "0s",
            exec: "scn_4_deleteBook",
        },

        scn_5: {
            executor: "ramping-vus",
            startVUs: 1,
            stages: stages,
            gracefulRampDown: "0s",
            exec: "scn_5_composite",
        },
    },
};

export function scn_1_createBook() {
    group("Scenarios - create book", () => {
        createBookScenario();
    });
}

export function scn_2_getBook() {
    group("Scenarios - get book", () => {
        getBookScenario();
    });
}

export function scn_3_updateBook() {
    group("Scenarios - update book", () => {
        updateBookScenario();
        updateNewCreatedBookScenario();
    });
}

export function scn_4_deleteBook() {
    group("Scenarios - delete book", () => {
        deleteBookScenario();
    });
}

export function scn_5_composite() {
    group("Scenario - composite", () => {
        compositeScenario();
    })
}