import React from 'react';
import BaseChart from './BaseChart';
import type { PieChartProps } from './types';

const PieChart: React.FC<PieChartProps> = ({
    data,
    config,
    theme = 'auto',
    radius = ['40%', '70%'],
    center = ['50%', '50%'],
    roseType = false,
    labelLine = { show: true },
    ...props
}) => {
    // 合并配置
    const mergedConfig = {
        ...config,
        series: [
            {
                ...config?.series?.[0],
                type: 'pie',
                radius,
                center,
                roseType,
                labelLine,
                data: data
            }
        ]
    };

    return (
        <BaseChart
            chartType="pie"
            data={data}
            config={mergedConfig as any}
            theme={theme}
            {...props}
        />
    );
};

export default PieChart;
