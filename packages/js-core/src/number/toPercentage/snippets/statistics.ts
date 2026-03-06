import { toPercentage } from "@petr-ptacek/js-core";

// statistical calculations
const surveyData = {
  totalResponses: 250,
  categories: {
    "Very Satisfied": 125,
    "Satisfied": 75,
    "Neutral": 30,
    "Dissatisfied": 15,
    "Very Dissatisfied": 5
  }
};

// calculate percentage for each category
const results = Object.entries(surveyData.categories).map(([category, count]) => ({
  category,
  count,
  percentage: toPercentage(count, surveyData.totalResponses)
}));

console.log("Survey Results:");
results.forEach(({ category, count, percentage }) => {
  console.log(`${category}: ${count} (${percentage.toFixed(1)}%)`);
});

// calculate satisfaction rate (Very Satisfied + Satisfied)
const satisfied = surveyData.categories["Very Satisfied"] + surveyData.categories["Satisfied"];
const satisfactionRate = toPercentage(satisfied, surveyData.totalResponses);

console.log(`\nOverall Satisfaction Rate: ${satisfactionRate}%`);

// example output:
// Survey Results:
// Very Satisfied: 125 (50.0%)
// Satisfied: 75 (30.0%)
// Neutral: 30 (12.0%)
// Dissatisfied: 15 (6.0%)
// Very Dissatisfied: 5 (2.0%)
//
// Overall Satisfaction Rate: 80%
