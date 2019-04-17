module.exports = {
    async buildMongoSchema(id) {
        const mongoose = this.app.mongoose
        const ObjectId = mongoose.Schema.Types.ObjectId
        let modelName, collectionName
        const model = await this.app.model.Model.findOne({ _id: id }).exec()
        console.log(model)
        if (model) {
            modelName = `${model.type.toLowerCase().replace(/^[a-z]/, (L) => L.toUpperCase())}Model${model.name.toLowerCase().replace(/^[a-z]/, (L) => L.toUpperCase())}`
            collectionName = `${model.type.toLowerCase()}Model${model.name.toLowerCase().replace(/^[a-z]/, (L) => L.toUpperCase())}`
        } else {
            return 'no found any model by this id'
        }

        // const defaultModelArticlePictureSchema = new mongoose.Schema({
        //     name: { type: String }, // 
        //     articlemodel: {
        //         type: ObjectId,
        //         ref: 'model'
        //     },
        //     seotitle: { type: String },
        //     keywords: { type: String },
        //     description: { type: String },
        //     thumbnail: { type: String },
        //     content: { type: String },
        //     createAt: {
        //         type: Date,
        //         default: Date.now()
        //     },
        //     updateAt: {
        //         type: Date,
        //         default: Date.now()
        //     }
        // }, { collection: 'defaultModelArticlePicture' });

        // return mongoose.model('DefaultModelArticlePicture', defaultModelArticlePictureSchema);
    }
}