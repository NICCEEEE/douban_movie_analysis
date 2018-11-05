var optionTwo = {
    title: {
        text: '评分曲线图'
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
      "盗梦空间",
      "星际穿越",
      "黑暗骑士",
      "敦刻尔克",
      "致命魔术",
      "记忆碎片",
      "黑暗骑士崛起",
      "侠影之谜"
    ]
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'电影评分',
            type:'line',
            stack: '总量',
            data:[
      9.3,
      9.2,
      9.1,
      8.4,
      8.8,
      8.6,
      8.6,
      8.3
    ]
        }
    ]
};
