import booksvcClient from "../clients/booksvc.client.js";
import { checking } from "../utils/check.utils.js";
import randomUtils from "../utils/random.utils.js";

// single-point test
export function getBookScenario() {
    //const bid = randomUtils.randomBID();
    const res = booksvcClient.getBook('Bookdogger');

    checking.requestSucceedCheck(res, "get book");
}