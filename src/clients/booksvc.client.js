import http from "k6/http";
import { SUT } from "../configs/booksvc.config.js";
import metrics from "../configs/metric.config.js";

const bookUrl = SUT.host + SUT.basePath + SUT.bookPath;

const commonHeaders = {
    "Content-Type": "application/json",
};

const addGeneralErrorsToMetrics = (errorCounter, res) => {
    if (res.status !== 200 && res.status !== 201) {
        errorCounter.add(1);
        metrics.errorCheck.generalError.add(1);

    } else {
        // add this otherwise k6 won't store empty counter data and result in no data in influxdb.
        errorCounter.add(0);
        metrics.errorCheck.generalError.add(0);
    }
};

const addRequestsDataToMetrics = (metricRequest, res) => {
    metricRequest.requests.add(1);
    metricRequest.requestDuration.add(res.timings.duration);
    metricRequest.requestSending.add(res.timings.sending);
    metricRequest.requestWaiting.add(res.timings.waiting);
    metricRequest.requestReceiving.add(res.timings.receiving);
    addGeneralErrorsToMetrics(metricRequest.errors, res);
};

export default {
    createBook: (payload) => {
        const params = { headers: commonHeaders };
        const res = http.post(bookUrl, payload, params);

        addRequestsDataToMetrics(metrics.createBookRequest, res);
        return res;
    },

    getBook: (bookName) => {
        const url = bookUrl + "/" + bookName;
        const params = { headers: commonHeaders };
        const res = http.get(url, params);

        addRequestsDataToMetrics(metrics.getBookRequest, res);
        return res;
    },

    updateBook: (bookName, payload) => {
        const url = bookUrl + "/" + bookName;
        const params = { headers: commonHeaders };
        const res = http.put(url, payload, params);

        addRequestsDataToMetrics(metrics.updateBookRequest, res);
        return res;
    },

    deleteBook: (bookName) => {
        const url = bookUrl + "/" + bookName;
        const params = { headers: commonHeaders };
        const res = http.del(url, "", params);

        addRequestsDataToMetrics(metrics.deleteBookRequest, res);
        return res;
    },
};