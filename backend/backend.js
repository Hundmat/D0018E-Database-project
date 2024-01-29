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

app.get("/browse", (req, res) => {
    const q = "SELECT * FROM products";
    db.query(q, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/products", (req, res) => {
        const q = "INSERT INTO products (`brand`, `name`, `desc`, `price`, `stock`, `size`, `image`, `sex`) VALUES (?)";

        const values = [
            req.body.brand,
            req.body.name,
            req.body.desc,
            req.body.price,
            req.body.stock,
            req.body.size,
            req.body.image,
            req.body.sex
        ];

        db.query(q, [values], (err, data) =>{
            if(err) return res.json(err);
            return res.json("Product has been added");
        });
});

app.listen(8800, () => {
    console.log("Connected to backend!");
});