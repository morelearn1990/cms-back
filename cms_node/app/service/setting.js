const Service = require('egg').Service;

class SettingService extends Service {
    async create(setting) {
        const { ctx } = this
        let settingModel = ctx.model.Setting
        let settingDoc = new settingModel(setting)
        await settingDoc.save()
        return settingDoc
    }
    async update(setting) {
        const { ctx } = this
        let settingModel = ctx.model.Setting
        await settingModel.findByIdAndUpdate(setting._id, setting).exec()
        let settingDoc = await settingModel.findById(setting._id).exec()
        return settingDoc
    }
    async delete(setting) {
        const { ctx } = this
        const settingModel = ctx.model.Setting
        let settingDoc = await settingModel.findByIdAndRemove(setting._id).exec()
        return settingDoc
    }
}

module.exports = SettingService;