import { isEmptyString } from "@petr-ptacek/js-core";

const values = ["", "  ", null, undefined, 0, "text"];

values.forEach((value) => {
  console.log(`${JSON.stringify(value)} is empty string:`, isEmptyString(value));
});
