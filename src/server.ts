/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import path from "path";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { config } from 'dotenv'

import apiRouter from './routes/api';

if (process.env.NODE_ENV === "production") {
    config({ path: "./.env.production" });
} else {
    config();
}


const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Cors */
router.use(cors());
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

router.use(express.static(path.join(__dirname, "public")));

/** Server */
const PORT: any = process.env.PORT ?? 6060;
// Database config

// import connection from './configs/db.config';

// connection.on('error', (error) => {
//     throw error
// })


async function main() {
    // Route locals variable
    router.use(function (req, res, next) {
        next();
    })

    // Route Prefixes
    router.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
            swaggerOptions: {
                url: "/swagger.json",
            },
        })
    );

    router.use("/api/", apiRouter);

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        return res.status(404).json({
            message: error.message
        });
    });

    const httpServer = http.createServer(router);
    httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}. Open http://localhost:${PORT}/docs to see detail documents.`));
}

main().catch(error => {
    console.log(error)
    process.exit(1)
})