const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('./models/Hotel');

dotenv.config();

const hotels = [
    { name: 'Taj Mahal Palace', city: 'Mumbai', country: 'India' },
    { name: 'The Oberoi Amarvilas', city: 'Agra', country: 'India' },
    { name: 'Rambagh Palace', city: 'Jaipur', country: 'India' },
    { name: 'ITC Grand Chola', city: 'Chennai', country: 'India' },
    { name: 'The Leela Palace', city: 'New Delhi', country: 'India' },
    { name: 'Umaid Bhawan Palace', city: 'Jodhpur', country: 'India' },
    { name: 'JW Marriott', city: 'Pune', country: 'India' },
    { name: 'Grand Hyatt', city: 'Goa', country: 'India' }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Optional: clear existing hotels or just append? 
        // Let's safe-append or use upsert logic, but for simplicity let's just insert.
        // But to avoid duplicates on re-runs, let's check first.

        for (const hotel of hotels) {
            const exists = await Hotel.findOne({ name: hotel.name, city: hotel.city });
            if (!exists) {
                await Hotel.create(hotel);
                console.log(`Added: ${hotel.name}`);
            } else {
                console.log(`Skipped (Exists): ${hotel.name}`);
            }
        }

        console.log('Seeding Complete!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
