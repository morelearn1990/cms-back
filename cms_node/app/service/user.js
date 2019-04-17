const Service = require('egg').Service;

class UserService extends Service {
    async create(user) {
        const { ctx } = this
        let userModel = ctx.model.User
        let old = await userModel.find({ name: user.name }).exec()
        if (old.length > 0) {
            return {
                result: false,
                message: "已经有相同用户名"
            }
        }
        let userDoc = new userModel(user)
        await userDoc.save()
        return userDoc
    }
    async update(user) {
        const { ctx } = this
        let userModel = ctx.model.User
        await userModel.findByIdAndUpdate(user._id, user).exec()
        let userDoc = await userModel.findById(user._id).populate('model')
        return {
            result: true,
            userDoc
        }
    }
    async delete(user) {
        const { ctx } = this
        const userModel = ctx.model.User
        let userDoc = await userModel.findById(user._id).exec()
        if (userDoc.name == 'admin') {
            return {
                result: false,
                message: 'admin账户只能修改密码，不能被删除~~'
            }
        }
        await userDoc.remove()
        return {
            result: true,
            message: '成功删除'
        }
    }
}

module.exports = UserService;