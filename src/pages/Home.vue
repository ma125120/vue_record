<template>

  <div  
      v-swipeLeft="swipeLeft"
      v-swipeRight="swipeRight"
      >
    <transition :name="transitionName">
      <div class="my-width text-center"
          v-if="!isCount">
          <DateTitle
          :year="now_date.year"
          :month="now_date.month"
          ></DateTitle>
        <ul class="calendar--weekdays flex between">
          <li 
            class="calnedar--weekday"
            v-for="(weekday,i) in weekdays"
            :key="i">{{weekday}}</li>
        </ul>

        <ul class="calendar--lists flex wrap">
          <li
            :class="['calendar--item']"
            v-for="(dateObj,i) in (emptyLen - 1)"
            :key="i">{{dateObj._date}}</li>
          <router-link
            :to="`/detail/?year=${dateObj.year}&month=${dateObj._month}&date=${dateObj._date}`"
            tag="li"
            :class="['calendar--item',
            {
              active: isActive(dateObj)
            }]"
            v-for="(dateObj,i) in now_month"
            :key="i + emptyLen">
            <div class="calendar--item__date">{{dateObj._date}}</div>
            <div class="calendar--item__total">{{dateObj.total || 0}}元</div>
          </router-link>
        </ul>

        <div class="total--price">累计消费：<span class="total--price__num">{{total}}</span>元</div>
      </div>
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
      weekdays:['一','二','三','四','五','六','日'],
      total: 0,
      transitionName: '',
      isCount: false
    }
  },
  computed:{
    emptyLen() {
      return this.now_month && this.now_month[0] && this.now_month[0].day || 7;
    }
  },
  methods:{
    initData(now_date) {
      var now_date = now_date || getDateInfo();
      this.now_date = now_date;
      this.getStore(now_date.year + "",function(records) {
        let months = records[now_date.month - 1];
        this.now_month = months;
        this.total = months.reduce((prev,next)=> prev + (next.total || 0) ,0);
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
    },
    swipeLeft() {
      this.transitionName = 'slide-right';
      this.isCount = true;
      var { now_date } = this;
      var { year, month, date } = now_date;
      if( parseInt(month) == 12 ) {
        year = year + 1;
        month = 1;
      } else {
        month = parseInt(month) +1 ;
      }
      var now_date = getDateInfo(new Date(year,month - 1,date));
      this.initData(now_date);
      setTimeout(()=>{
        this.isCount = false;
      },50)
    },
    swipeRight() {
      this.transitionName = 'slide-left';
      this.isCount = true;
      var { now_date } = this;
      var { year, month, date } = now_date;
      if( parseInt(month) == 1 ) {
        year = year - 1;
        month = 12;
      } else {
        month = parseInt(month) - 1 ;
      }
      
      var now_date = getDateInfo(new Date(year,month - 1,date));
      this.initData(now_date);
      setTimeout(()=>{
        this.isCount = false;
      },50)
    }
  },
  created() {
    var { month,year } = this.$route.query;
    if(month && year) {
      var now_date = getDateInfo(new Date(year,month - 1, getDateInfo()._date ));
      this.initData(now_date);
    } else {
      this.initData();
    }
  }
}
</script>

<style lang='scss'>
@import './static/css/app.scss';
.total--price {
  border-top: 1px solid #eee;
  margin-top: 20px;
  padding: 20px 0 0 20px;
  text-align: left;
  font-size: 16px;
  color: #999;
}
.total--price__num {
  font-size: 20px;
  color: #333;
  padding: 0 12px;
}
</style>
