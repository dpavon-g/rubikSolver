const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
        },
    },
}));

app.use(express.static(path.join(__dirname, 'public')));

// Ruta básica
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
