import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const DB=process.env.MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB, {
          autoIndex:true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        process.exit(1);
    }
}


export default connectDB;