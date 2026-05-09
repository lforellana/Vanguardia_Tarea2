// archivo: ejemplo-mongoose.js
const mongoose = require('mongoose');

// 1. Definición del Esquema
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: Number,
    email: String,
    fechaRegistro: { type: Date, default: Date.now }
});

// 2. Creación del Modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

async function ejecutarMongoose() {
    try {
        // 3. Conexión a la base de datos
        await mongoose.connect('mongodb://localhost:27017/mi_base_datos_test');
        console.log('Conectado a MongoDB vía Mongoose');

        // 4. Crear un nuevo documento
        const nuevoUsuario = new Usuario({
            nombre: 'Ana López',
            edad: 28,
            email: 'ana@ejemplo.com'
        });

        // 5. Guardar en la base de datos
        const resultado = await nuevoUsuario.save();
        console.log('Usuario guardado:', resultado);

        // 6. Consultar datos
        const usuarios = await Usuario.find({ edad: { $gt: 20 } });
        console.log('Usuarios mayores de 20:', usuarios);

    } catch (error) {
        console.error('Error en Mongoose:', error);
    } finally {
        // Cerrar la conexión
        await mongoose.disconnect();
    }
}

ejecutarMongoose();