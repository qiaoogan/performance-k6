import booksvcClient from "../clients/booksvc.client.js";
import randomUtils from "../utils/random.utils.js";
import { checking } from "../utils/check.utils.js";
import { responseObj } from "../utils/common.utils.js";

// scenario-based test
export function compositeScenario() {
    const bookName = randomUtils.randomTitle()
    let payload = JSON.stringify({
        name: bookName,
        author: randomUtils.randomAuthor(),
        price: randomUtils.randomPrice(),
        publishedAt: randomUtils.currentDate(),
        stock: randomUtils.randomStock()
    });

    let res = booksvcClient.createBook(payload);
    checking.requestSucceedCheck(res, "create book");

    const responseObject = responseObj(res);

    res = booksvcClient.getBook(responseObject.bid);
    checking.requestSucceedCheck(res, "get book");

    payload = JSON.stringify({
        name: bookName,
        author: randomUtils.randomAuthor(),
        price: randomUtils.randomPrice(),
        publishedAt: randomUtils.currentDate(),
        stock: randomUtils.randomStock()
    });

    res = booksvcClient.updateBook(bookName, payload);
    checking.requestSucceedCheck(res, "update book");

    res = booksvcClient.deleteBook(bookName);
    checking.requestSucceedCheck(res, "delete book");
}