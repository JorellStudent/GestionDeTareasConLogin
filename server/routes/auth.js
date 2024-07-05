const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', (req, res) => {
  // Aquí puedes manejar cualquier lógica de cierre de sesión, como eliminar la sesión del servidor
  res.status(200).send({ message: 'Logout successful' });
});

module.exports = router;
