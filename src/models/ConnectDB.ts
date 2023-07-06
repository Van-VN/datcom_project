import mongoose from "mongoose";

export class ConnectDB {
    async connect() {
        await mongoose.connect('mongodb+srv://trankhiem99999:bncvznczvzz1411@cluster0.7tvwpiv.mongodb.net/?retryWrites=true');
    }
}