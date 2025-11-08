import React from 'react';
import BaseChart from './BaseChart';
import type { ScatterChartProps } from './types';

const ScatterChart: React.FC<ScatterChartProps> = ({
    data,
    config,
    theme = 'auto',
    symbolSize = 8,
    symbol = 'circle',
    large = false,
    largeThreshold = 2000,
    ...props
}) => {
    // 合并配置
    const mergedConfig = {
        ...config,
        series: [
            {
                ...config?.series?.[0],
                type: 'scatter',
                symbolSize,
                symbol,
                large,
                largeThreshold
            }
        ]
    };

    return (
        <BaseChart
            chartType="scatter"
            data={data}
            config={mergedConfig as any}
            theme={theme}
            {...props}
        />
    );
};

export default ScatterChart;
