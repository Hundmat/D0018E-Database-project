import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

// Express
const app = express();

// mySQL
const db = mysql2.createConnection({
    host:"localhost",
    user: "root",
    password: "Databas123",
    database: "e-commerce"
});

// Config
app.use(express.json());
app.use(cors());

// Default
app.get("/", (req, res) => {
    res.json("This is the backend");
});

// Get all products
app.get("/browse", (req, res) => {
    const q = "SELECT * FROM product";
    db.query(q, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

// Get specified product
app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    const q = `SELECT * FROM product WHERE idProduct = ${id}`;
    db.query(q, (err, data) =>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

// Create new product entry
app.post("/products", (req, res) => {
        const q = "INSERT INTO product (`name`, `prodDescription`, `price`, `stock`, `size`, `image`, `sex`, `idCat`) VALUES (?)";

        const values = [
            req.body.name,
            req.body.prodDescription,
            req.body.price,
            req.body.stock,
            req.body.size,
            req.body.image,
            req.body.sex,
            req.body.idCat
        ];

        db.query(q, [values], (err, data) =>{
            if(err) return res.json(err);
            return res.json("Product has been added");
        });
});

// Start API
app.listen(8800, () => {
    console.log("Connected to backend!");
});