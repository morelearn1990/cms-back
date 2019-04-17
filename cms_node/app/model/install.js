module.exports = app => {
    const mongoose = app.mongoose;
    const installSchema = new mongoose.Schema({
        installed: { type: Boolean },
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }, { collection: 'install' })

    return mongoose.model('Install', installSchema);
}