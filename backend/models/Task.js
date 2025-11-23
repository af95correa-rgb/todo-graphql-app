// models/Task.js
// Este archivo define cómo se verá una "Tarea" en nuestra base de datos MongoDB

const mongoose = require('mongoose');

// Definimos el esquema (estructura) de una tarea
const taskSchema = new mongoose.Schema({
  // Título de la tarea (obligatorio)
  title: {
    type: String,
    required: true,  // Este campo es obligatorio
    trim: true       // Elimina espacios en blanco al inicio y final
  },
  
  // Descripción de la tarea (opcional)
  description: {
    type: String,
    default: ''      // Si no se proporciona, será un string vacío
  },
  
  // Estado de completado
  completed: {
    type: Boolean,
    default: false   // Por defecto, las tareas nuevas no están completadas
  },
  
  // Fecha de creación (se genera automáticamente)
  createdAt: {
    type: Date,
    default: Date.now  // Se establece la fecha actual al crear la tarea
  }
});

// Creamos el modelo "Task" basado en el esquema definido
// Este modelo nos permitirá hacer operaciones CRUD en la colección "tasks"
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;