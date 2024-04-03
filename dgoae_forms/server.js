const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Servir archivos estáticos desde la carpeta 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Configurar rutas para todas las demás solicitudes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor React escuchando en el puerto ${port}`);
});
