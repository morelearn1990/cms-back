<template>
    <div class="nav-header">
        <div class="nav-logo">
            <p>hello Morelearn</p>
        </div>
        <div class="showTime">
            <p>
                <span>{{timeFormat.year}} </span>年
                <span>{{timeFormat.month}} </span>月
                <span>{{timeFormat.date}}</span>日</p>
        </div>
    </div>
</template>
<script>
var time = new Date();
export default {
    data() {
        return {
            time: time
        }
    },
    computed: {
        timeFormat() {
            var time = this.time;
            return {
                year: time.getFullYear(),
                month: time.getMonth() + 1,
                date: time.getDate()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.nav-header {
    width: 100%; // height: 70px;
    background-color: #dbdee2;
    padding: 10px 0;
    .nav-logo {
        font-size: 20px;
        text-align: center;
        margin-bottom: 10px;
    }
    .showTime {
        color: #333;
        text-align: center;
    }
}
</style>

