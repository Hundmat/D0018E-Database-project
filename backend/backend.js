import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express();

const db = mysql2.createConnection({
    host:"localhost",
    user: "root",
    password: "Databas123",
    database: "test"
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("This is the backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
        const q = "INSERT INTO books (`title`, `desc`) VALUES (?)";

        const values = [
            "title from backend", 
            "desc from backend"
        ];

        db.query(q, [values], (err, data) =>{
            if(err) return res.json(err);
            return res.json("Book has been created");
        });
});

app.listen(8800, () => {
    console.log("Connected to backend!");
});