const Service = require('egg').Service;

class UserModelService extends Service {
    async create(userModel) {
        const { ctx } = this
        let userModelModel = ctx.model.UserModel
        let userModelDoc = new userModelModel(userModel)
        await userModelDoc.save()
        return userModelDoc
    }
    async update(userModel) {
        const { ctx } = this
        let userModelModel = ctx.model.UserModel
        await userModelModel.findByIdAndUpdate(userModel._id, userModel).exec()
        let userModelDoc = await userModelModel.findById(userModel._id).exec()
        return userModelDoc
    }
    async delete(userModel) {
        const { ctx } = this
        const userModelModel = ctx.model.UserModel
        let userModelDoc = await userModelModel.findByIdAndRemove(userModel._id).exec()
        return userModelDoc
    }
}

module.exports = UserModelService;