// src/utils/chartConfig.js

export function setupBarChart(labels, data, title) {
    return {
      title: { text: title, left: 'center' },
      tooltip: {},
      xAxis: { type: 'category', data: labels },
      yAxis: { type: 'value' },
      series: [
        {
          name: title,
          type: 'bar',
          data: data,
          itemStyle: { color: '#42A5F5' },
        },
      ],
    };
  }
  
  export function setupPieChart(labels, data, title) {
    return {
      title: { text: title, left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: title,
          type: 'pie',
          radius: '50%',
          data: labels.map((label, index) => ({ value: data[index], name: label })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }
  
  // Similarly for setupLineChart and setupSummaryChart
  