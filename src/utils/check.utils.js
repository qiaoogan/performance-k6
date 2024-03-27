import { check } from "k6";
export const checking = {
    requestSucceedCheck: (res, message) => {
        const handler = {};
        const msg = `${message}, checking status code is 200 or 201`;
        handler[msg] = (r) => r.status === 200 || r.status === 201;

        check(res, handler);
    },
};