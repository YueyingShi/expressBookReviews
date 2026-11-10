# Axios Book Retrieval Guide

This guide demonstrates how to retrieve book data from the Express Book Reviews API using Axios with both **Promise callbacks** and **async/await** patterns.

## Table of Contents
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
  - [Promise Callbacks](#promise-callbacks)
  - [Async/Await](#asyncawait)
- [Function Reference](#function-reference)

---

## API Endpoints

The following endpoints are available on your Express server:

| Endpoint | Method | Description | Example |
|----------|--------|-------------|---------|
| `/` | GET | Retrieve all books | `GET http://localhost:5000/` |
| `/isbn/:isbn` | GET | Get book by ISBN | `GET http://localhost:5000/isbn/1` |
| `/author/:author` | GET | Get books by author | `GET http://localhost:5000/author/Chinua%20Achebe` |
| `/title/:title` | GET | Get books by title | `GET http://localhost:5000/title/Things%20Fall%20Apart` |
| `/review/:isbn` | GET | Get reviews for a book | `GET http://localhost:5000/review/1` |

---

## Installation

Ensure Axios is installed in your project:

```bash
npm install axios
```

---

## Usage Examples

### Promise Callbacks

Promise callbacks use the `.then()` and `.catch()` methods to handle responses and errors.

#### Get All Books
```javascript
const axios = require("axios");

axios
  .get("http://localhost:5000/")
  .then((response) => {
    console.log("All books:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

#### Get Book by ISBN
```javascript
const isbn = "1";

axios
  .get(`http://localhost:5000/isbn/${isbn}`)
  .then((response) => {
    console.log("Book details:", response.data);
  })
  .catch((error) => {
    console.error(`Error retrieving ISBN ${isbn}:`, error.message);
  });
```

#### Get Books by Author
```javascript
const author = "Chinua Achebe";

axios
  .get(`http://localhost:5000/author/${author}`)
  .then((response) => {
    console.log("Books by author:", response.data);
  })
  .catch((error) => {
    console.error(`Error retrieving author ${author}:`, error.message);
  });
```

#### Get Books by Title
```javascript
const title = "Things Fall Apart";

axios
  .get(`http://localhost:5000/title/${title}`)
  .then((response) => {
    console.log("Books with title:", response.data);
  })
  .catch((error) => {
    console.error(`Error retrieving title ${title}:`, error.message);
  });
```

#### Get Book Reviews
```javascript
const isbn = "1";

axios
  .get(`http://localhost:5000/review/${isbn}`)
  .then((response) => {
    console.log("Book reviews:", response.data);
  })
  .catch((error) => {
    console.error(`Error retrieving reviews:`, error.message);
  });
```

---

### Async/Await

Async/Await provides a cleaner, more readable syntax for handling asynchronous operations.

#### Get All Books
```javascript
const axios = require("axios");

async function getBooks() {
  try {
    const response = await axios.get("http://localhost:5000/");
    console.log("All books:", response.data);
    return response.data;
  } catch (error) {
    console.error("Could not retrieve books:", error.message);
  }
}

getBooks();
```

#### Get Book by ISBN
```javascript
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log("Book details:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Could not retrieve ISBN ${isbn}:`, error.message);
  }
}

getBookByISBN("1");
```

#### Get Books by Author
```javascript
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log("Books by author:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Could not retrieve author ${author}:`, error.message);
  }
}

getBooksByAuthor("Chinua Achebe");
```

#### Get Books by Title
```javascript
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log("Books with title:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Could not retrieve title ${title}:`, error.message);
  }
}

getBooksByTitle("Things Fall Apart");
```

#### Get Book Reviews
```javascript
async function getBookReview(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/review/${isbn}`);
    console.log("Book reviews:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Could not retrieve reviews:`, error.message);
  }
}

getBookReview("1");
```

#### Chaining Multiple Requests
```javascript
async function getBookWithDetails(isbn) {
  try {
    const book = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    const reviews = await axios.get(`http://localhost:5000/review/${isbn}`);
    
    return {
      book: book.data,
      reviews: reviews.data
    };
  } catch (error) {
    console.error("Error fetching book details:", error.message);
  }
}

getBookWithDetails("1");
```

---

## Function Reference

### `get-books.js` Functions

All the following functions are implemented in `get-books.js`:

#### Promise Callback Functions
- **`getBooksWithCallback()`** - Retrieve all books using promise callbacks
- **`getBookByISBNWithCallback(isbn)`** - Get book by ISBN using promise callbacks
- **`getBooksByAuthorWithCallback(author)`** - Get books by author using promise callbacks
- **`getBooksByTitleWithCallback(title)`** - Get books by title using promise callbacks
- **`getBookReviewWithCallback(isbn)`** - Get book reviews using promise callbacks

#### Async/Await Functions
- **`getBooks()`** - Retrieve all books using async/await
- **`getBookByISBN(isbn)`** - Get book by ISBN using async/await
- **`getBooksByAuthor(author)`** - Get books by author using async/await
- **`getBooksByTitle(title)`** - Get books by title using async/await
- **`getBookReview(isbn)`** - Get book reviews using async/await

---

## Running the Demo

To run the complete demonstration:

```bash
node get-books.js
```

This will execute all async/await examples. To test the promise callback approach, uncomment the callback function calls in the `runDemo()` function.

---

## Key Differences: Callbacks vs Async/Await

| Feature | Promise Callbacks | Async/Await |
|---------|------------------|------------|
| **Readability** | Callback chains can be hard to read | Clean, linear code flow |
| **Error Handling** | `.catch()` for errors | `try/catch` blocks |
| **Return Values** | Can be tricky to return values | Simple return statements |
| **Browser Support** | Older browsers | ES2017+ or transpiled |
| **Recommendation** | Legacy code | Modern projects (recommended) |

---

## Error Handling Best Practices

### Promise Callbacks
```javascript
axios
  .get(url)
  .then((response) => {
    // Handle success
  })
  .catch((error) => {
    if (error.response) {
      // Server responded with error status
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("No response received");
    } else {
      // Error in request setup
      console.error("Error:", error.message);
    }
  });
```

### Async/Await
```javascript
async function fetchBooks() {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      console.error("No response received");
    } else {
      console.error("Error:", error.message);
    }
  }
}
```

---

## Tips & Tricks

1. **URL Encoding**: Spaces in author/title names should be URL-encoded:
   - Bad: `/author/Chinua Achebe`
   - Good: `/author/Chinua%20Achebe`

2. **Base URL**: Define a constant for your base URL:
   ```javascript
   const BASE_URL = "http://localhost:5000";
   ```

3. **Response Structure**: Axios wraps the actual data in `response.data`:
   ```javascript
   // ✓ Correct
   const books = response.data;
   
   // ✗ Wrong
   const books = response;
   ```

4. **Timeouts**: Add timeout configuration for long requests:
   ```javascript
   axios.get(url, { timeout: 5000 });
   ```

5. **Interceptors**: Centralize error handling with interceptors:
   ```javascript
   axios.interceptors.response.use(
     (response) => response,
     (error) => {
       console.error("API Error:", error);
       return Promise.reject(error);
     }
   );
   ```

---

## Summary

The `get-books.js` file provides complete implementations for retrieving books using both **promise callbacks** and **async/await** patterns. Modern JavaScript applications prefer **async/await** for its cleaner syntax and easier error handling, but both approaches are fully functional and demonstrated in the code.

Choose the pattern that best fits your project's needs and coding standards!
