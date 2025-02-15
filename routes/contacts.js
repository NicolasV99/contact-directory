const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { validationRules, validate} = require('../middleware/validator.js');
const contactsController = require("../controllers/contacts");

// GET: Ver todos los contactos (público)
router.get("/", contactsController.getAll); // ✅ Coincide con el controlador

// GET: Ver un contacto por ID (público)
router.get("/:id", contactsController.getSingle); // ✅ Coincide con el controlador

// POST: Crear un contacto (requiere autenticación)
router.post("/", authMiddleware, validationRules(), validate, contactsController.createContact);

router.get('/type/:type/', contactsController.findByType);

// PUT: Actualizar un contacto (requiere autenticación)
router.put("/:id", authMiddleware, validationRules(), validate, contactsController.updateContact);

// DELETE: Eliminar un contacto (requiere autenticación)
router.delete("/:id", authMiddleware, contactsController.deleteContact);

module.exports = router;
