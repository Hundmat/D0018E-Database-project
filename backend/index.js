import express from "express"
import mysql from "mysql2"
import cors from "cors"


const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Daniel123",
    database: "e-commerce"
})

// MIDDLE WARE
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json("Hello this is the backend")
})

app.get("/product", (req, res) => {
    const q = "SELECT * FROM `e-commerce`.product;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

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

app.get("/browse", (req, res) => {
    const q = "SELECT * FROM product";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Get specified product
app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    const q = `SELECT * FROM product WHERE idProduct = ${id}`;
    db.query(q, (err, data) => {
        if (err) return res.json(err);
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

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Product has been added");
    });
});



app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been added")
    })
})


app.listen(8800, () => {
    console.log("Connected to backend!")
})