const express = require("express");
const docSchema = require("../models/doc.model");

const router = express.Router();

router.post("/docs", async (req, res) => {
  console.log(req.body);
  const doc = new docSchema({
    titulo: req.body.titulo,
    documento: req.body.documento,
    autor: {
      usuario: req.body.autor.usuario,
      nombre: req.body.autor.nombre,
    },
    modificado_por: {
      usuario: null,
      nombre: null,
    },
    fecha_creacion: Date.now(),
    hitorial_cambios: [
      {
        documento: req.body.documento,
        fecha: Date.now(),
      },
    ],
  });
  try {
    const dataSave = await doc.save();
    res.status(200).json(dataSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  /*user
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));*/
});

router.get("/docs", async (req, res) => {
  try {
    docSchema
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json({ message: err }));
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/docs/:id", (req, res) => {
  const { id } = req.params;
  docSchema
    .findById({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

router.put("/docs/:id", async (req, res) => {
  const { id } = req.params;
  const dataSave = await docSchema.findById({ _id: id });
  const data = dataSave.hitorial_cambios;
  const docHistory = {
    documento: req.body.documento,
    fecha: Date.now(),
  };
  data.push(docHistory);
  const docUpdate = {
    documento: req.body.documento,
    modificado_por: {
      usuario: req.body.usuario,
      nombre: req.body.usuario,
    },
    fecha_modificacion: Date.now(),
    hitorial_cambios: data,
  };
  try {
    docSchema
      .updateOne({ _id: id }, { $set: { ...docUpdate } })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.json({ message: err }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/docs/:id", (req, res) => {
  const { id } = req.params;
  docSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
