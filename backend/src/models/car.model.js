const mongoose = require('mongoose');

const carSchema = mongoose.Schema(
  {
    carModel: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!value.match(/^\d{10}$/)) {
          throw new Error('Phone number must be a valid 10-digit number');
        }
      }
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    pictures: {
      type: [String],
      validate(value) {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error('At least one picture is required');
        }
      }
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
