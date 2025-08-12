require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./Config/db")
const authRoutes = require("./routes/authRouter");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRouters");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

// Middleware to handle CORS 
app.use(
    cors({
        origin : process.env.CLIENT_URL ,
        methods : ["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// server uploards folder 
app.use("/uploards",express.static(path.join(__dirname,"uploards")));

const PORT = process.env.PORT || 5000; 
app.listen(PORT,()=> console.log(`Server Started on port ${PORT}`));
