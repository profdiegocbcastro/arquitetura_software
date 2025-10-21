const CircuitBreaker = require('./CircuitBreaker')

const circuitBreaker = CircuitBreaker();
const { wait } = require('./util');

(async () => {
    while (true) {
        await circuitBreaker.healthcheck();
        await wait(1000);
    }
})();