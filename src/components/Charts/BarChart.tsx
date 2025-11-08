import React from 'react';
import BaseChart from './BaseChart';
import type { BarChartProps } from './types';

const BarChart: React.FC<BarChartProps> = ({
    data,
    config,
    theme = 'auto',
    horizontal = false,
    stack,
    barWidth = '60%',
    barMaxWidth,
    ...props
}) => {
    // 合并配置
    const mergedConfig = {
        ...config,
        series: [
            {
                ...config?.series?.[0],
                type: 'bar',
                stack,
                barWidth,
                barMaxWidth
            }
        ]
    };

    // 如果是水平柱状图，交换X轴和Y轴
    if (horizontal) {
        mergedConfig.xAxis = {
            ...config?.yAxis,
            type: 'value'
        };
        mergedConfig.yAxis = {
            ...config?.xAxis,
            type: 'category'
        };
    }

    return (
        <BaseChart
            chartType="bar"
            data={data}
            config={mergedConfig as any}
            theme={theme}
            {...props}
        />
    );
};

export default BarChart;
