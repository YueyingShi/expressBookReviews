const axios = require("axios");

const BASE_URL = "http://localhost:5000";

// ============================================================================
// METHOD 1: Using Promise Callbacks (.then() / .catch())
// ============================================================================

function getBooksWithCallback() {
  console.log("\n=== Retrieving All Books (Promise Callback) ===");
  axios
    .get(`${BASE_URL}/`)
    .then((response) => {
      console.log("All books retrieved:", response.data);
    })
    .catch((error) => {
      console.error("Error retrieving books:", error.message);
    });
}

function getBookByISBNWithCallback(isbn) {
  console.log(`\n=== Retrieving Book by ISBN: ${isbn} (Promise Callback) ===`);
  axios
    .get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      console.log("Book details:", response.data);
    })
    .catch((error) => {
      console.error(
        `Error retrieving book with ISBN ${isbn}:`,
        error.message
      );
    });
}

function getBooksByAuthorWithCallback(author) {
  console.log(
    `\n=== Retrieving Books by Author: ${author} (Promise Callback) ===`
  );
  axios
    .get(`${BASE_URL}/author/${author}`)
    .then((response) => {
      console.log("Books by author:", response.data);
    })
    .catch((error) => {
      console.error(
        `Error retrieving books by author ${author}:`,
        error.message
      );
    });
}

function getBooksByTitleWithCallback(title) {
  console.log(
    `\n=== Retrieving Books by Title: ${title} (Promise Callback) ===`
  );
  axios
    .get(`${BASE_URL}/title/${title}`)
    .then((response) => {
      console.log("Books with title:", response.data);
    })
    .catch((error) => {
      console.error(
        `Error retrieving books with title ${title}:`,
        error.message
      );
    });
}

function getBookReviewWithCallback(isbn) {
  console.log(
    `\n=== Retrieving Reviews for ISBN: ${isbn} (Promise Callback) ===`
  );
  axios
    .get(`${BASE_URL}/review/${isbn}`)
    .then((response) => {
      console.log("Book reviews:", response.data);
    })
    .catch((error) => {
      console.error(`Error retrieving reviews for ISBN ${isbn}:`, error.message);
    });
}

// ============================================================================
// METHOD 2: Using Async/Await (Modern Approach)
// ============================================================================

async function getBooks() {
  try {
    console.log("\n=== Retrieving All Books (Async/Await) ===");
    const response = await axios.get(`${BASE_URL}/`);
    console.log("All books retrieved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Could not retrieve books:", error.message);
    process.exitCode = 1;
  }
}

async function getBookByISBN(isbn) {
  try {
    console.log(`\n=== Retrieving Book by ISBN: ${isbn} (Async/Await) ===`);
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    console.log("Book details:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Could not retrieve book with ISBN ${isbn}:`, error.message);
  }
}

async function getBooksByAuthor(author) {
  try {
    console.log(
      `\n=== Retrieving Books by Author: ${author} (Async/Await) ===`
    );
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    console.log("Books by author:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Could not retrieve books by author ${author}:`,
      error.message
    );
  }
}

async function getBooksByTitle(title) {
  try {
    console.log(
      `\n=== Retrieving Books by Title: ${title} (Async/Await) ===`
    );
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    console.log("Books with title:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Could not retrieve books with title ${title}:`,
      error.message
    );
  }
}

async function getBookReview(isbn) {
  try {
    console.log(
      `\n=== Retrieving Reviews for ISBN: ${isbn} (Async/Await) ===`
    );
    const response = await axios.get(`${BASE_URL}/review/${isbn}`);
    console.log("Book reviews:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Could not retrieve reviews for ISBN ${isbn}:`,
      error.message
    );
  }
}

// ============================================================================
// Demonstration and Testing
// ============================================================================

async function runDemo() {
  // Using Async/Await (recommended modern approach)
  await getBooks();
  await getBookByISBN("1");
  await getBooksByAuthor("Chinua Achebe");
  await getBooksByTitle("Things Fall Apart");
  await getBookReview("1");

  // Using Promise Callbacks (alternative approach)
  // Uncomment below to test callback-based approach:
  // getBooksWithCallback();
  // getBookByISBNWithCallback("1");
  // getBooksByAuthorWithCallback("Chinua Achebe");
  // getBooksByTitleWithCallback("Things Fall Apart");
  // getBookReviewWithCallback("1");
}

// Run the demo
runDemo();
