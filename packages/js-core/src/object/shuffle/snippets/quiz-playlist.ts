import { shuffle } from "@petr-ptacek/js-core";

// Quiz questions randomization
const questions = [
  { question: "What is the capital of France?", answer: "Paris", difficulty: "easy" },
  { question: "What is 2 + 2?", answer: "4", difficulty: "easy" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare", difficulty: "medium" },
  { question: "What is the square root of 144?", answer: "12", difficulty: "medium" },
  { question: "What is the atomic number of gold?", answer: "79", difficulty: "hard" }
];

// Randomize quiz order
const randomizedQuiz = shuffle(questions);
console.log("Randomized quiz questions:");
randomizedQuiz.forEach((q, index) => {
  console.log(`${index + 1}. [${q.difficulty.toUpperCase()}] ${q.question}`);
});

// Music playlist shuffling
const playlist = [
  { title: "Bohemian Rhapsody", artist: "Queen", duration: 355 },
  { title: "Hotel California", artist: "Eagles", duration: 391 },
  { title: "Stairway to Heaven", artist: "Led Zeppelin", duration: 482 },
  { title: "Imagine", artist: "John Lennon", duration: 183 },
  { title: "Billie Jean", artist: "Michael Jackson", duration: 294 }
];

// Shuffle playlist
const shuffledPlaylist = shuffle(playlist);
console.log("\nShuffled playlist:");
shuffledPlaylist.forEach((song, index) => {
  const minutes = Math.floor(song.duration / 60);
  const seconds = song.duration % 60;
  console.log(`${index + 1}. ${song.title} - ${song.artist} (${minutes}:${seconds.toString().padStart(2, '0')})`);
});
