import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import skinRoutes from './routes/skinRoutes.js';
import userRoutes from './routes/userRoutes.js';
import NotFoundMiddleware from './middleware/notFound.js';
import initDB from './models/initModels.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './src/views');

// Initialize the session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', skinRoutes);
app.use('/users', userRoutes);
app.use(errorMiddleware);
app.use(NotFoundMiddleware);

const PORT = process.env.PORT || 5000;
/** Listen */
initDB().then(() => {
  app.listen(PORT, () => console.info('🚀🚀Server is running on port', PORT));
});
