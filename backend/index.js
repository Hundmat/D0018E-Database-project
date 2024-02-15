import express from 'express'
import mysql from 'mysql2'
import cors from "cors"
import dotenv from "dotenv"



// MIDDLE WARE
app.use(express.json())
app.use(cors())

const app = express()
dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


app.get("/", (req, res) => {
    res.json("Hello this is the backend")
});

app.get("/product", (req, res) => {
    const q = "SELECT * FROM `e-commerce`.product;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
});

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
    });
});



app.post("/cart", (req, res) => {
    const q = "INSERT INTO  cart (`idCart`,`quantity`,`PID`) VALUES (?)";
    const values = [
        req.body.idCart = "123",
        req.body.quantity = "2",
        req.body.PID = "456",
    ];
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Order has been added")
    });
});

app.get("/browse", (req, res) => {
    const q = "SELECT * FROM product";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.get('/', (req, res) => {
    res.json('Hello This is the backend!')
});  

app.post("/cat",(req,res)=>{
    const q = "SELECT * FROM category WHERE product_productRelation = (?)";
    const values = [req.body.id]
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post("/products",(req,res)=>{
    

    const q = "SELECT * FROM product WHERE idProduct = (?)";
    const c = "SELECT * FROM category WHERE product_productRelation = (?)";
    console.log(req.body.id)
    const values = [
        req.body.id
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
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




app.get("/cart",(req,res)=>{
    const q = "SELECT * FROM cart";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post("/books",(req,res)=>{
    const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created succesfully");
    });
});

app.post("/newProduct",(req,res)=>{


    const q = "INSERT INTO product (`idProduct`,`name`,`price`,`image`,`prodDescription`,`sex`,`productRelation`,`size`,`stock`) VALUES (?)";
    const values = [
        req.body.idProduct,
        req.body.name,
        req.body.price,
        req.body.image,
        req.body.prodDescription,
        req.body.sex,
        req.body.productRelation,
        req.body.size,
        req.body.stock
    ]
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Product has been created succesfully");
    });

    

});

app.post("/removeProduct", (req, res) => {
    const q = "DELETE FROM cart WHERE product_idProduct = ?";
    const values = [req.body.id];


    db.query(q, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json("Product has been removed successfully");
    });
});



app.post("/newCat",(req,res)=>{
    const query = "INSERT INTO category (`nameCat`,`brand`,`typeCat`,`product_productRelation`) VALUES (?)";
    
    const product_productRelation=req.body.productRelation
    const values =[
        req.body.nameCat,
        req.body.brand,
        req.body.typeCat,
        product_productRelation
    ]
    console.log(values)

    db.query(query,[values], (err,data)=>{
        
        if(err=="ER_DUP_ENTRY") return res.json("Category has been created succesfully");
        if(err) return res.json(err);
    });
});


app.listen(8800, () => {
    console.log('Backend server is running!')   
});
