import 'dotenv/config';
import express from 'express';
import skinRoutes from './routes/skinRoutes.js';

const app = express();

app.use(express.json());
app.use('/', skinRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
