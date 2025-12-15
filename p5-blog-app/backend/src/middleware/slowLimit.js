const slowdown = require("express-slow-down");

const slowdownLimiter = slowdown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 50,
        delayMs: (used, req) => {
        const delayAfter = req.slowDown.limit;
        return (used - delayAfter) * 500; // old behavior
    },
    maxDelayMs: 20000,
})

module.exports = slowdownLimiter;