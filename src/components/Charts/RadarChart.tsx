import React from 'react';
import BaseChart from './BaseChart';
import type { RadarChartProps } from './types';

const RadarChart: React.FC<RadarChartProps> = ({
    data,
    indicator,
    config,
    theme = 'auto',
    shape = 'polygon',
    ...props
}) => {
    // 合并配置
    const mergedConfig: any = {
        ...config,
        radar: {
            indicator,
            shape,
            ...(config as any)?.radar
        },
        series: [
            {
                ...(config as any)?.series?.[0],
                type: 'radar',
                data: data
            }
        ]
    };

    return (
        <BaseChart
            chartType="radar"
            data={data}
            config={mergedConfig as any}
            theme={theme}
            {...props}
        />
    );
};

export default RadarChart;
