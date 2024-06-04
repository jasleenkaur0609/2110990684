const express = require('express');
const axios = require('axios');
const app = express();
const port = 8081;

let windowSize = 10;
let numbersWindow = [];

// Function to fetch numbers from the Test Server
const fetchNumbers = async (type) => {
  const url = `http://20.244.56.144/test/${type}`;
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Function to update the sliding window with new numbers
const updateWindow = (newNumbers) => {
  const uniqueNumbers = [...new Set([...numbersWindow, ...newNumbers])];
  if (uniqueNumbers.length > windowSize) {
    uniqueNumbers.splice(0, uniqueNumbers.length - windowSize);
  }
  numbersWindow = uniqueNumbers;
};

// Endpoint to handle requests for different number types
app.get('/numbers/:type', async (req, res) => {
  const type = req.params.type;
  const validTypes = ['prime', 'fibo', 'even', 'rand'];
  if (!validTypes.includes(type)) {
    return res.status(400).send('Invalid number type');
  }

  const newNumbers = await fetchNumbers(type);
  const prevState = [...numbersWindow];
  updateWindow(newNumbers);

  const avg = numbersWindow.reduce((acc, num) => acc + num, 0) / numbersWindow.length;
  res.json({
    windowPrevState: prevState,
    windowCurrState: numbersWindow,
    numbers: newNumbers,
    avg: avg.toFixed(2)
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
