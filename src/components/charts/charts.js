function getBOption(min_values,values,max_values){
    
    // console.log(min_values)
    // console.log(values)
    // console.log(max_values)
    let title_text = 'Относительные параметры B - клеточного звена иммунитета'
    let radar_indicator = [
        { name: 'NEU/CD19' },
        { name: 'CD19/CD4' },
        { name: 'CD19/CD8' },
        { name: 'NEU/LYMF' }
      ]

    let option = getBaseOption(title_text,radar_indicator,min_values,values,max_values)
    // console.log(option)
      return option
}

function getTOption(values){

}

function getCytokineOption(values){
}





function getBaseOption(titleText,indicator,minValues, values, maxValues){
    return {
        title: {
          text: titleText
        },
        legend: {
          data: ['', '']
        },
        radar: {
          // shape: 'circle',
          indicator: indicator
        },
        series: [
          {
            name: '',
            type: 'radar',
            data: [
              {
                label: { show: true, },
                value: minValues,
                name: 'Нижние референтные значения',
                itemStyle: {
                  color: '#F9713C'
                },
                lineStyle: {
                  type: 'dashed'
                },
              },
              {
                label: { show: true, },
                value: maxValues,
                name: 'Верхние референтные значения',
                itemStyle: {
                  color: '#F9713C'
                },
                lineStyle: {
                  type: 'dashed'
                },
              },
              {
                label: { show: true, },
                value: values,
                name: 'Результат'
              }
            ]
          }
        ]
      };
}


export {getBOption}