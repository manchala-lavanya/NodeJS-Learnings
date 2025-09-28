const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const db = require("./app/models")
const Role = db.role;

const app = express();

const corsOptions = {
    origin: "http://localhost:5000"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to JWT Authentication using nodeJS")
})

const connectDb = async () => {
    try {
        await db.mongoose
            .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        console.log("Successfully connected to DB");
        setInitialRolesInDB();
    } catch (error) {
        console.error("Error", error);
        process.exit();
    }
}

connectDb();

async function setInitialRolesInDB() {
    try {
        const count = await Role.estimatedDocumentCount();
        if(count === 0){
            await new Role({ name: "User" }).save();
            console.log("'User' role created successfully");

            await new Role({ name: "Admin" }).save();
            console.log("'Admin' role created successfully");

            await new Role({ name: "Moderator" }).save();
            console.log("'Moderator' role created successfully");
        }
    } catch (error) {
        console.error("Error in setting initial roles:", error);
    }
}

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
