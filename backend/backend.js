import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

// Express
const app = express();

// mySQL
const db = mysql2.createConnection({
    host:"34.32.57.134",
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

// #region Home

app.get("/product", (req, res) => {
    const q = "SELECT * FROM `e-commerce`.product;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// #endregion Home

// #region Browse/Product

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

// #endregion Browse/Product

// #region Cart

app.post("/cart", (req, res) => {
    const q = "INSERT INTO  cart (`idCart`,`quantity`,`PID`) VALUES (?)"
    const values = [
        req.body.idCart = "123",
        req.body.quantity = "2",
        req.body.PID = "456",
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Order has been added")
    })
})

// #endregion Cart

app.post("/order", (req, res) => {
    const q = "INSERT INTO  order (`idOrder`,`Quantity`,`customer_idCustomer`, `product_idProduct`) VALUES (?)"
    const values = [
        req.body.idOrder = "123",
        req.body.Quantity = "FAN VA BRA SIDA",
        req.body.customer_idCustomer = "456",
        req.body.product_idProduct = "789",
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Order has been added")
    })
})

// Start API
app.listen(8800, () => {
    console.log("Connected to backend!");
});