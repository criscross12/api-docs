const mongoose = require("mongoose");
const validate = require("validate");

const docSchema = mongoose.Schema({
  titulo: {
    type: String,
  },
  documento: {
    type: String,
  },
  autor: {
    usuario: { type: String },
    nombre: { type: String },
  },
  modificado_por: {
    usuario: { type: String },
    nombre: { type: String },
  },
  fecha_creacion: {
    type: Date,
  },
  fecha_modificacion: {
    type: Date,
  },
  hitorial_cambios: [
    {
      documento: {
        type: String,
      },
      fecha: {
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model("Docs", docSchema);
