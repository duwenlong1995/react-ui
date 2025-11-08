import React from 'react';
import BaseChart from './BaseChart';
import type { LineChartProps } from './types';

const LineChart: React.FC<LineChartProps> = ({
    data,
    config,
    theme = 'auto',
    smooth = true,
    areaStyle = false,
    stack,
    step = false,
    ...props
}) => {
    // 合并配置
    const mergedConfig = {
        ...config,
        series: [
            {
                ...config?.series?.[0],
                smooth,
                areaStyle: areaStyle ? {} : undefined,
                stack,
                step,
                type: 'line'
            }
        ]
    };

    return (
        <BaseChart
            chartType="line"
            data={data}
            config={mergedConfig as any}
            theme={theme}
            {...props}
        />
    );
};

export default LineChart;
