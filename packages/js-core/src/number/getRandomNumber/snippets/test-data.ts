import { getRandomNumber } from "@petr-ptacek/js-core";

// test data generation utilities
class TestDataGenerator {
  // generate random user age
  generateAge(): number {
    return getRandomNumber(18, 80);
  }

  // generate random score
  generateScore(): number {
    return getRandomNumber(0, 100);
  }

  // generate random quantity
  generateQuantity(): number {
    return getRandomNumber(1, 50);
  }

  // generate random delay for testing
  generateDelay(): number {
    return getRandomNumber(100, 2000); // 100ms to 2s
  }

  // generate random array index
  generateArrayIndex(arrayLength: number): number {
    return getRandomNumber(0, arrayLength - 1);
  }

  // generate random user data
  generateUser() {
    const firstNames = ["Alice", "Bob", "Carol", "David", "Eve"];
    const lastNames = ["Smith", "Johnson", "Brown", "Davis", "Wilson"];

    return {
      id: getRandomNumber(1000, 9999),
      firstName: firstNames[this.generateArrayIndex(firstNames.length)],
      lastName: lastNames[this.generateArrayIndex(lastNames.length)],
      age: this.generateAge(),
      score: this.generateScore()
    };
  }

  // generate random purchase data
  generatePurchase() {
    const products = ["Laptop", "Phone", "Tablet", "Headphones", "Mouse"];

    return {
      orderId: getRandomNumber(10000, 99999),
      product: products[this.generateArrayIndex(products.length)],
      quantity: this.generateQuantity(),
      price: getRandomNumber(10, 1500), // $10 to $1500
      timestamp: Date.now() - getRandomNumber(0, 30 * 24 * 60 * 60 * 1000) // last 30 days
    };
  }

  // generate bulk test data
  generateUsers(count: number) {
    return Array.from({ length: count }, () => this.generateUser());
  }

  generatePurchases(count: number) {
    return Array.from({ length: count }, () => this.generatePurchase());
  }
}

// usage examples
const generator = new TestDataGenerator();

console.log("Random user:", generator.generateUser());
console.log("Random purchase:", generator.generatePurchase());

// generate test datasets
const testUsers = generator.generateUsers(5);
console.log("Test users:", testUsers);

const testPurchases = generator.generatePurchases(3);
console.log("Test purchases:", testPurchases);

// simulate API response times
async function simulateApiCall(endpoint: string) {
  const delay = generator.generateDelay();
  console.log(`Calling ${endpoint}... (${delay}ms delay)`);

  await new Promise(resolve => setTimeout(resolve, delay));

  // simulate success/error (90% success rate)
  const success = getRandomNumber(1, 100) <= 90;
  return {
    success,
    data: success ? { result: "Data loaded" } : null,
    error: success ? null : "Network error",
    responseTime: delay
  };
}

// example usage
simulateApiCall("/api/users").then(result => {
  console.log("API result:", result);
});
