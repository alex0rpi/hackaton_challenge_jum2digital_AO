import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const skinSchema = new Schema({
  name: String,
  price: Number,
  color: String,
  type: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
