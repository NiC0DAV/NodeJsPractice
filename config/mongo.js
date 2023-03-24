const mongoose = require('mongoose');
const dbConnect = async () => {
    const DB_URI = process.env.DB_URI;
    try {
      await mongoose.connect(DB_URI);
      console.log(`***CONEXIÓN A DB EXITOSA***`);
    } catch (error) {
      console.log(`***ERROR GENERANDO LA CONEXION CON LA DB*** ==> ${error}`);
    }

}

module.exports = dbConnect;