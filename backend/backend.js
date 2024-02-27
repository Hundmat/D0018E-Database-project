import express, { json } from "express"
import mysql2 from "mysql2"
import cors from "cors"
import bcrypt from 'bcrypt'
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
const { verify } = jwt;

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
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(cookieParser());


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

// Get browse content
app.get("/browse", (req, res) => {

    const prods = [];

    // Get all products
    const p = "SELECT * FROM product";
    db.query(p, (err, data) => {
        if (err) return res.json(err);
        data.forEach((prod) => {
            prods.push(prod);
        });
    });

    // Get all categories
    const c = "SELECT * FROM category";
    db.query(c, (err, data) => {
        if (err) return res.json(err);
        prods.forEach((prod) => {
            data.forEach((cat) => {
                if (prod.productRelation === cat.product_productRelation) {
                    prod.nameCat = cat.nameCat;
                    prod.brand = cat.brand;
                    prod.typeCat = cat.typeCat;
                }
            });
        });
    });

    // Get average rating for each product
    const r = "SELECT rating, productID FROM userreviews";
    db.query(r, (err, data) => {
        if (err) return res.json(err);
        prods.forEach((prod) => {
            var sum = 0;
            var count = 0;
            data.forEach((rev) => {
                if (prod.idProduct === rev.productID) {
                    sum += parseFloat(rev.rating);
                    count++;
                }
            });
            if (count === 0) prod.averageRating = 0;
            else prod.averageRating = (sum / count);
            sum, count = 0;
        });
        //console.log(prods);
        return res.json(prods);
    });
});


app.post("/order", (req, res) => {
    //console.log(req.body);
    
    const q = `CREATE TABLE IF NOT EXISTS \`${req.body.orderID}\` (orderID INT AUTO_INCREMENT PRIMARY KEY, fullName VARCHAR(50), email VARCHAR(100), address VARCHAR(100), city VARCHAR(50), country VARCHAR(50), zip VARCHAR(50), productID INT, quantity INT,price DECIMAL(6,2), FOREIGN KEY (productID) REFERENCES product(idProduct))` ;
    
    db.query(q, (err, data) => {
        
        if (err) return res.json(err,"Error creating table");
    });

    const c = `INSERT INTO \`${req.body.orderID}\` (fullName,email,address,city,country,zip) VALUES (?)`;
    const values = [
        req.body.fullName,
        req.body.email,
        req.body.address,
        req.body.city,
        req.body.country,
        req.body.zip,
    ];
    //console.log(values);
    db.query(c, [values], (err, insertResult) => {
        if (err) return res.json(err);
        
    });

    const a = "INSERT INTO `e-commerce`.order (`idOrder`, `customer_idCustomer`) VALUES (?)";
    const values2 = [
        req.body.orderID,
        req.body.userID,
    ];

    db.query(a, [values2], (err, data2) => {
        if (err) return res.json(err);
        return res.json("Order has been added");
    });

});   

app.post("/orderProducts", (req, res) => {
    if (!req.body) return res.json("No products to order");
    
    for (let i = 0; i < req.body.length; i++) {
        const q = `INSERT INTO \`${req.body[i].orderID}\` (productID,quantity,price) VALUES (?)`;
        const values = [
            JSON.stringify(req.body[i].productID),
            JSON.stringify(req.body[i].quantity),
            req.body[i].price
        ];
        //console.log(values);
    
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
        });
    
    }
    return res.json("Order has been added");
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

// Get specified category
app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    const q = `SELECT * FROM category WHERE product_productRelation = ${id}`;
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add product to cart from product page
app.post('/product/addToCart/:uid/:pid', (req, res) => {

    // params
    const pid = req.params.pid;
    const user = req.params.uid;
    var quant;

    // check if product exists
    const check = "SELECT * FROM cart WHERE productID = ? AND userID = ?";
    db.query(check, [pid, user], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {

            quant = parseInt(data[0].quantity) + 1;

            const q = "UPDATE cart SET `quantity` = (?) WHERE `productID` = (?) AND `userID` = (?)";

            const values = [
                req.body.quantity = quant,
                req.body.productID = pid,
                req.body.userID = user
            ];

            db.query(q, values, (err, data) => {
                if (err) return res.json(err);
                //console.log("updated");
                return res.json("Product quantity has been updated");
            });
        } else {

            const q = "INSERT INTO cart (`quantity`, `productID`, `userID`) VALUES (?)";

            const values = [
                req.body.quantity = "1",
                req.body.product_idProduct = pid,
                req.body.userID = user
            ];

            db.query(q, [values], (err, data) => {
                if (err) return res.json(err);
                //console.log("inserted");
                return res.json("Product has been added to cart");
            })
        }
    });
});

// Get all reviews for a product
app.get('/reviews/:id', (req, res) => {
    const id = req.params.id;
    const q = `SELECT * FROM userreviews WHERE productID = ${id}`;

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/post/addReviews', (req, res) => {

    const user = req.body.username;

    const q = "INSERT INTO userreviews (`comment`,`rating`,`productID`,`userName`) VALUES (?,?,?,?)";

    for (const [key, value] of Object.entries(req.body.reviews)) {
        
        const values = [
            value,
            parseFloat(req.body.ratings[key]),
            parseInt(key),
            user
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.json(err);
        });
    }

    return res.json("reviews added successfully!");
});

// #endregion Browse/Product

// #region Cart

