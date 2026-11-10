# Quick Reference: Axios Book Retrieval

## Quick Start

### 1. Promise Callbacks (`.then()` / `.catch()`)
```javascript
const axios = require("axios");

axios
  .get("http://localhost:5000/isbn/1")
  .then(response => console.log(response.data))
  .catch(error => console.error(error.message));
```

### 2. Async/Await (Modern & Recommended)
```javascript
const axios = require("axios");

async function getBook() {
  try {
    const response = await axios.get("http://localhost:5000/isbn/1");
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

getBook();
```

---

## All Available Endpoints

| Purpose | Code (Async/Await) | Code (Callbacks) |
|---------|-------------------|-----------------|
| **Get All Books** | `await axios.get('http://localhost:5000/')` | `axios.get('...').then(...).catch(...)` |
| **Get by ISBN** | `await axios.get('http://localhost:5000/isbn/1')` | `.get('/isbn/1').then(...).catch(...)` |
| **Get by Author** | `await axios.get('http://localhost:5000/author/AuthorName')` | `.get('/author/Name').then(...).catch(...)` |
| **Get by Title** | `await axios.get('http://localhost:5000/title/BookTitle')` | `.get('/title/Title').then(...).catch(...)` |
| **Get Reviews** | `await axios.get('http://localhost:5000/review/1')` | `.get('/review/1').then(...).catch(...)` |

---

## Response Structure

All successful responses return data in `response.data`:

```javascript
// Axios wraps data in response object
const response = await axios.get(url);
console.log(response.data);  // ✓ Correct - actual data
console.log(response);       // ✗ Wrong - full response object
```

---

## Error Handling Patterns

### Async/Await
```javascript
try {
  const response = await axios.get(url);
  // Handle success
} catch (error) {
  if (error.response) {
    // Status like 404, 500
    console.error(error.response.status);
  } else if (error.request) {
    // Request made, no response
    console.error("No response from server");
  } else {
    // Setup error
    console.error(error.message);
  }
}
```

### Promise Callbacks
```javascript
axios.get(url)
  .then(response => { /* success */ })
  .catch(error => {
    if (error.response) {
      console.error(error.response.status);
    } else if (error.request) {
      console.error("No response");
    } else {
      console.error(error.message);
    }
  });
```

---

## Running Examples from get-books.js

```bash
# Run all async/await examples
node get-books.js

# To use callbacks, edit runDemo() and uncomment callback function calls
```

---

## When to Use Each Approach

| Use Callbacks if... | Use Async/Await if... |
|-------------------|----------------------|
| Supporting old browsers | Modern Node.js (v7.6+) |
| Legacy codebase | New projects |
| Learning promises | Need cleaner code |
| - | Chaining multiple requests |

---

## Common Mistakes to Avoid

❌ **Wrong:**
```javascript
const data = axios.get(url);  // Returns promise, not data!
const data = response;        // Should be response.data
```

✅ **Correct:**
```javascript
const response = await axios.get(url);
const data = response.data;
```

❌ **Wrong:**
```javascript
async function fetch() {
  return axios.get(url);  // Returns full response object
}
```

✅ **Correct:**
```javascript
async function fetch() {
  const response = await axios.get(url);
  return response.data;
}
```

---

## Chaining Multiple Requests

### Async/Await (Recommended)
```javascript
async function getBookWithReviews(isbn) {
  const book = await axios.get(`/isbn/${isbn}`);
  const reviews = await axios.get(`/review/${isbn}`);
  return { book: book.data, reviews: reviews.data };
}
```

### Promise Callbacks
```javascript
axios
  .get(`/isbn/1`)
  .then(book => 
    axios.get(`/review/1`).then(reviews => ({
      book: book.data,
      reviews: reviews.data
    }))
  )
  .catch(error => console.error(error));
```

---

## Tips

✨ Define base URL once:
```javascript
const BASE_URL = "http://localhost:5000";
const response = await axios.get(`${BASE_URL}/isbn/1`);
```

✨ URL encode spaces:
```javascript
// ✓ Correct
axios.get('/author/Chinua%20Achebe')

// ✗ Wrong
axios.get('/author/Chinua Achebe')
```

✨ Use descriptive variable names:
```javascript
// ✓ Clear
const bookResponse = await axios.get(`${BASE_URL}/isbn/${isbn}`);
const bookData = bookResponse.data;

// ✗ Vague
const res = await axios.get(url);
```

---

## Implementation File

All examples are fully implemented in: **`get-books.js`**

Functions available:
- `getBooks()` - Async/Await
- `getBookByISBN(isbn)` - Async/Await
- `getBooksByAuthor(author)` - Async/Await
- `getBooksByTitle(title)` - Async/Await
- `getBookReview(isbn)` - Async/Await
- `getBooksWithCallback()` - Callbacks
- `getBookByISBNWithCallback(isbn)` - Callbacks
- `getBooksByAuthorWithCallback(author)` - Callbacks
- `getBooksByTitleWithCallback(title)` - Callbacks
- `getBookReviewWithCallback(isbn)` - Callbacks

---

## Next Steps

1. ✅ Review `get-books.js` for complete implementations
2. ✅ Read `AXIOS_USAGE_GUIDE.md` for detailed examples
3. ✅ Run `node get-books.js` to test (ensure server is running on port 5000)
4. ✅ Customize functions for your specific needs
