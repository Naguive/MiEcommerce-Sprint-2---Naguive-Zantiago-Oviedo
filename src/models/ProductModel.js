const fetch = require("node-fetch");
const URL = "https://dhfakestore.herokuapp.com/api/products/";

const Products = {
  getAllProducts: async () => {
    const products = await fetch(URL);
    const productDetail = await products.json();
    return productDetail;
  },
  filterProductById: async (id) => {
    const productsImported = await Products.getAllProducts();
    const productFiltred = await productsImported.find(
      (product) => product._id === id
    );
    return productFiltred;
  },
};

// Products.filterProductById("6191cb984f875644e0b8e99b");
module.exports = Products;
