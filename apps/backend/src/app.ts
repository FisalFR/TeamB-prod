import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import pathfindingRoute from "./routes/pathfinding-route";
import maintenanceRoute from "./routes/service-requests/maintenance-route";
import languageInterpreterRoute from "./routes/service-requests/language-interpreter-route";
import csvManagerRoute from "./routes/csv-manager-route";
import medicineRoute from "./routes/service-requests/medicine-route";
import sanitationRoute from "./routes/service-requests/sanitation-route";
import securityRoute from "./routes/service-requests/security-route";
import giftDeliveryRoute from "./routes/service-requests/gift-delivery-route";
import nodesRouter from "./routes/nodes-route";
import edgesRouter from "./routes/edges-route";
import transportationRoute from "./routes/service-requests/transportation-route";
import employeeRoute from "./routes/employee-route";
import internalTransportRoute from "./routes/service-requests/internal-transport-route";

const app: Express = express(); // Set up the backend

// Setup generic middleware
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP requests
app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
// app.use("/api/nodes", nodesRouter);
app.use("/api/edges", edgesRouter);
//TODO: Add "/api/nodes" so that it would just handle with nodes
//TODO: Add "/api/edges" so that it would just handle with just edges
app.use("/api/pathfinding", pathfindingRoute);
app.use("/api/maintenance", maintenanceRoute);
app.use("/api/languageInterpreter", languageInterpreterRoute);
// TODO rename multi-word routes to follow kebab-case naming conventions
app.use("/api/csvManager", csvManagerRoute);
app.use("/api/medicine", medicineRoute);
app.use("/api/sanitation", sanitationRoute);
app.use("/api/security", securityRoute);
app.use("/api/gift", giftDeliveryRoute);
app.use("/api/transport", transportationRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/internalTransport", internalTransportRoute);

app.use("/healthcheck", (req, res) => {
  res.status(200).send();
});

/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use(function (req: Request, res: Response, next: NextFunction): void {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response): void => {
  res.statusMessage = err.message; // Provide the error message

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});

export default app; // Export the backend, so that www.ts can start it
