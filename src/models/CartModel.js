const fs = require("fs");
const path = require("path");

const Cart = {
  fileLocation: path.resolve(__dirname, "..", "database", "cart.json"),

  getAllUsers: () => {
    return JSON.parse(fs.readFileSync(Cart.fileLocation, "utf-8"));
  },

  filterOwnCartById: (id) => {
    let usuarios = Cart.getAllUsers();

    let usuarioCarrito = usuarios.find((usuario) => usuario.user === id);

    return usuarioCarrito.cart;
  },

  addProduct: (usuarioId, productId) => {
    let usuarios = Cart.getAllUsers();

    let usuarioCarrito = usuarios.find((usuario) => usuario.user === usuarioId);

    let productoCarrito = usuarioCarrito.cart.find(
      (product) => product.product === productId
    );

    productoCarrito.qty++;

    fs.writeFileSync(
      path.resolve(__dirname, "..", "database", "cart.json"),
      JSON.stringify(usuarios, null, 2)
    );

    return usuarioCarrito.cart;
  },

  deleteProduct: (usuarioId, productId) => {
    let usuarios = Cart.getAllUsers();

    let usuarioCarrito = usuarios.find((usuario) => usuario.user === usuarioId);

    let productoCarrito = usuarioCarrito.cart.find(
      (product) => product.product === productId
    );

    console.log(productoCarrito);

    if (productoCarrito.qty === 0) {
      let productDeleteFromCart = usuarioCarrito.cart.find(
        (product) => product.product !== productId
      );

      usuarioCarrito.cart.splice(0, usuarioCarrito.cart.length);
      usuarioCarrito.cart.push(productDeleteFromCart);

      fs.writeFileSync(
        path.resolve(__dirname, "..", "database", "cart.json"),
        JSON.stringify(usuarios, null, 2)
      );

      return usuarioCarrito.cart;
    } else {
      productoCarrito.qty--;

      fs.writeFileSync(
        path.resolve(__dirname, "..", "database", "cart.json"),
        JSON.stringify(usuarios, null, 2)
      );

      return usuarioCarrito.cart;
    }
  },
};

// Cart.deleteProduct(1, 5);

module.exports = Cart;
