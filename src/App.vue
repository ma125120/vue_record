<template>
  <div id="app" class="my-width text-center">
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import {
  getDateInfo,
  getYear
} from '@/../static/js/date.js'

export default {
  name: 'App',
  components: {
    
  },
  data(){
    return {
      records : [],
      now_date: {},
      now_month: [],
      transitionName: '',
      weekdays:['一','二','三','四','五','六','日']
    }
  },
  computed:{
    emptyLen() {
      return this.now_month && this.now_month[0] && this.now_month[0].day || 1;
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth > fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  methods:{
    initData() {
      var now_date = getDateInfo();
      this.now_date = now_date;
      this.getStore(now_date.year + "",function(records) {
        this.now_month = records[now_date.month -1];
      });
    },
    isActive(obj) {
      var now_date = this.now_date;
      return obj.year == now_date.year && obj.month == now_date.month && obj.date == now_date.date;
    },
    getStore(year = (getDateInfo().year + ""),cb) {
      this.$vlf.createInstance({
        storeName: 'record'
      }).then(async (store) => {
          var records = await store.getItem(year);
          if(!records) {
            records = getYear(year);
            store.setItem(year, records);
          } else {
            this.records = records;
          }
          cb && cb.call(this,records);
      })
    }
  },
  created() {
   
  }
}
</script>

<style lang='scss'>

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(0,0,0,.89);
  font-size: 14px;
}
.my-width {
  width: 9.2rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
