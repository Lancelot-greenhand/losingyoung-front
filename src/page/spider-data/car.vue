<template>
	<div>
   <div ref='carGraph' class="car-chart"></div>
  </div>
</template>
<script>
  import {getSpiderCarData} from '@/service/getData.js'
  import echarts from 'echarts'
  export default {
    data () {
      return {}
    },
    created () {
      getSpiderCarData().then(res => {
        let data = res.data.data
        console.log(data)
        this.initChart(data)
      })
    },
    methods: {
      initChart (data) {
        const el = this.$refs.carGraph
        const carChart = echarts.init(el)
        let dateA = this.getDateArr(data)
        let carTypeA = this.getCarTypeArr(data)
        let seriesData = this.getSeriesData(data, dateA, carTypeA)
        console.log(seriesData)
        var option = {
          title: {
            text: 'Audi价格'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: carTypeA,
            right: '0',
            orient: 'vertical'
          },
          xAxis: {
            data: dateA
          },
          yAxis: {},
          series: seriesData
        }
        carChart.setOption(option)
      },
      getDateArr (data) {
        let dates = data.map(value => {
          console.log(typeof value.date)
          return value.date.substr(0, 10) // 后期只保留到日
        })
        return Array.from(new Set(dates))
      },
      getCarTypeArr (data) {
        let datas = data.map(value => {
          return value.title // 后期只保留到日
        })
        return Array.from(new Set(datas))
      },
      getSeriesData (carData, dates, titles) {
        let data = titles.map(title => {
          let obj = {
            name: title,
            type: 'line'
          }
          let carSaleData = dates.map(date => {
            let price = 0
            carData.some(car => {
              if (car.title === title) {
                price = car.minPrice
                return true
              }
            })
            return price
          })
          obj.data = carSaleData
          return obj
        })
        return data
      }
    }
  }
</script>
<style scoped>
  .car-chart{
    height: 40rem;
    width: 100%;
  }
</style>
