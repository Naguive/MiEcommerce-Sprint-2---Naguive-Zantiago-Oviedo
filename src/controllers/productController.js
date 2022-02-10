const fetch = require("node-fetch");
// let products = require("../database/products");
const { response } = require("express");
const { includes } = require("../middlewares/validarLoginMiddleware");
const ProductModel = require("../models/ProductModel");

module.exports = {
  findProducts: (req, res) => {
    fetch("https://dhfakestore.herokuapp.com/api/products")
      .then((response) => response.json())
      .then((productosSugeridos) => {
        return res.render("product", { productosSugeridos });
      });
  },

  findProductById: async (req, res) => {
    let idProduct = req.params.id;
    const productToShow = await ProductModel.filterProductById(idProduct);
    res.render("productId", { productToShow });
  },

  //PRODUCTOS SUGERIDOS//              //url para esta función =>   /products/api/product/suggested
  findProductsSuggested: async (req, res) => {
    let url = "https://dhfakestore.herokuapp.com/api/products";
    fetch(url);
    let response = await fetch(url);
    let data = await response.json();

    // Código que trae los productos con valor True  //
    let trueSuggested = await data.filter((data) => data.mostwanted == true);

    trueSuggested = [
      trueSuggested[0],
      trueSuggested[1],
      trueSuggested[2],
      trueSuggested[3],
      trueSuggested[4],
    ];
    return res.render("product", {
      trueSuggested,
    });
  },

  //          /api/products/:id/related         //
  findProductsRelatedById: async (req, res) => {
    let productosSugeridos = [];
    let id = req.params.id;
    console.log(id);
    let url =
      "http://dhfakestore.herokuapp.com/api/products/" + id + "/related";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let productosRelacionados = [];
        console.log(data);
        for (let index = 0; index <= 4; index++) {
          if (data.length > index) {
            productosRelacionados.push(data[index]);
          }
        }
        console.log(productosRelacionados);
        return res.render("productRelated", {
          productosRelacionados,
          productosSugeridos,
        });
      });
  },
  getAllProducts: async (req, res) => {
    let url = "https://dhfakestore.herokuapp.com/api/products";
    fetch(url);
    let response = await fetch(url);
    let data = await response.json();

    return res.render("allProducts", {
      data,
    });
  },
  findProductsMostWanted: (req, res) => {},
};
