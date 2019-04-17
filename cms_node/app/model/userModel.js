module.exports = app => {
    const mongoose = app.mongoose;
    const ObjectId = mongoose.Schema.Types.ObjectId;
    const UserModelSchema = new mongoose.Schema({
        name: { type: String },
        cname: { type: String },
        operationPermissions: [{
            type: ObjectId,
            ref: 'OperationPermission'
        }],
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }, { collection: 'userModel' });

    return mongoose.model('UserModel', UserModelSchema);
}