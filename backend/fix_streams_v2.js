const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'migration_log.txt');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function fixStreams() {
    try {
        log('Starting script...');
        // Load models
        require('./models/Hotel');
        const Channel = require('./models/Channel');

        const uri = 'mongodb://127.0.0.1:27017/entertainment_discovery_app';
        log(`Connecting to ${uri}`);

        await mongoose.connect(uri);
        log('Connected.');

        const channels = await Channel.find({});
        log(`Found ${channels.length} channels.`);

        const streamUrls = [
            'https://www.youtube.com/watch?v=uCqUv5aF08U',
            'https://www.youtube.com/watch?v=pWb1vMgyoYQ',
            'https://www.youtube.com/watch?v=X8Z0kZ_g6Gg',
        ];

        let updated = 0;
        const validHotel = await mongoose.model('Hotel').findOne();
        const validHotelId = validHotel ? validHotel._id : new mongoose.Types.ObjectId();

        for (const channel of channels) {
            let modified = false;

            if (!channel.streamUrl) {
                channel.streamUrl = streamUrls[Math.floor(Math.random() * streamUrls.length)];
                modified = true;
            }

            if (!channel.channelNumber) {
                channel.channelNumber = Math.floor(Math.random() * 100).toString();
                modified = true;
            }

            if (!channel.name) {
                channel.name = "Unknown Channel " + Math.floor(Math.random() * 100);
                modified = true;
            }

            if (!channel.hotelId) {
                channel.hotelId = validHotelId;
                modified = true;
            }

            if (modified) {
                await channel.save();
                updated++;
                log(`Updated channel: ${channel.name}`);
            }
        }
        log(`Title: Update Complete. Updated ${updated} channels.`); // Keyword Title used to debug

        process.exit(0);
    } catch (err) {
        log(`ERROR: ${err.message}`);
        log(err.stack);
        process.exit(1);
    }
}

fixStreams();
