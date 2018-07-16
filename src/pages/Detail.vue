<template>
  <div class="my-width text-center">
    <DateTitle
      :year="year"
      :month="month"
      :date="date"></DateTitle>
    <ul class="detail--lists font16">
      <li
        :class="['detail--item flex all-center']"
        v-for="(item,i) in obj.children"
        :key="i">
        <span>{{i+1}}.</span>
        <input 
            type="text" 
            class="detail--input"
            :value="item.text"
            @focusout="changeObj(i,$event)">
      </li>
    </ul>
    <div class="ma-btns flex all-center">
      <div class="ma-btn add--btn" @click="add">新增</div>
      <div class="ma-btn add--btn" @click="del">删除空白</div>
      <div class="ma-btn back--btn" @click="back">返回</div>
    </div>
    <div class="count--total text-left">当天累计消费： {{obj.total || 0}} 元</div>
  </div>
</template>

<script>

import {
  getDateInfo,
  getYear
} from '@/../static/js/date.js'

export default {
  name: 'Detail',
  components: {
    
  },
  data(){
    return {
      year: 0,
      month: 0,
      date: 0,
      obj: {}
    }
  },
  computed:{

  },
  methods:{
    initData() {
      var now_date = getDateInfo();
      this.now_date = now_date;
      this.getStore(now_date.year + "",function(records) {
        this.now_month = records[now_date.month -1];
      });
    },
    getStore(cb) {
      var { year, month, date } = this;
      this.$vlf.createInstance({
        storeName: 'record'
      }).then(async (store) => {
          var records = await store.getItem(year);
          var obj = records[month-1][date -1];
          if(!obj.children) obj.children = [{ text: '',num:0 }]
          this.obj = obj;
      })
    },
    setStore(obj) {
      var { year, month, date } = this;
      this.$vlf.createInstance({
        storeName: 'record'
      }).then(async (store) => {
          var records = await store.getItem(year);
          records[month-1][date - 1] = obj;
          store.setItem(year,records);
      });
    },
    changeObj(i,event) {
      var text = event.target.value,
          num = 0;
      text.replace(/(\d+\.?[\d]?)/g,function(str,$1) {
        num =  $1 || 0;
      });
      this.$set(this.obj.children,i,{ text,num });
      var total = this.obj.children.reduce((a,b)=>(a + parseFloat(b.num)),0);
      this.$set(this.obj,'total',total);
      this.setStore(this.obj);
    },
    add() {
      var children = [...this.obj.children] || [];
      children.push({text: '',num:0});
      this.$set(this.obj,'children',children);
      this.setStore(this.obj);
    },
    back() {
      this.$router.replace({
        path:'/',
        query: {
          year: this.year,
          month: this.month,
        }
      });  
    },
    del() {
      var children = [...this.obj.children] || [];
      children = children.filter(v=>v && v.num != 0);
      this.$set(this.obj,'children',children);
      var total = this.obj.children.reduce((a,b)=>(a + parseFloat(b.num)),0);
      this.$set(this.obj,'total',total);
      this.setStore(this.obj);
    }
  },
  created() {
    var { year, month, date } = this.$route.query;
    this.year = year;
    this.month = month;
    this.date = date;
    this.getStore();
  }
}
</script>

<style lang='scss'>
.detail--item {
  margin-top: 20px;
}
.detail--input {
  width: 100%;
  display: block;
  height: 36px;
  line-height: 36px;
  padding-left: 12px;
  margin-left: 12px;
  border-radius: 5px;
  border-color: #999;
  font-size: 16px;
}
.count--total {
  line-height: 2;
  margin-top: 20px;
}
.ma-btns {
  margin-top: 20px;
}

</style>
