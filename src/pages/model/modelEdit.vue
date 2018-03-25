<template>
    <div class="model-edit">

    </div>
</template>
<style lang="less" scoped>
.model-edit {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
<script>
export default {
  data() {
    return {
      model: {},
      modelDefault: {
        modelName: "",
        modelDes: "",
        isdefault: false,
        modelItem: [{}]
      },
      rule: {},
      varTypes: [
        {
          label: "文本",
          value: "text"
        },
        {
          label: "文本域",
          value: "textArea"
        },
        {
          label: "数字",
          value: "number"
        },
        {
          label: "选择器",
          value: "select"
        },
        {
          label: "图片",
          value: "imgUpload"
        },
        {
          label: "视频",
          value: "videoUpload"
        },
        {
          label: "富文本",
          value: "Richtext"
        }
      ]
    };
  },
  created: function() {
    var _this = this;
    let _id = _this.$route.params.id;
    _id != "new"
      ? _this.$axios_wrapper("settings.show", { _id }).then(res => {
          _this.model = res.data.model;
        })
      : (_this.model = _this.modelDefault);
  },
  methods: {
    save() {
      var _this = this;
      _this.axios
        .post("/model/column/edit/post", {
          model: _this.model
        })
        .then(res => {
          res.data.result
            ? _this.$message({
                type: "success",
                message: "保存成功~"
              }) && _this.$router.go(-1)
            : _this.$message({
                type: "error",
                message: "保存失败~"
              });
        })
        .catch(err => {
          _this.$message({
            type: "error",
            message: "保存失败~"
          });
        });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>