const express = require("express");
const app = express();

const { check } = require("express-validator");

let Validaciones = [
  check("email")
    .notEmpty()
    .withMessage("Tienes que escribir un correo")
    .bail()
    .isEmail()
    .withMessage("Escribe un email valido"),

  check("password").notEmpty(),
];

module.exports = Validaciones;
