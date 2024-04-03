"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var example_ts_1 = __importDefault(require("./routes/example.ts"));
var app = (0, express_1.default)(); // Setup the backend
// Setup generic middlewear
app.use(
  (0, morgan_1.default)("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: function (msg) {
        return console.info(msg);
      },
    },
  }),
); // This records all HTTP requests
app.use(express_1.default.json()); // This processes requests as JSON
app.use(express_1.default.urlencoded({ extended: false })); // URL parser
app.use((0, cookie_parser_1.default)()); // Cookie parser
// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
app.use("/api/high-score", example_ts_1.default);
app.use("/healthcheck", function (req, res) {
  res.status(200).send();
});
/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req, res, next) {
  // Have the next (generic error handler) process a 404 error
  next((0, http_errors_1.default)(404));
});
/**
 * Generic error handler
 */
app.use(function (err, req, res) {
  res.statusMessage = err.message; // Provide the error message
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // Reply with the error
  res.status(err.status || 500);
});
exports.default = app; // Export the backend, so that www.ts can start it
