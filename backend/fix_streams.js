const mongoose = require('mongoose');
require('./models/Hotel'); // Register Hotel model for reference
const Channel = require('./models/Channel');

// Hardcoded for reliability in this script
const uri = 'mongodb://127.0.0.1:27017/entertainment_discovery_app';

const streamUrls = [
    'https://www.youtube.com/watch?v=uCqUv5aF08U',
    'https://www.youtube.com/watch?v=pWb1vMgyoYQ',
    'https://www.youtube.com/watch?v=X8Z0kZ_g6Gg',
    'https://www.youtube.com/watch?v=KzXkZ2G8Q8Q',
    'https://www.youtube.com/watch?v=76dC5N_eG6Q',
    'https://www.youtube.com/watch?v=Pk9w76v00i8',
    'https://www.youtube.com/watch?v=5X9g5j9j5k8',
    'https://www.youtube.com/watch?v=2vjPBrBU-TM',
    'https://www.youtube.com/watch?v=hFj10gXJgJ0',
];

const fixStreams = async () => {
    try {
        console.log('Connecting to:', uri);
        await mongoose.connect(uri);
        console.log('MongoDB Connected');

        // Check if Channel model works
        const count = await Channel.countDocuments();
        console.log(`Found ${count} channels.`);

        const channels = await Channel.find({});

        let updatedCount = 0;
        for (const channel of channels) {
            // Check if streamUrl is missing or empty
            if (!channel.streamUrl) {
                const randomUrl = streamUrls[Math.floor(Math.random() * streamUrls.length)];
                channel.streamUrl = randomUrl;
                await channel.save();
                updatedCount++;
                console.log(`Updated channel: ${channel.name} -> ${randomUrl}`);
            }
        }

        console.log(`Updated ${updatedCount} channels.`);
        await mongoose.disconnect();
        console.log('Done.');
        process.exit(0); // Success
    } catch (err) {
        console.error('Fatal Error:', err);
        process.exit(1);
    }
};

fixStreams();
