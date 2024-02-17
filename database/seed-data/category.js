const Category = require('../../models/category-model');
const mongoose = require('mongoose');
const generalHelper = require('../../helpers/general-helper')

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const categoryData = [];
const numberOfRecords = 10;

for (let i = 1; i <= numberOfRecords; i++) {
  const category = {
      name: `Name ${i}`,
      description: `Desc ${i}`
  };

  // Push the new object to the array
  categoryData.push(category);
}

const seedData = async () => {
  try {
    await Category.insertMany(categoryData);

    console.log('Data were seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedData();