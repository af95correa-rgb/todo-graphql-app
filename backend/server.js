// server.js
// Este es el archivo principal del servidor backend

// Importamos las librerías necesarias
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importamos nuestro esquema de GraphQL
const schema = require('./graphql/schema');

// Creamos la aplicación Express
const app = express();

// MIDDLEWARE: Son funciones que procesan las peticiones antes de llegar a las rutas
// CORS permite que el frontend (en otro puerto) se comunique con el backend
app.use(cors());

// Express.json() permite que el servidor entienda datos en formato JSON
app.use(express.json());

// CONEXIÓN A MONGODB
// La URL de conexión viene de las variables de entorno
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/todoapp';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB exitosamente');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB:', err);
  });

// CONFIGURACIÓN DE GRAPHQL
// Esta ruta maneja todas las peticiones GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,           // Nuestro esquema definido anteriormente
  graphiql: true            // Habilita GraphiQL: una interfaz web para probar queries
}));

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Servidor funcionando correctamente',
    graphql: 'Visita /graphql para usar GraphiQL'
  });
});

// INICIAR EL SERVIDOR
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 GraphiQL disponible en http://localhost:${PORT}/graphql`);
});