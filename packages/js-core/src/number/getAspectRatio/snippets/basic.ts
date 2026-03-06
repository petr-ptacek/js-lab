import { getAspectRatio } from "@petr-ptacek/js-core";

// common aspect ratios
const widescreen = getAspectRatio(1920, 1080);
console.log("16:9 widescreen:", widescreen); // 1.7777777777777777

const traditional = getAspectRatio(1024, 768);
console.log("4:3 traditional:", traditional); // 1.3333333333333333

const square = getAspectRatio(400, 400);
console.log("1:1 square:", square); // 1

const portrait = getAspectRatio(600, 800);
console.log("3:4 portrait:", portrait); // 0.75

// ultra-wide and cinematic ratios
const ultrawide = getAspectRatio(3440, 1440);
console.log("21:9 ultrawide:", ultrawide); // 2.388888888888889

const cinematic = getAspectRatio(2048, 858);
console.log("2.39:1 cinematic:", cinematic); // 2.387645787545787
