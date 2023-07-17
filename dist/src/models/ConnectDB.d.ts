import mongoose from "mongoose";
export declare class ConnectDB {
    connect(): Promise<typeof mongoose>;
}
