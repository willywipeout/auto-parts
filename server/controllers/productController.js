const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  res.json(products);
};

const createProduct = async (req, res) => {
  const { name, description, price, quantity, categoryId } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, description, price, quantity, categoryId },
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

module.exports = { getProducts, createProduct };
