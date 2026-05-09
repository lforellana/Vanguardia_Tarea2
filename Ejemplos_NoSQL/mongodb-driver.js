// archivo: ejemplo-mongodb-driver.js
const { MongoClient } = require('mongodb');

// URI de conexión y nombre de la base de datos
const uri = 'mongodb://localhost:27017';
const dbName = 'mi_base_datos_test';

// Crear una instancia del cliente
const client = new MongoClient(uri);

async function ejecutarMongoDriver() {
    try {
        // 1. Conectar al servidor
        await client.connect();
        console.log('Conectado exitosamente al servidor MongoDB');

        // 2. Seleccionar base de datos y colección
        const db = client.db(dbName);
        const collection = db.collection('productos');

        // 3. Insertar un documento directamente 
        const nuevoProducto = {
            nombre: 'Teclado Mecánico',
            precio: 120,
            stock: 50
        };

        const insertResult = await collection.insertOne(nuevoProducto);
        console.log('Documento insertado con _id:', insertResult.insertedId);

        // 4. Buscar documentos
        const busqueda = await collection.find({ precio: { $gte: 100 } }).toArray();
        console.log('Productos con precio >= 100:', busqueda);

    } catch (error) {
        console.error('Error en MongoDB Driver:', error);
    } finally {
        // Cerrar la conexión
        await client.close();
    }
}

ejecutarMongoDriver();