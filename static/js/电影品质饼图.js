optionOne = {
    title : {
        text: '剧情类电影各评分占比(最高分9.7 最低分2.1)',
        subtext: '南丁格尔玫瑰图',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['9分及以上','8分至9分','7分至8分','6分至7分','6分及以下']
    },
    toolbox: {
        show :  false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius : [20, 110],
            center : ['25%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:49.746, name:'9分及以上'},
                {value:596.952, name:'8分至9分'},
                {value:2387.808, name:'7分至8分'},
                {value:2736.03, name:'6分至7分'},
                {value:2520.464, name:'6分以下'},
            ]
        },
        {
            name:'面积模式',
            type:'pie',
            radius : [30, 110],
            center : ['75%', '50%'],
            roseType : 'area',
            data:[
              {value:49.746, name:'9分及以上'},
              {value:596.952, name:'8分至9分'},
              {value:2387.808, name:'7分至8分'},
              {value:2736.03, name:'6分至7分'},
              {value:2520.464, name:'6分以下'},
            ]
        }
    ]
};
