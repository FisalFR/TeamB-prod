import client from "./bin/database-connection";

export function formFilter(id: string, type: string) {
  switch (type) {
    case "Maintenance": {
      type = "maintenances";
      break;
    }
    case "Language": {
      type = "languageInterpreterRequests";
      break;
    }
    case "Sanitation": {
      type = "sanitationRequests";
      break;
    }
    case "Medicine": {
      type = "medicineRequests";
      break;
    }
    case "Gift Delivery": {
      type = "giftRequests";
      break;
    }
    case "Security": {
      type = "securityRequests";
      break;
    }
  }

  const filteredForms = await client.forms.findMany({});
}
