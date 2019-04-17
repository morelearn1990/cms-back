module.exports = app => {
    const mongoose = app.mongoose;
    const OperationPermissionSchema = new mongoose.Schema({
        name: { type: String },
        cname: { type: String },
        modular: { type: String },
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }, { collection: 'operationPermission' });

    return mongoose.model('OperationPermission', OperationPermissionSchema);
}