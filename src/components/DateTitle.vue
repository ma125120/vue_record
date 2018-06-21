<template>
  <div class="date-title text-left my-width">
    <div class="date-title--head">{{month|| 0}}月<span v-if="date && date != 0">{{date}}日</span></div>
    <div class="date-title--year">{{year|| 0}}年</div>
  </div>
</template>

<script>
export default {
  name: 'DateTitle',
  props:{
    month: {},
    year: {},
    date: {}
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.date-title {
  margin-top: 20px;
}
.date-title--head {
  font-size: 24px;
  color: rgba(0,0,0,.89);
}
.date-title--year {
  font-size: 14px;
  color: rgba(0,0,0,.54);
}
</style>
