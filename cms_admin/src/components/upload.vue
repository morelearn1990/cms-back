<template>
  <el-upload :file-list="list" :action="action" :headers='headers' :accept="accept" :on-success="success" :limit='limit' list-type="picture-card">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>
<script>
export default {
  props: {
    files: {
      type: Array,
      default: () => []
    },
    accept: String,
    file: {
      type: String,
      default: ""
    },
    limit: Number
  },
  data() {
    return {
      headers: {},
      action: ""
    };
  },
  created() {
    let auth = localStorage.getItem("auth");
    this.headers = { Authorization: auth };
    this.action = "http://127.0.0.1:7002/api/v1/upload";
  },
  computed: {
    list() {
      let { limit, file, files } = this;
      return limit === 1 ? (file ? [{ url: file }] : []) : files ? files : [];
    }
  },
  methods: {
    success(response, file, fileList) {
      let { limit } = this;
      console.log(fileList);
      limit === 1
        ? this.$emit("update:file", response.url)
        : this.$emit("update:files", fileList.map(el => el.response.url));
    }
  }
};
</script>
<style>
</style>
