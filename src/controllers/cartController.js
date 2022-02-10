const CartModel = require("../models/CartModel");

module.exports = {
  findCartByUser: (req, res) => {
    let user = req.params.user;
    user = Number(user);
    carritoByUser = CartModel.filterOwnCartById(user);
    res.render("cart", { carritoByUser, user });
  },

  addElementToCartByUser: (req, res) => {
    let user = req.params.user;
    let idProduct = req.query.p;
    (user = Number(user)), (idProduct = Number(idProduct));
    carritoByUser = CartModel.addProduct(user, idProduct);
    res.render("cart", { carritoByUser, user });
  },

  substractElementFromCartByUser: (req, res) => {
    let user = req.params.user;
    let idProduct = req.query.p;
    (user = Number(user)), (idProduct = Number(idProduct));
    carritoByUser = CartModel.deleteProduct(user, idProduct);
    res.render("cart", { carritoByUser, user });
  },
};
