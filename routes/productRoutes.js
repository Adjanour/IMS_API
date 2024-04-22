import  express  from 'express';
const productRouter = express.Router();
import pkg from 'mongodb';
const  ObjectID  = pkg.ObjectId;
import { Product } from '../models/product.js';

// GET all products (with optional filtering)
productRouter.get('/products', async (req, res) => {
  try {
    const filters = {};
    if (req.query.name) { 
      filters.name = { $regex: req.query.name, $options: 'i' }; 
    }
    if (req.query.type){
      filters.type = {$regex: req.query.type,$options:'i'}
    }
    if (req.query.category) {
      filters.categories = req.query.category;
    }

    const products = await Product.find(filters).sort({ name: 1 }).toArray();
    res.json(products); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single product by ID
productRouter.get('/products/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    if (!ObjectID.isValid(req.params.id)) { 
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const product = await Product.findOne({ _id: new ObjectID(req.params.id) });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Create a new product
productRouter.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.insertOne(req.body);
    res.status(201).json({ _id: newProduct.insertedId }); 
  } catch (err) {
    res.status(400).json({ error: err.message }); 
  }
});

// PUT: Update an existing product by ID
productRouter.put('/products/:id', async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) { 
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const updateResult = await Product
                            .updateOne({ _id: new ObjectID(req.params.id) }, { $set: req.body });
    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' }); 
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Delete a product by ID
productRouter.delete('/products/:id', async (req, res) => {
    try {
        if (!ObjectID.isValid(req.params.id)) { 
          return res.status(400).json({ error: 'Invalid product ID' });
        }
        const updateResult = await Product
                                .deleteOne({ _id: new ObjectID(req.params.id) }, { $set: req.body });
        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ error: 'Product not found' }); 
        }
        res.status(204).send();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

export default productRouter;
