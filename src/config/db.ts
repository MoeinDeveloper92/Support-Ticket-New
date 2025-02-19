import mongoose from 'mongoose';

class MongoClient {
  async connectDB() {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URL as string);
      console.log(`MONGODB CONNECTED::::${conn.connection.host}`);
    } catch (error) {
      console.log('Soemthing went wrong with connections', error);
      process.exit(1);
    }
  }
}

const dataBaseConnection = new MongoClient();
Object.freeze(dataBaseConnection);

export default dataBaseConnection;
