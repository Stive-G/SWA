const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const clothingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    style: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    isWaterproof: { type: Boolean, default: false },
    temperatureMin: { type: Number, required: true },
    temperatureMax: { type: Number, required: true },
    imageUrl: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Clothing = mongoose.model('Clothing', clothingSchema);

function requiredEnv(name) {
  if (!process.env[name]) {
    throw new Error(`${name} is required`);
  }
}

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'smart-wardrobe/clothes', resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      }
    );

    stream.end(file.buffer);
  });
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/clothes', async (_req, res, next) => {
  try {
    const clothes = await Clothing.find().sort({ createdAt: -1 });
    res.json(clothes);
  } catch (error) {
    next(error);
  }
});

app.post('/api/clothes', upload.single('image'), async (req, res, next) => {
  try {
    let imageUrl = '';
    let imagePublicId = '';

    if (req.file) {
      const image = await uploadToCloudinary(req.file);
      imageUrl = image.secure_url;
      imagePublicId = image.public_id;
    }

    const clothing = await Clothing.create({
      name: req.body.name,
      type: req.body.type,
      style: req.body.style,
      color: req.body.color,
      isWaterproof: req.body.isWaterproof === 'true',
      temperatureMin: Number(req.body.temperatureMin),
      temperatureMax: Number(req.body.temperatureMax),
      imageUrl,
      imagePublicId,
    });

    res.status(201).json(clothing);
  } catch (error) {
    next(error);
  }
});

app.put('/api/clothes/:id', upload.single('image'), async (req, res, next) => {
  try {
    const clothing = await Clothing.findById(req.params.id);

    if (!clothing) {
      res.status(404).json({ message: 'Clothing not found' });
      return;
    }

    if (req.file) {
      const image = await uploadToCloudinary(req.file);

      if (clothing.imagePublicId) {
        await cloudinary.uploader.destroy(clothing.imagePublicId);
      }

      clothing.imageUrl = image.secure_url;
      clothing.imagePublicId = image.public_id;
    }

    clothing.name = req.body.name;
    clothing.type = req.body.type;
    clothing.style = req.body.style;
    clothing.color = req.body.color;
    clothing.isWaterproof = req.body.isWaterproof === 'true';
    clothing.temperatureMin = Number(req.body.temperatureMin);
    clothing.temperatureMax = Number(req.body.temperatureMax);

    const updatedClothing = await clothing.save();
    res.json(updatedClothing);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/clothes/:id', async (req, res, next) => {
  try {
    const clothing = await Clothing.findByIdAndDelete(req.params.id);

    if (!clothing) {
      res.status(404).json({ message: 'Clothing not found' });
      return;
    }

    if (clothing.imagePublicId) {
      await cloudinary.uploader.destroy(clothing.imagePublicId);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: error.message || 'Server error' });
});

async function start() {
  requiredEnv('MONGODB_URI');
  requiredEnv('CLOUDINARY_CLOUD_NAME');
  requiredEnv('CLOUDINARY_API_KEY');
  requiredEnv('CLOUDINARY_API_SECRET');

  await mongoose.connect(process.env.MONGODB_URI);

  app.listen(port, '0.0.0.0', () => {
    console.log(`API running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
