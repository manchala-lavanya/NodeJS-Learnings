const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware to parse JSON data sent in the request body
app.use(express.json()); 

// Connect to MongoDB database named 'userDB' running locally
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB")) //success
.catch((err) => console.error("MongoDB connection error:", err)); //error

//Define a schema for User documents in MongoDB
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, //User's name
    age: { type: Number, required: true }, //User's age
});

// Create a model from the schema to interact with 'users' collection
const User = mongoose.model("User", userSchema);

// POST route to add a new user
app.post("/user", async (req, res) => {
    try {
        const { name, age } = req.body; // Extract name and age from request body

        // Check if name and age are provided
        if (!name || !age) {
            return res.status(400).send("Name and age are required.");
        }

        // Create a new User instance with provided data
        const newUser = new User({ name, age });
        // Save the new user to the database
        await newUser.save();

         // Send success response with the created user data
        res.status(201).json({ message: "User created", user: newUser });
    } catch (err) {
        console.error(err);
        // Send server error response if something goes wrong
        res.status(500).send("Server error");
    }
});

// GET route to fetch all users from the database
app.get("/users", async (_, res) => {
    try {
        // Find all user documents
        const users = await User.find();
        // Send back the list of users as JSON
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        // Send server error response if something goes wrong
        res.status(500).send("Server error");
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
