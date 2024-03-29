"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("database");
// Create the prisma client, this automatically connects to the database
var client = new database_1.PrismaClient();
// Export the client
exports.default = client;
// Prisma automatically closes on shutdown
