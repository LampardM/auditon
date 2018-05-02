import echarts from 'echarts/lib/echarts'
import mockdata from './mock/mockdata'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import '../css/auditon.less'

const $tabSpan = $('#tab-change')
const $tabAllSpan = $('.tab-change span')

// 初始化图表
const centerChart = echarts.init(document.getElementById('echart-center-container'))

// tab切换
let iNowIndex = 0

const tabChoseColor = (index = 0) => {
  $tabAllSpan.each((index)=> {
    $tabAllSpan.eq(index).css({'background-color': '#FFF','color':'#000'})
  })
  $tabAllSpan.eq(iNowIndex).css({'background-color': '#2196F3','color':'#FFF'}) 
}

const bindTabEvent = () => {
  $tabSpan.on('click', 'span', function(){
    iNowIndex = $(this).index()
    tabChoseColor(iNowIndex)
    resetEchartData() 
  })
}

// 数据重置
const resetEchartData = () => {
  switch(iNowIndex){
    case 0:
      centerOption.series[0].data = mockdata.echartsOne.barOne
      centerOption.series[1].data = mockdata.echartsOne.barTwo
      centerOption.series[2].data = mockdata.echartsOne.line
      break;
    case 1:
      centerOption.series[0].data = mockdata.echartsTwo.barOne
      centerOption.series[1].data = mockdata.echartsTwo.barTwo
      centerOption.series[2].data = mockdata.echartsTwo.line
      break;  
  }
  setCenterOption()
  
}

// echarts配置
let centerOption = {
  color:['#2184C5','#C0EBFE','#FD8497'],
  legend: {
    right:0,
    data:[
      {
        name:'订单总数',
        icon:'circle'
      },
      {
        name:'2单及以上订单数',
        icon:'circle'
      },
      {
        name:'复购率',
        icon:'circle'
      }
    ]
  },
  tooltip: {},
  grid: {
    left: 0,
    right: 20,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  },
  yAxis: [
    {
      type: 'value',
      interval: 50,
      max: 250
    },
    {
      type: 'value',
      interval: 20,      
      axisLabel: {
        formatter: '{value} %'
      },
    }
  ],
  series:[
    {
      name: '订单总数',
      type: 'bar',
      barWidth: 40,
      barGap: '-100%',
      z:10,
      data: []
    },
    {
      name: '2单及以上订单数',
      type: 'bar',
      barWidth: 40,
      barGap: '-100%',
      data: []
    },
    {
      name: '复购率',
      type: 'line',
      z: 15,
      yAxisIndex: 1,
      data: []
    },

  ]
}

// 更新option
const setCenterOption = () => {
  centerChart.setOption(centerOption)  
}

const init = () => {
  tabChoseColor()
  bindTabEvent()
  resetEchartData()
}

init()