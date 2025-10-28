import express from 'express';
import Product from '../models/Product.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';
const router = express.Router();

// Pública: ver productos
router.get('/', async (req, res) => {
  res.json(await Product.find());
});

// Solo admin: crear producto
router.post('/', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Solo administrador' });
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });
  await product.save();
  res.status(201).json(product);
});

// Solo admin: modificar producto
router.put('/:id', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Solo administrador' });
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// Solo admin: eliminar producto
router.delete('/:id', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Solo administrador' });
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Producto eliminado" });
});

export default router;
