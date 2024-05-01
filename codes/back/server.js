import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';

const app = express(); 

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use(express.static('public'));


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });  



app.get("/", (req, res) => {
    res.send("hii mahesh solanki");
  });

  
  const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Mahesh@123",
    database: "my_database",
  });
  
  // Attempt to connect to the database
  db.connect((error) => {
    if (error) {
      console.error("MySQL connection error:", error);
      return;
    }
    console.log("Connected to MySQL server");
  });


  // Define a route to fetch categories
app.get("/categories", (req, res) => {
    // SQL query to select cate_id and cate_name from the category table
    const query = "SELECT * FROM category";

    // Execute the query
    db.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching categories:", error);
            res.status(500).json({ error: "Failed to fetch categories" });
            return;
        }

        // If query is successful, send the results as JSON response
        res.json(results);
        console.log("hii mahesh")
    });
});


app.get("/Allproductss", (req, res) => {
  // SQL query to select cate_id and cate_name from the category table
  const query = "SELECT * FROM products";

  // Execute the query
  db.query(query, (error, results) => {
      if (error) {
          console.error("Error fetching prodcuts:", error);
          res.status(500).json({ error: "Failed to fetch prodcuts" });
          return;
      }

      // If query is successful, send the results as JSON response
      res.json(results);

  });
});



app.post('/submit-product', upload.single('image'), (req, res) => {
  // Check if an image was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  // Extract product data from the request body
  const { productName, category, description, color1, color2 , price, country } = req.body;
  
  // Extract the filename of the uploaded image
  const imageName = req.file.filename;

  // Log the extracted data
  console.log('Product Name:', productName);
  console.log('Category:', category);
  console.log('Description:', description);
  console.log('Color 1:', color1);
  console.log('Color 2:', color2);
  console.log('price:', price);
  console.log('Image Name:', imageName);
  console.log("country",country)

  // Insert the data into the 'products' table
  const query = `INSERT INTO products (category_id, name, \`desc\`, images, color1, color2, price, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [category, productName, description, imageName, color1, color2, price, country], (error, result) => {
    if (error) {
      console.error('Error inserting data into products table:', error);
      return res.status(500).json({ error: 'Failed to submit product' });
    }
    console.log('Product submitted successfully');
    res.status(200).json({ message: 'Product submitted successfully', imageName });
  });
});


app.get('/products', (req, res) => {
  // Define the query to select products along with their category names
  const query = `
    SELECT 
      p.products_id,
      p.name,
      p.desc,
      p.images,
      p.color1,
      p.color2,
      p.price,
      p.country,
      c.cate_name AS cate_name
    FROM 
      products p
    INNER JOIN 
      category c ON p.category_id = c.cate_id
  `;

  // Execute the query
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    
    // If query is successful, send the results as JSON response
    res.status(200).json(results);
  });
});




app.get('/products-cate1', (req, res) => {
  const categoryId = 1;

  // Define the query to select products where category_id is 1
  const query = `
    SELECT 
      products_id,
      name,
      \`desc\`,
      images,
      color1,
      color2,
      price
    FROM 
      products
    WHERE
      category_id = ?
  `;

  // Execute the query with the provided categoryId (1 in this case)
  db.query(query, [categoryId], (error, results) => {
    if (error) {
      console.error('Error fetching products by category:', error);
      return res.status(500).json({ error: 'Failed to fetch products by category' });
    }
    
    // If query is successful, send the results as JSON response
    res.status(200).json(results);
  });
});




app.get('/products-cate2', (req, res) => {
  const categoryId = 2;

  // Define the query to select products where category_id is 1
  const query = `
    SELECT 
      products_id,
      name,
      \`desc\`,
      images,
      color1,
      color2,
      price
    FROM 
      products
    WHERE
      category_id = ?
  `;

  // Execute the query with the provided categoryId (1 in this case)
  db.query(query, [categoryId], (error, results) => {
    if (error) {
      console.error('Error fetching products by category:', error);
      return res.status(500).json({ error: 'Failed to fetch products by category' });
    }
    
    // If query is successful, send the results as JSON response
    res.status(200).json(results);
  });
});




app.get('/prodetails/:id', (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  // SQL query to fetch product details
  const sql = `SELECT * FROM products WHERE products_id = ?`;

  // Execute the query with the provided ID
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product details:', err);
      res.status(500).json({ error: 'Error fetching product details' });
    } else {
      if (results.length > 0) {
        // Product found, send details in the response
        res.json(results[0]); // Assuming you want to send only the first result
      } else {
        // Product not found with the provided ID
        res.status(404).json({ error: 'Product not found' });
      }
    }
  });
});





const PORT = process.env.PORT || 9000;


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



