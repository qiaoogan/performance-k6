import { Trend, Counter } from "k6/metrics";

export default {
    createBookRequest: {
        errors: new Counter("cm_create_book_errors"),
        requests: new Counter("cm_create_book_reqs"),
        requestDuration: new Trend("cm_create_book_req_duration", true),
        requestSending: new Trend("cm_create_book_req_sending", true),
        requestWaiting: new Trend("cm_create_book_req_waiting", true),
        requestReceiving: new Trend("cm_create_book_req_receiving", true),
    },

    getBookRequest: {
        errors: new Counter("cm_get_book_errors"),
        requests: new Counter("cm_get_book_reqs"),
        requestDuration: new Trend("cm_get_book_req_duration", true),
        requestSending: new Trend("cm_get_book_req_sending", true),
        requestWaiting: new Trend("cm_get_book_req_waiting", true),
        requestReceiving: new Trend("cm_get_book_req_receiving", true),
    },

    updateBookRequest: {
        errors: new Counter("cm_update_book_errors"),
        requests: new Counter("cm_update_book_reqs"),
        requestDuration: new Trend("cm_update_book_req_duration", true),
        requestSending: new Trend("cm_update_book_req_sending", true),
        requestWaiting: new Trend("cm_update_book_req_waiting", true),
        requestReceiving: new Trend("cm_update_book_req_receiving", true),
    },

    deleteBookRequest: {
        errors: new Counter("cm_delete_book_errors"),
        requests: new Counter("cm_delete_book_reqs"),
        requestDuration: new Trend("cm_delete_book_req_duration", true),
        requestSending: new Trend("cm_delete_book_req_sending", true),
        requestWaiting: new Trend("cm_delete_book_req_waiting", true),
        requestReceiving: new Trend("cm_delete_book_req_receiving", true),
    },

    errorCheck: {
        generalError: new Counter("errors"),
    },
};