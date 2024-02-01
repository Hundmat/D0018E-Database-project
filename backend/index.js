import express from 'express'
import mysql from 'mysql2'
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"tooraf!",
    database:"e-commerce"
});

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json('Hello This is the backend!')
});  

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books";
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


    const q = "INSERT INTO product (`name`,`price`,`image`,`prodDescription`,`sex`,`productRelation`,`size`,`stock`) VALUES (?)";
    const values = [
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
    });

    

});



app.post("/newCat",(req,res)=>{
    const q = "INSERT INTO category (`nameCat`,`brand`,`typeCat`) VALUES (?)";

    const values =[
        req.body.nameCat,
        req.body.brand,
        req.body.typeCat,
    ]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Category has been created succesfully");
    });
});


app.listen(8800, () => {
    console.log('Backend server is running!')   
});