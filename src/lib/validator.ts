import pkg from "validator";

const {
  isAlpha,
  isAlphanumeric,
  isNumeric,
  isEmail,
  isURL,
  isDecimal,
  isISO8601,
  isDate,
  isTime
} = pkg;

export const validateBody = (
  body: Record<string, any>,
  rules: Record<string, string[]>
): void => {
  if (!body || typeof body !== "object") {
    throw new Error("Request body is not given");
  }

  // Ensure required fields exist in body
//   for (const key of Object.keys(rules)) {
//     if (!Object.prototype.hasOwnProperty.call(body, key)) {
//       throw new Error(`Missing required field: ${key}`);
//     }
//   }

  for (const [key, value] of Object.entries(body)) {
    const rule = rules[key];
    if (!rule) continue; // Skip fields without rules

    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "");

    // REQUIRED
    if (rule.includes("required") && isEmpty) {
      throw new Error(`${key} is required`);
    }

    // Skip further validation if empty and not required
    if (isEmpty) continue;

    const stringValue = typeof value === "string" ? value : String(value);

    // STRING (alpha only)
    if (rule.includes("string")) {
      if (!isAlpha(stringValue.replaceAll(" ", ""))) {
        throw new Error(`${key} is not a valid string`);
      }
    }

    // ALPHANUMERIC
    if (rule.includes("alphanumeric")) {
      if (!isAlphanumeric(stringValue.replaceAll(" ", ""))) {
        throw new Error(`${key} is not valid`);
      }
    }

    // ALPHANUMERIC + _ -
    if (rule.includes("alphanumericandsign")) {
      if (!/^[a-zA-Z0-9_-]+$/.test(stringValue)) {
        throw new Error(`${key} is not valid`);
      }
    }

    // NUMBER
    if (rule.includes("number")) {
      if (!isNumeric(stringValue)) {
        throw new Error(`${key} is not numeric`);
      }
    }

    // EMAIL
    if (rule.includes("email")) {
      if (!isEmail(stringValue)) {
        throw new Error(`${key} is not a valid email`);
      }
    }

    // URL
    if (rule.includes("url")) {
      if (!isURL(stringValue)) {
        throw new Error(`${key} is not a valid URL`);
      }
    }

    // FLOAT
    if (rule.includes("float")) {
      if (!isDecimal(stringValue)) {
        throw new Error(`${key} should be a decimal`);
      }
    }

    // BOOLEAN
    if (rule.includes("boolean")) {
      if (typeof value !== "boolean") {
        throw new Error(`${key} should be boolean`);
      }
    }

    // FILE / IMAGE
    if (rule.includes("mime")) {
      if (!value?.mimetype) {
        throw new Error(`${key} has an invalid media type`);
      }
    }

    if (rule.includes("image")) {
      if (!value?.mimetype?.includes("image")) {
        throw new Error(`${key} is an invalid image type`);
      }
    }

    if (rule.includes("file")) {
      if (!value?.mimetype?.includes("pdf")) {
        throw new Error(`${key} is an invalid file type`);
      }
    }

    // IN:VALUE1,VALUE2
    const inRule = rule.find((r) => r.startsWith("in:"));
    if (inRule) {
      const allowedValues = inRule.replace("in:", "").split(",");
      if (!allowedValues.includes(stringValue)) {
        throw new Error(`${key} has an invalid value`);
      }
    }

    // DATE
    const dateRule = rule.find((r) => r.startsWith("date"));
    if (dateRule) {
      const [, format] = dateRule.split(":");

      if (stringValue.includes("T")) {
        if (!isISO8601(stringValue)) {
          throw new Error(`${key} is not a valid ISO Date`);
        }
      } else if (format) {
        if (!isDate(stringValue, { format })) {
          throw new Error(`${key} is not a valid Date`);
        }
      } else {
        if (!isDate(stringValue)) {
          throw new Error(`${key} is not a valid Date`);
        }
      }
    }

    // TIME
    if (rule.includes('time')) {
        if (!isTime(stringValue, {hourFormat: "hour24", mode: "default"}))
          throw new Error(`${key} is not a valid Time`);
    }
  }
};
