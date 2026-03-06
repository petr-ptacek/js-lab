import { scaleByAspectRatio } from "@petr-ptacek/js-core";

// basic scaling examples
const original = { width: 1920, height: 1080 }; // Full HD

// scale to specific width (e.g., for thumbnails)
const thumbnail = scaleByAspectRatio(original, { width: 320 });
console.log(thumbnail); // { width: 320, height: 180 }

// scale to specific height (e.g., for mobile screens)
const mobile = scaleByAspectRatio(original, { height: 640 });
console.log(mobile); // { width: 1138, height: 640 }

// working with different aspect ratios
const portrait = { width: 600, height: 800 }; // 3:4 ratio

const scaledPortrait = scaleByAspectRatio(portrait, { width: 300 });
console.log(scaledPortrait); // { width: 300, height: 400 }
