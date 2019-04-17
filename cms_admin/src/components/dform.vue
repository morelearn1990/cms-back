
<script>
// 渲染动态生成的表单
import Vue from 'vue'
export default {
  props:{
    text:String,
    form:Object
  },
  render(h){
    const insideComponents = Vue.extend({
        template: this.text,
        props: {
          form: Object,
        }
    })
    return h(insideComponents, {
        props: {
            form: this.form
        }
    })
  }
}
</script>