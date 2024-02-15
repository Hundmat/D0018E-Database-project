import express from "express"
import mysql2 from "mysql2"
import cors from "cors"
import bcrypt from 'bcrypt';
import dotenv from "dotenv"

const app = express()
dotenv.config()

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
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

// #endregion Sign up/Login

app.post("/signup", async (req, res) => {
    const { email, name, lastname, password } = req.body;

    const hashedpwd = await bcrypt.hash(password, 10);

    const q = "INSERT INTO login (`email`,`name`,`lastname`,`password`) VALUES (?,?,?,?)"
    const values = [email, name, lastname, hashedpwd];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Sorry det där gick inge bra", err);
            return res.status(500).json({ error: "Nåt gick snett" });
        }
        return res.json("Sign Up Successful")
    })
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const q = "SELECT * FROM login WHERE email = ?";
    const values = [email];

    db.query(q, values, async (err, data) => {
        if (err) {
            console.error("Servers are having problems atm hehe sorry:", err);
            return res.status(500).json({ error: "Potato servers atm, try again" });
        }

        if (data.length === 0) {
            return res.status(401).json({ error: "Wrong login credentials" });
        }
        const hashedPassword = data[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            return res.json("Login successful");
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    })
})


// Start API
app.listen(8800, () => {
    console.log("Connected to backend!");
});