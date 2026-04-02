import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "chatterDB"
        });
        console.log("MONGODB connected: ", con.connection.host);
    } catch (err) {
        console.error("MONGODB Connection ERROR: ", err);
        process.exit(1);
    }
}