import mongoose from "mongoose";

export class ConnectDB {
    async connect() {
        return await mongoose.connect('mongodb+srv://hyboy95:XGVy2H6KGOSYAm7W@orderfood.qmvvr29.mongodb.net/test');
    }
}