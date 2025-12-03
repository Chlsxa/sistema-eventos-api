const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Atlas conectado');
    
    // verificamos la conexion de la base de datos
    const db = mongoose.connection;
    console.log(`📁 Base de datos: ${db.name}`);
    console.log(`📊 Colecciones: ${(await db.db.listCollections().toArray()).map(c => c.name).join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    console.log('💡 Verifica que:');
    console.log('1. Tu cadena de conexión en .env es correcta');
    console.log('2. Tu IP está en la whitelist (Network Access)');
    console.log('3. Tu usuario tiene permisos (Database Access)');
    process.exit(1);
  }
};

module.exports = connectDB;