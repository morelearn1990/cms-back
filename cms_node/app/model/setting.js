module.exports = app => {
    const mongoose = app.mongoose;
    const ObjectId = mongoose.Schema.Types.ObjectId;
    const Mixed = mongoose.Schema.Types.Mixed;
    const SettingSchema = new mongoose.Schema({
        name: { type: String },
        description: { type: String },
        value: { type: Mixed },
        inputType: { type: String },
        group: { type: Number },
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }, { collection: 'setting' });

    return mongoose.model('Setting', SettingSchema);
}