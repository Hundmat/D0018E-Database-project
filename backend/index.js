import express from 'express'
import mysql from 'mysql2'
import cors from "cors"
import dotenv from "dotenv"

const app = express()
dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.use(express.json())
app.use(cors())

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