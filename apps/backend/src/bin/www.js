"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var app_ts_1 = __importDefault(require("../app.ts"));
var http_1 = __importDefault(require("http"));
var http_terminator_1 = require("http-terminator");
// Attempt a database connection
console.info("Connecting to database...");
try {
  // This intrinsically connects to the database
  require("./database-connection.ts");
  console.log("Successfully connected to the database");
} catch (error) {
  // Log any errors
  console.error("Unable to establish database connection:\n  ".concat(error));
  process.exit(1); // Then exit
}
// Get port from environment and store in Express
var port = process.env.BACKEND_PORT;
if (port === undefined) {
  console.error("Failed to start: Missing PORT environment variable");
  process.exit(1);
}
app_ts_1.default.set("port", port);
// Create the server, enable the application
console.info("Starting server...");
var server = http_1.default.createServer(app_ts_1.default);
// Export the server, so that testing client can use it
exports.default = server;
// Setup graceful exit logic
// Exit conditions
[
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGILL",
  "SIGTRAP",
  "SIGABRT",
  "SIGBUS",
  "SIGFPE",
  "SIGUSR1",
  "SIGSEGV",
  "SIGUSR2",
  "SIGTERM",
].forEach(function (sig) {
  // On any of those
  process.on(sig, function () {
    return __awaiter(this, void 0, void 0, function () {
      var httpTerminator;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            // On shutdown request
            console.info("Server shutting down due to ".concat(sig, "..."));
            httpTerminator = (0, http_terminator_1.createHttpTerminator)({
              server: server,
              gracefulTerminationTimeout: 10,
            });
            return [4 /*yield*/, httpTerminator.terminate()];
          case 1:
            _a.sent();
            // Log the exit
            console.log("Server shutdown complete");
            process.exit(0); // Exit normally
            return [2 /*return*/];
        }
      });
    });
  });
});
// Listen on the provided port, on all interfaces
server.listen(port);
server.on("error", onError); // Error handler
server.on("listening", onListening); // Notify that we started
/**
 * Event listener for HTTP server "error" event, to provide user friendly error output and then exit
 */
function onError(error) {
  // If we're doing something other than try to listen, we can't help
  if (error.syscall !== "listen") {
    throw error; // Re-throw
  }
  // Get the pipe/port we're listening on
  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // Handle specific listen errors with friendly messages
  switch (error.code) {
    // Server can't get start permission
    case "EACCES":
      console.error(
        "Failed to start: ".concat(bind, " requires elevated permissions!"),
      );
      process.exit(1);
      break;
    // Server can't get address
    case "EADDRINUSE":
      console.error("Failed to start: ".concat(bind, " + ' is already in use"));
      process.exit(1); // Exit with failure
      break;
    default:
      // Print the default error otherwise, and exit
      console.error(
        "Failed to start: Unknown binding error:\n    ".concat(error),
      );
      process.exit(1);
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  // Get the address we're listening on
  var addr = server.address();
  // If it's a string, simply get it (it's a pipe)
  var bind =
    typeof addr === "string"
      ? "pipe " + addr
      : "port " + (addr === null || addr === void 0 ? void 0 : addr.port); // Otherwise get the port
  console.info("Server listening on " + bind); // Debug output that we're listening
  console.log("Startup complete");
}
