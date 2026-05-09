// archivo: ejemplo-redis.js
const { createClient } = require('redis');

async function ejecutarRedis() {
    // 1. Crear el cliente
    const client = createClient({
        url: 'redis://localhost:6379'
    });

    // Manejador de errores
    client.on('error', (err) => console.log('Redis Client Error', err));

    try {
        // 2. Conectar a Redis
        await client.connect();
        console.log('Conectado a Redis');

        // 3. Guardar un valor (SET)
        // Guardamos la clave "sesion_usuario_1" con valor "activa"
        await client.set('sesion_usuario_1', 'activa');
        console.log('Clave guardada en Redis');

        // (Opcional) Establecer tiempo de expiración
        await client.expire('sesion_usuario_1', 10);

        // 4. Obtener un valor (GET)
        const valor = await client.get('sesion_usuario_1');
        console.log('El valor recuperado es:', valor);

    } catch (error) {
        console.error('Error en la operación de Redis:', error);
    } finally {
        // 5. Desconectar
        await client.disconnect();
        console.log('Desconectado de Redis');
    }
}

ejecutarRedis();