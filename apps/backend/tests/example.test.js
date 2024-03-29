"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
function sum(a, b) {
  return a + b;
}
// Use the `test` function to run a test
(0, vitest_1.test)("test something", function () {
  (0, vitest_1.expect)(1).toBe(1);
});
// Use the `describe` function to group related tests
(0, vitest_1.describe)("sum", function () {
  (0, vitest_1.test)("adds 1 + 2 to equal 3", function () {
    (0, vitest_1.expect)(sum(1, 2)).toBe(3);
  });
  (0, vitest_1.test)("adds 2 + 2 to equal 4", function () {
    (0, vitest_1.expect)(sum(2, 2)).toBe(4);
  });
});
