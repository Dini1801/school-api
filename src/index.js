const express = require('express');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');


dotenv.config();
const app = express();

app.use(express.json()); // Required to parse JSON request bodies

app.use('/', schoolRoutes); // Mount your school routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
