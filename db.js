const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://edunitinweb:saumikagra%40123@edunitin.84s5m.mongodb.net/<database-name>?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Connection failed:', err);
        process.exit(1); // Exit with failure
    }
};

module.exports = connectDb;
