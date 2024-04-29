-- CreateTable
CREATE TABLE "HighScore" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "HighScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "nodeID" TEXT NOT NULL,
    "xcoord" INTEGER NOT NULL,
    "ycoord" INTEGER NOT NULL,
    "floor" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "longName" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("nodeID")
);

-- CreateTable
CREATE TABLE "edges" (
    "edgeID" TEXT NOT NULL,
    "startNodeID" TEXT NOT NULL,
    "endNodeID" TEXT NOT NULL,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("edgeID")
);

-- CreateTable
CREATE TABLE "employee" (
    "employeeEmail" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("employeeEmail")
);

-- CreateTable
CREATE TABLE "interpreter" (
    "interpreterUsername" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "native" BOOLEAN NOT NULL,

    CONSTRAINT "interpreter_pkey" PRIMARY KEY ("interpreterUsername")
);

-- CreateTable
CREATE TABLE "forms" (
    "formID" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "assignee" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("formID")
);

-- CreateTable
CREATE TABLE "languageInterpreterRequests" (
    "languageRequest" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "languageInterpreterRequests_pkey" PRIMARY KEY ("languageRequest")
);

-- CreateTable
CREATE TABLE "maintenances" (
    "maintenanceRequest" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("maintenanceRequest")
);

-- CreateTable
CREATE TABLE "medicineRequests" (
    "medicineRequest" TEXT NOT NULL,
    "medicine" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "additionalComments" TEXT NOT NULL,

    CONSTRAINT "medicineRequests_pkey" PRIMARY KEY ("medicineRequest")
);

-- CreateTable
CREATE TABLE "sanitationRequests" (
    "sanitationRequest" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "contaminant" TEXT NOT NULL,
    "additionalComments" TEXT NOT NULL,

    CONSTRAINT "sanitationRequests_pkey" PRIMARY KEY ("sanitationRequest")
);

-- CreateTable
CREATE TABLE "securityRequests" (
    "securityRequest" TEXT NOT NULL,
    "request" TEXT NOT NULL,
    "additionalInfo" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "securityRequests_pkey" PRIMARY KEY ("securityRequest")
);

-- CreateTable
CREATE TABLE "giftRequests" (
    "giftRequest" TEXT NOT NULL,
    "receiverName" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "giftRequests_pkey" PRIMARY KEY ("giftRequest")
);

-- CreateTable
CREATE TABLE "giftItem" (
    "giftItem" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cart" TEXT NOT NULL,

    CONSTRAINT "giftItem_pkey" PRIMARY KEY ("giftItem")
);

-- CreateTable
CREATE TABLE "transportationRequests" (
    "transportationRequest" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "transport" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "transportationRequests_pkey" PRIMARY KEY ("transportationRequest")
);

-- CreateTable
CREATE TABLE "internalTransportationRequests" (
    "internalTransportationRequest" TEXT NOT NULL,
    "endlocation" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,

    CONSTRAINT "internalTransportationRequests_pkey" PRIMARY KEY ("internalTransportationRequest")
);

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_startNodeID_fkey" FOREIGN KEY ("startNodeID") REFERENCES "nodes"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_endNodeID_fkey" FOREIGN KEY ("endNodeID") REFERENCES "nodes"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpreter" ADD CONSTRAINT "interpreter_interpreterUsername_fkey" FOREIGN KEY ("interpreterUsername") REFERENCES "employee"("employeeEmail") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "languageInterpreterRequests" ADD CONSTRAINT "languageInterpreterRequests_languageRequest_fkey" FOREIGN KEY ("languageRequest") REFERENCES "forms"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_maintenanceRequest_fkey" FOREIGN KEY ("maintenanceRequest") REFERENCES "forms"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicineRequests" ADD CONSTRAINT "medicineRequests_medicineRequest_fkey" FOREIGN KEY ("medicineRequest") REFERENCES "forms"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sanitationRequests" ADD CONSTRAINT "sanitationRequests_sanitationRequest_fkey" FOREIGN KEY ("sanitationRequest") REFERENCES "forms"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "securityRequests" ADD CONSTRAINT "securityRequests_securityRequest_fkey" FOREIGN KEY ("securityRequest") REFERENCES "forms"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giftRequests" ADD CONSTRAINT "giftRequests_giftRequest_fkey" FOREIGN KEY ("giftRequest") REFERENCES "forms"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "giftItem" ADD CONSTRAINT "giftItem_cart_fkey" FOREIGN KEY ("cart") REFERENCES "giftRequests"("giftRequest") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportationRequests" ADD CONSTRAINT "transportationRequests_transportationRequest_fkey" FOREIGN KEY ("transportationRequest") REFERENCES "forms"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internalTransportationRequests" ADD CONSTRAINT "internalTransportationRequests_internalTransportationReque_fkey" FOREIGN KEY ("internalTransportationRequest") REFERENCES "forms"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;
