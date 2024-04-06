export function generateRandomUUIDInteger() {
  // Generate a random UUID
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    },
  );

  // Convert the UUID to an integer
  const uuidInteger = parseInt(uuid.replace(/-/g, ""), 16);

  // Ensure it has at most 6 digits
  const sixDigitInteger = uuidInteger % 1000000;

  return sixDigitInteger;
}

export default generateRandomUUIDInteger();
