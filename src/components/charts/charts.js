function getBOption(min_values,values,max_values){
    
    // console.log(min_values)
    // console.log(values)
    // console.log(max_values)
    let title_text = 'Относительные параметры B - клеточного звена иммунитета'
    let radar_indicator = [
        { name: 'NEU/CD19' },
        { name: 'NEU/LYMF' },
        { name: 'CD19/CD8' },
        { name: 'CD19/CD4' },
      ]

    let option = getBaseOption(title_text,radar_indicator,min_values,values,max_values)
    // console.log(option)
      return option
}

function getTOption(min_values,values,max_values){
    
  // console.log(min_values)
  // console.log(values)
  // console.log(max_values)
  let title_text = 'Относительные параметры T - клеточного звена иммунитета'
  let radar_indicator = [
      { name: 'NEU/CD3' },
      { name: 'NEU/LYMF' },
      { name: 'NEU/CD8' },
      { name: 'NEU/CD4' }
    ]

  let option = getBaseOption(title_text,radar_indicator,min_values,values,max_values)
  // console.log(option)
    return option
}

function getCytokineOption(min_values,values,max_values){
  let scale = 1.2;
  let maxValue = Math.max(...min_values, ...values, ...max_values)
  let title_text = 'Цитокиновые пары'
  let radar_indicator = [
      { name: 'ФНО', max:maxValue*scale },
      { name: 'Интерферон гамма',max:maxValue*scale },
      { name: 'Интерлейкин 2', max:maxValue*scale },
    ]

  let option = getBaseOption(title_text,radar_indicator,min_values,values,max_values)
  // console.log(option)
    return option
}


function getBaseOption(titleText,indicator,minValues, values, maxValues){
    return {
        title: {
          left: 'center',
          text: titleText
        },
        legend: {
          top:30,
          data: ['Нижние референтные значения','Результат', 'Верхние референтные значения']
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


export {getBOption, getTOption, getCytokineOption}