const crypto = require('crypto');

// Generar una clave secreta aleatoria de 32 bytes
const secret = crypto.randomBytes(32).toString('base64');
console.log('Clave secreta:', secret);
