const db = require('./db/db');

//function to dropn the collection of users
const dropUsers = async () => {
    try {
        await db.dropCollection('users');
        console.log('Users dropped');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

dropUsers();