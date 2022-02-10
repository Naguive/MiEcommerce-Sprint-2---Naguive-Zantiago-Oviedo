const fs = require("fs");

const User = {
  fileName: "./src/database/users.json",

  LeerJson: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },

  filtrarUsuarioId: function (id) {
    usuarios = this.LeerJson();
    usuarioEncontrado = usuarios.find((user) => user.id === id);
    return usuarioEncontrado;
  },

  filtrarCampo: function (campo, texto) {
    usuarios = this.LeerJson();
    usuarioEncontrado = usuarios.find((user) => user[campo] === texto);
    return usuarioEncontrado;
  },

  crearUsuario: function (dataUser) {
    let usuarios = this.LeerJson();

    usuarios.push(dataUser);

    fs.writeFileSync(this.fileName, JSON.stringify(usuarios, null, " "));
    return usuarios;
  },

  verificarEmail: function (email) {
    usuarios = this.LeerJson();
    usuarioEncontrado = usuarios.find((user) => user.email === email);
    return usuarioEncontrado;
  },
};

//console.log(User.crearUsuario({"nombre": "luis"}))

module.exports = User;
