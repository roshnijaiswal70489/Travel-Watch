const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/entertainment_discovery_app';

async function test() {
    try {
        console.log('Connecting...');
        await mongoose.connect(uri);
        console.log('Connected!');
        await mongoose.disconnect();
        console.log('Disconnected.');
    } catch (e) {
        console.error('Error:', e.message);
    }
}

test();
