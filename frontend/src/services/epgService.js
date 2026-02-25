/**
 * Mock EPG Service
 * Generates realistic program schedules synced to current device time.
 */

// Helper to create a time object for today at specific hour:minute
const at = (hour, minute) => {
    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d.getTime();
};

const PROGRAMS = {
    starPlus: [
        { title: 'Anupamaa', duration: 30, description: 'Anupamaa struggles to find her identity.' },
        { title: 'Yeh Rishta Kya Kehlata Hai', duration: 30, description: 'Armaan and Abhira face new challenges.' },
        { title: 'Ghum Hai Kisikey Pyaar Meiin', duration: 30, description: 'Savi fights for justice against all odds.' },
        { title: 'Jhanak', duration: 30, description: 'Jhanak chases her dreams despite hurdles.' },
        { title: 'Udne Ki Aasha', duration: 30, description: 'Sachin and Sayali navigate married life.' },
        { title: 'Advocate Anjali Awasthi', duration: 30, description: 'Anjali fights a tough legal battle.' }
    ],
    colors: [
        { title: 'Bigg Boss', duration: 60, description: 'Celebrities live together in a house with no contact with the outside world.' },
        { title: 'Naagin', duration: 60, description: 'A shape-shifting serpent woman seeks revenge.' },
        { title: 'Udariyaan', duration: 30, description: 'A tale of dreams and aspirations.' },
        { title: 'Laughter Chefs', duration: 60, description: 'Cooking meets comedy in this fun show.' }
    ],
    sony: [
        { title: 'The Kapil Sharma Show', duration: 60, description: 'Kapil Sharma hosts celebrities with humor and fun.' },
        { title: 'Shark Tank India', duration: 60, description: 'Entrepreneurs pitch their business ideas to investors.' },
        { title: 'Kaun Banega Crorepati', duration: 60, description: 'A quiz show hosted by Amitabh Bachchan.' },
        { title: 'CID', duration: 60, description: 'Detectives solve difficult crimes.' }
    ],
    sonySab: [
        { title: 'Taarak Mehta Ka Ooltah Chashmah', duration: 30, description: 'Daily lives of Gokuldham society members.' },
        { title: 'Wagle Ki Duniya', duration: 30, description: 'The struggles of a middle-class family.' },
        { title: 'Pushpa Impossible', duration: 30, description: 'Pushpa goes back to school at an older age.' }
    ],
    zee: [
        { title: 'Kumkum Bhagya', duration: 30, description: 'A rockstar love story.' },
        { title: 'Kundali Bhagya', duration: 30, description: 'Two sisters destined to be together.' },
        { title: 'Sa Re Ga Ma Pa', duration: 90, description: 'Singing reality show.' },
        { title: 'Bhagya Lakshmi', duration: 30, description: 'Lakshmi\'s life changes after marriage.' }
    ],
    starSports: [
        { title: 'Cricket Live', duration: 60, description: 'Pre-match analysis and expert discussions.' },
        { title: 'IND vs NZ - 4th T20I', duration: 240, description: 'India takes on New Zealand in the 4th T20I.' },
        { title: 'Match Highlights', duration: 60, description: 'Best moments from the recent matches.' },
        { title: 'Cricket Legends', duration: 60, description: 'Documentary on cricketing greats.' }
    ],
    movies: [
        { title: 'Jawan', duration: 180, description: 'A high-octane action thriller starring SRK.' },
        { title: 'Pathaan', duration: 150, description: 'An Indian agent races against a doomsday clock.' },
        { title: 'Tiger 3', duration: 160, description: 'Tiger and Zoya return for their biggest mission.' },
        { title: 'Brahmastra', duration: 170, description: 'Shiva discovers his connection to the elements.' }
    ],
    cartoonNetwork: [
        { title: 'Ben 10', duration: 30, description: 'Ben uses the Omnitrix to save the world.' },
        { title: 'Tom & Jerry', duration: 30, description: 'The classic cat and mouse chase continues.' },
        { title: 'Teen Titans Go!', duration: 30, description: 'The superheroes try to live normal lives.' },
        { title: 'Dragon Ball Super', duration: 30, description: 'Goku faces new powerful enemies.' }
    ],
    music: [
        { title: 'Morning Melodies', duration: 45, description: 'Start your day with soothing tunes.' },
        { title: 'Bollywood Top 20', duration: 60, description: 'The biggest hits from Bollywood.' },
        { title: 'Punjabi Party', duration: 45, description: 'High energy Punjabi tracks.' },
        { title: 'Love Anthems', duration: 60, description: 'Romantic songs for the soul.' }
    ],
    dance: [
        { title: 'Dance India Dance', duration: 90, description: 'India\'s biggest dance battle.' },
        { title: 'Super Dancer', duration: 60, description: 'Kids showcase their dancing talent.' },
        { title: 'Best of Hip Hop', duration: 30, description: 'Showcasing the best hip hop moves.' },
        { title: 'Classical Dance Special', duration: 60, description: 'Celebrating traditional Indian dance forms.' }
    ],
    devotional: [
        { title: 'Morning Aarti', duration: 30, description: 'Live Aarti from famous temples.' },
        { title: 'Bhajan Sandhya', duration: 60, description: 'Devotional songs and bhajans.' },
        { title: 'Spiritual Wisdom', duration: 45, description: 'Discourse on life and spirituality.' },
        { title: 'Yoga & Meditation', duration: 45, description: 'Guide to physical and mental wellness.' }
    ]
};