app.post("/cat", (req, res) => {
    const q = "SELECT * FROM category WHERE product_productRelation = (?)";
    const values = [req.body.id]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.post("/products", (req, res) => {


    const q = "SELECT * FROM product WHERE idProduct = (?)";
    //console.log(req.body.id)
    const values = [
        req.body.id
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/cart", (req, res) => {
    const q = "SELECT * FROM cart WHERE userID = ?";
    //console.log(req.body.userID)
    const userID = req.body.userID; // Assuming e contains the userID
    db.query(q, [userID], (err, data) => {
        if (err) {
            console.error("Error fetching cart:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        //console.log(data);
        return res.json(data);
    });
});




// #endregion Sign up/Login

app.post("/signup", async (req, res) => {
    const { email, name, password } = req.body;

    const hashedpwd = await bcrypt.hash(password, 10);

    const q = "INSERT INTO login (`email`,`name`,`password`) VALUES (?,?,?)"
    const values = [email, name, hashedpwd];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Sorry det där gick inge bra", err);
            return res.status(500).json({ error: "Nåt gick snett" });
        }
        const id = data.insertId;
        addCustomer(id);
        return res.json("Sign Up Successful")
    })
})

const addCustomer = async (id) => {
    try {
        const q = "INSERT INTO customer (idCustomer) VALUES (?)"; // Assuming 'customer' is your table name
        db.query(q, [id]); // Assuming you're using a database connection named 'db'
        console.log("Customer added successfully");
    } catch (error) {
        console.error("Failed to add customer:", error);
        // Handle error appropriately, you might want to throw the error or return a meaningful value
    }
}


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
        const isAdmin = data[0].isAdmin;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            const userId = data[0].userId
            const email = data[0].email;
            const name = data[0].name
            const token = jwt.sign({ email, name, userId }, "our-secret-cookie-password-hehe", { expiresIn: '1h' });
            const updateQuery = "UPDATE login SET token = ? WHERE email = ?";
            const updateValues = [token, email];

            db.query(updateQuery, updateValues, (updateErr, updateResult) => {
                if (updateErr) {
                    console.error("Error updating token in the database:", updateErr);
                    return res.status(500).json({ error: "Error updating token in the database" });
                }

                res.cookie('token', token, { httpOnly: true, sameSite: true });

                return res.json({ message: "Login successful", isAdmin});
            });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    })
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Message: "No cookie detected. Login please" })
    } else {
        jwt.verify(token, "our-secret-cookie-password-hehe", (err, decoded) => {
            if (err) {
                return res.json({ Message: "Authentication Error." })
            } else {
                req.email = decoded.email;
                req.name = decoded.name;
                req.userId = decoded.userId
                next();
            }

        })
    }
}
app.get("/auth", verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name, userId: req.userId })
});



app.post("/newProduct", (req, res) => {


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
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Product has been created succesfully");
    });



});

app.post("/removeProduct", (req, res) => {
    //console.log(req.body.e.PID);
    if (req.body.e.PID === "null"){
        const q = "DELETE FROM cart WHERE userID = ? ";
        const values = [req.body.e.userID];
        db.query(q, values, (err, data) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json("Product has been removed successfully");
        });
    } else{
        const q = "DELETE FROM cart WHERE productID = ? AND userID = ? ";
        const values = [req.body.e.PID, req.body.e.userID];
        db.query(q, values, (err, data) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json("Product has been removed successfully");
        });
    };
});


app.post("/updateStock", (req, res) => {
    //console.log(req.body);
    
    const c = "SELECT stock FROM `e-commerce`.product WHERE idProduct = ?";
    const values = [req.body.idProduct];
    var tmpStock;
    
    db.query(c, values, (err, data) => {
        if (err) {
            console.log(err);
        }
       
        tmpStock = parseInt(data[0].stock)-parseInt(req.body.removeAmount);
        //console.log(tmpStock);

        const q = "UPDATE `e-commerce`.product SET stock = ? WHERE idProduct = ?";
        const values2 = [tmpStock, req.body.idProduct];
        db.query(q, values2, (err, data) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json("Stock has been updated successfully");
        });
    }); 
});



app.post("/newCat", (req, res) => {
    const query = "INSERT INTO category (`nameCat`,`brand`,`typeCat`,`product_productRelation`) VALUES (?)";

    const product_productRelation = req.body.productRelation
    const values = [
        req.body.nameCat,
        req.body.brand,
        req.body.typeCat,
        product_productRelation
    ]
    //console.log(values)

    db.query(query, [values], (err, data) => {

        if (err == "ER_DUP_ENTRY") return res.json("Category has been created succesfully");
        if (err) return res.json(err);
    });
});

app.get("/getOrder", (req, res) => {
    const userID = req.query.userID; // Retrieve userID from query parameters
    const q = "SELECT * FROM `e-commerce`.order WHERE customer_idCustomer = ?";
    db.query(q, [userID], (err, data) => {
        if (err) {
            console.error("Error fetching cart:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log(data);
        return res.json(data);
    });
});

app.get("/getOrders", (req, res) => {
    const tableName = req.query.tableName;
    const q = `SELECT * FROM \`e-commerce\`.\`${tableName}\``; // Enclose schema and table names in backticks
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});


app.post("/post/:oid", (req, res) => {

    const orderID = req.params.oid; // order ID

    // Get products from selected order
    const q = `
    SELECT product.idProduct, product.name, product.price, product.image, product.sex, product.size, category.brand
    FROM product 
    INNER JOIN category 
    ON product.productRelation = category.product_productRelation
    WHERE idProduct IN (
        SELECT productID 
        FROM \`e-commerce\`.\`${orderID}\` 
        WHERE productID IS NOT NULL
    );`;


    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching order:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        } else { 
            return res.json(data);
        }
    });
});


// Start API
app.listen(8800, () => {
    console.log("Connected to backend!");
});
