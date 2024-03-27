import booksvcClient from "../clients/booksvc.client.js";
import randomUtils from "../utils/random.utils.js";
import { checking } from "../utils/check.utils.js";
import { responseObj } from "../utils/common.utils.js";

// single-point test
export function updateBookScenario() {
    const bid = randomUtils.randomBID();
    const bookName = randomUtils.randomTitle()
    const payload = JSON.stringify({
        name: bookName,
        author: randomUtils.randomAuthor(),
        price: randomUtils.randomPrice(),
        publishedAt: randomUtils.currentDate(),
        stock: randomUtils.randomStock()
    });

    const res = booksvcClient.updateBook(bookName, payload);

    checking.requestSucceedCheck(res, "update book");
}

// scenario-based test
export function updateNewCreatedBookScenario() {
    const bookName = randomUtils.randomTitle()
    let payload = JSON.stringify({
        name: bookName,
        author: randomUtils.randomAuthor(),
        price: randomUtils.randomPrice(),
        publishedAt: randomUtils.currentDate(),
        stock: randomUtils.randomStock()
    });
    
    let res = booksvcClient.createBook(payload);
    checking.requestSucceedCheck(res, "update book");

    const responseObject = responseObj(res);

    payload = JSON.stringify({
        name: bookName,
        author: randomUtils.randomAuthor(),
        price: randomUtils.randomPrice(),
        publishedAt: randomUtils.currentDate(),
        stock: randomUtils.randomStock()
    });

    res = booksvcClient.updateBook(bookName, payload)
    checking.requestSucceedCheck(res, "update new created book");
}