const express = require("express");
const { ProductManager } = require("./productManager");


const app = express();
const PORT = 8080;

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
  try {
    let productsList = await productManager.getProducts();
    res.json(productsList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let product = await productManager.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: `El producto con el ID ${id} no existe` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});


app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit)) {
      let productsList = await productManager.getProducts();
      let limitedProducts = productsList.slice(0, limit);
      res.json(limitedProducts);
    } else {
      res.status(400).json({ error: "El parámetro 'limit' no es válido" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
