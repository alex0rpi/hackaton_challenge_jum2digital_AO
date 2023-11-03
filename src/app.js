import 'dotenv/config';
import express from 'express';
import skinRoutes from './routes/skinRoutes.js';
import NotFoundMiddleware from './middleware/notFound.js';
import initDB from './models/initModels.js';
import readSkins from './utils/readSkins.js';

const app = express();

app.use(express.json());
app.use('/', skinRoutes);
app.use(NotFoundMiddleware);

readSkins();

const PORT = process.env.PORT || 5000;
/** Listen */
initDB().then(() => {
  app.listen(PORT, () => console.info('🚀🚀Server is running on port', PORT));
});
