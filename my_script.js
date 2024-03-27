import http from 'k6/http'
import { check, sleep } from 'k6'
import { Trend } from 'k6/metrics'


const myTrend = new Trend('wating_time')

// export const options = {
//     stages: [
//         {duration: '30s', target: 20},
//         {duration: "30s", target: 10},
//         {duration: '20s', target: 0}
//     ]
// }

// export default function() {
//     const res = http.get('http://hw.dogger.instance')
//     check(res, {'status was 200': (r) => r.status == 200} )
//     sleep(1)
// }

export default function() {
    const r = http.get('https://httpbin.test.k6.io')
    myTrend.add(r.timings.waiting)
    console.log(myTrend.name)
}