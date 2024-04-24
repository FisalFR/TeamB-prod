import client from "./bin/database-connection";
import { fullServiceFormType } from "common/src/fullServiceForm";

export async function formFilter(id: string, reqType: string) {
  let includeMaintenance = false;
  let includeLanguage = false;
  let includeSanitation = false;
  let includeMedicine = false;
  let includeGift: { include: { cart: boolean } } | boolean = false;
  let includeSecurity = false;
  let includeTransportation = false;
  let includeInternalTransportation = false;

  switch (reqType) {
    case "Maintenance":
      {
        reqType = "maintenances";
        includeMaintenance = true;
      }
      break;
    case "Language": {
      reqType = "languageInterpreterRequests";
      includeLanguage = true;
      break;
    }
    case "Sanitation": {
      reqType = "sanitationRequests";
      includeSanitation = true;
      break;
    }
    case "Medicine": {
      reqType = "medicineRequests";
      includeMedicine = true;
      break;
    }
    case "Gift": {
      reqType = "giftRequests";
      includeGift = {
        include: {
          cart: true,
        },
      };
      break;
    }
    case "Security": {
      reqType = "securityRequests";
      includeSecurity = true;
      break;
    }
    case "Transportation": {
      reqType = "transportationRequests";
      includeTransportation = true;
      break;
    }
    case "Internal Transport": {
      reqType = "internalTransportationRequests";
      includeInternalTransportation = true;
      break;
    }
  }

  const users: fullServiceFormType = await client.forms.findUnique({
    where: {
      formID: id,
    },
    include: {
      maintenanceRequests: includeMaintenance,
      languageRequests: includeLanguage,
      sanitationRequests: includeSanitation,
      medicineRequests: includeMedicine,
      giftRequests: includeGift,
      securityRequests: includeSecurity,
      transportationRequests: includeTransportation,
      internalTransportationRequests: includeInternalTransportation,
    },
  });
  return users;
}

export function objToString<T extends object>(obj: T): string[] {
  return Object.values(obj).map((value) => {
    if (typeof value == "object") {
      return objToString(value);
    }
    return value.toString();
  });
}
