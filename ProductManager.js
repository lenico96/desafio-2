const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProductsFromFile();

    // Asignar un id autoincrementable
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    const newProduct = { id: lastProductId + 1, ...product };

    products.push(newProduct);
    this.saveProductsToFile(products);

    console.log('Producto agregado.');
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find(p => p.id === id);

    if (product) {
      return product;
    } else {
      console.error(`Error: producto id "${id}" no encontrado.`);
    }
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      this.saveProductsToFile(products);

      console.log(`producto id "${id}" actualizado.`);
    } else {
      console.error(`Error: producto id "${id}" no encontrado.`);
    }
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      this.saveProductsToFile(products);

      console.log(`prodcuto id "${id}" eliminado.`);
    } else {
      console.error(`Error: producto id "${id}" no encontrado.`);
    }
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si ocurre un error al leer el archivo, se devuelve un arreglo vacío
      return [];
    }
  }

  saveProductsToFile(products) {
    try {
      const data = JSON.stringify(products, null, 2);
      fs.writeFileSync(this.path, data);
    } catch (error) {
      console.error('error al guardar productos en el archivo:', error);
    }
  }
}
