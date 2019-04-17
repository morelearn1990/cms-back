module.exports = app => {
    const mongoose = app.mongoose;
    const ObjectId = mongoose.Schema.Types.ObjectId;
    const UserSchema = new mongoose.Schema({
        name: { type: String, unique: true },
        password: { type: String, default: '123456' },
        cname: { type: String },
        model: {
            type: ObjectId,
            ref: 'UserModel'
        },
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }, { collection: 'user' });

    return mongoose.model('User', UserSchema);
}