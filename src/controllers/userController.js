const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../src/models/UserModel");
const session = require("express-session");
const { validationResult } = require("express-validator");

module.exports = {
  register: (req, res) => res.render("register"),
  login: function (req, res) {
    res.render("login");
  },
  registroProceso: function (req, res) {
    const resultadoValidacion = validationResult(req);

    if (resultadoValidacion.errors.length > 0) {
      return res.render("register", {
        errors: resultadoValidacion.mapped(),
        oldData: req.body,
      });
    }

    if (req.body.password != req.body.Repitepassword) {
      return res.render("register", {
        errors: { Repitepassword: { msg: "Las contraseñas no coinciden" } },
      });
    }

    let usuarioCreado = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    };

    let usuarioExistente = User.filtrarCampo("email", req.body.email);
    if (usuarioExistente) {
      return res.send("usuario existente");
    }

    User.crearUsuario(usuarioCreado);
    res.send("usuario creado");
  },

  loginProceso: (req, res) => {
    let errors = validationResult(req);
    let resultadoValidacion = validationResult(req);

    if (resultadoValidacion.errors.length > 0) {
      return res.render("login", {
        errors: resultadoValidacion.mapped(),
        oldData: req.body,
      });
    }

    if (errors.isEmpty()) {
      // res.send({ userNameLogin, body: req.body });
      let userNameLogin = User.verificarEmail(req.body.email);
      if (userNameLogin) {
        let passCorrecta = bcrypt.compareSync(
          req.body.password,
          userNameLogin.password
        );

        if (passCorrecta) {
          delete userNameLogin.password;
          delete userNameLogin.Repitepassword;
          //Inicio de session
          req.session.userLogged = userNameLogin;
          res.redirect("/");
        } else {
          return res.render("login", {
            errors: { email: { msg: "Contraseña incorrecta" } },
          });
        }
      } else {
        return res.render("login", {
          errors: {
            email: { msg: "Ingrese el Nombre de usuario correcto" },
            password: { msg: "Ingrese la contraseña" },
          },
        });
      }

      let usuarioExistente = User.filtrarCampo("email", req.body.email);
      let contraseñaExistente = User.filtrarCampo(
        "password",
        req.body.password
      );

      if (usuarioExistente) {
        if (contraseñaExistente) {
          res.send("Inicio sesion");
        }
      } else {
        return res.render("register", {
          errors: {
            password: { msg: "La contraseña no coincide con el usuario" },
          },
        });
      }
    }
  },
};
