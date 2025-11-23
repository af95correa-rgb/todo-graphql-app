// graphql/schema.js
// Este archivo define el esquema de GraphQL: qué datos podemos consultar y modificar

const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');
const Task = require('../models/Task');

// 1. DEFINIMOS EL TIPO "TaskType"
// Esto describe cómo se ve una tarea en GraphQL
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },           // ID único de la tarea
    title: { type: GraphQLString },     // Título de la tarea
    description: { type: GraphQLString }, // Descripción
    completed: { type: GraphQLBoolean }, // ¿Está completada?
    createdAt: { type: GraphQLString }  // Fecha de creación
  })
});

// 2. QUERIES (CONSULTAS)
// Define qué datos podemos LEER de la base de datos
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Consulta para obtener TODAS las tareas
    tasks: {
      type: new GraphQLList(TaskType), // Retorna una lista de tareas
      resolve(parent, args) {
        // Esta función se ejecuta cuando alguien hace la consulta
        // Busca todas las tareas en MongoDB y las retorna
        return Task.find();
      }
    },
    
    // Consulta para obtener UNA tarea específica por su ID
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } }, // Recibe el ID como argumento
      resolve(parent, args) {
        // Busca la tarea con el ID proporcionado
        return Task.findById(args.id);
      }
    }
  }
});

// 3. MUTATIONS (MODIFICACIONES)
// Define qué datos podemos CREAR, ACTUALIZAR o ELIMINAR
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Crear una nueva tarea
    addTask: {
      type: TaskType,
      args: {
        // Argumentos necesarios (NonNull = obligatorio)
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString }
      },
      async resolve(parent, args) {
        // Crea una nueva tarea en la base de datos
        const task = new Task({
          title: args.title,
          description: args.description || '' // Si no hay descripción, usa string vacío
        });
        return await task.save(); // Guarda en MongoDB y retorna la tarea creada
      }
    },
    
    // Actualizar una tarea existente
    updateTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        completed: { type: GraphQLBoolean }
      },
      async resolve(parent, args) {
        // Busca la tarea por ID y actualiza solo los campos proporcionados
        return await Task.findByIdAndUpdate(
          args.id,
          { $set: args }, // $set actualiza solo los campos especificados
          { new: true }   // Retorna el documento actualizado
        );
      }
    },
    
    // Eliminar una tarea
    deleteTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        // Busca y elimina la tarea por ID
        return await Task.findByIdAndDelete(args.id);
      }
    }
  }
});

// 4. EXPORTAMOS EL ESQUEMA COMPLETO
// Combina las consultas (queries) y modificaciones (mutations)
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});