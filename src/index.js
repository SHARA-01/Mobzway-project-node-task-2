import "dotenv/config.js";
import DatabaseConnection from "../database/index.js";
import { app, server } from "./app.js";


DatabaseConnection()



server.listen(process.env.PORT, ()=> console.log(`Server is running on port : ${process.env.PORT}`))
