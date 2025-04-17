const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Import route files
const clientAPI = require("./routes/clientAPI");
const advertisementAPI = require("./routes/advertisement"); // ✅ This is the updated one
const adminAPI = require("./routes/adminAPI");
const companyAPI = require("./routes/companyAPI");
const applicationAPI = require("./routes/applicationAPI");

// Use routes
app.use("/api/client", clientAPI);
app.use("/api/advertisements", advertisementAPI); // ✅ Updated base path
app.use("/api/admin", adminAPI);
app.use("/api/company", companyAPI);
app.use("/api/application", applicationAPI);
app.use("/api/advertisement", advertisementAPI);


// Start the server
app.listen(3001, () => {
  console.log(`Backend server started on port 3001`);
});