// Generate a full day schedule based on the program templates
// Generate schedule for a specific day given a start timestamp
const generateDailyScheduleForDay = (channelType, startTimestamp) => {
    const schedule = [];
    let currentTime = startTimestamp;
    const endTime = currentTime + (24 * 60 * 60 * 1000); // 24 hours

    const templates = PROGRAMS[channelType] || PROGRAMS.starPlus;
    let index = 0;

    while (currentTime < endTime) {
        const program = templates[index % templates.length];
        const durationMs = program.duration * 60 * 1000;

        schedule.push({
            title: program.title,
            description: program.description,
            startTime: currentTime,
            endTime: currentTime + durationMs
        });

        currentTime += durationMs;
        index++;
    }
    return schedule;
};

export const getChannelEPG = (channelId, category, baseTime = new Date()) => {
    let type = 'starPlus';

    // Check specific channel IDs first
    if (channelId === '2') type = 'colors';
    if (channelId === '3') type = 'sonySab';
    if (channelId === '4') type = 'sony';
    if (channelId === '5') type = 'zee';

    // Fallback to category based selection
    if (type === 'starPlus') {
        if (category === 'Sports') type = 'starSports';
        if (category === 'Kids') type = 'cartoonNetwork';
        if (category === 'Movies') type = 'movies';
        if (category === 'Music') type = 'music';
        if (category === 'Dance') type = 'dance';
        if (category === 'Devotional') type = 'devotional';
    }

    // Generate schedule for Today and Tomorrow to handle boundary crossings
    const today = new Date(baseTime);
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const fullSchedule = [
        ...generateDailyScheduleForDay(type, today.getTime()),
        ...generateDailyScheduleForDay(type, tomorrow.getTime())
    ];

    // Find current program
    const now = new Date(baseTime).getTime();
    const currentProgramIndex = fullSchedule.findIndex(p => now >= p.startTime && now < p.endTime);
    // If somehow not found, default to first available
    const safeIndex = currentProgramIndex >= 0 ? currentProgramIndex : 0;

    const currentShow = fullSchedule[safeIndex];
    // Find next show (that starts after current show ends)
    const nextShow = fullSchedule[safeIndex + 1] || fullSchedule[0];

    // Generate 12-hour slotted schedule for the grid
    const slots = [];
    for (let i = 0; i < 12; i++) {
        // Calculate timestamp for this hour slot
        const slotTime = new Date(baseTime);
        slotTime.setHours(slotTime.getHours() + i);
        const slotMs = slotTime.getTime();

        // Find program playing at this specific slot time
        const programAtSlot = fullSchedule.find(p => slotMs >= p.startTime && slotMs < p.endTime) || currentShow;

        slots.push({
            time: slotTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
            originalTime: slotTime,
            program: programAtSlot.title,
            description: programAtSlot.description
        });
    }

    return {
        currentShow: {
            show: currentShow.title,
            description: currentShow.description,
            startTime: currentShow.startTime,
            endTime: currentShow.endTime
        },
        nextShow: {
            show: nextShow.title,
            description: nextShow.description,
            startTime: nextShow.startTime,
            endTime: nextShow.endTime
        },
        schedule: slots
    };
};
