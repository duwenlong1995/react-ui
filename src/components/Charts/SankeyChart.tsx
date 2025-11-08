import React from 'react';
import BaseChart from './BaseChart';
import type { SankeyChartProps } from './types';

const SankeyChart: React.FC<SankeyChartProps> = ({
    data,
    source,
    target,
    value,
    config,
    theme = 'auto',
    nodeWidth = 20,
    nodeGap = 8,
    layoutIterations = 32,
    ...props
}) => {
    // 合并配置
    const mergedConfig = {
        ...config,
        series: [
            {
                ...config?.series?.[0],
                type: 'sankey',
                data: data,
                links: data.map((item: any) => ({
                    source: item[source],
                    target: item[target],
                    value: item[value]
                })),
                nodeWidth,
                nodeGap,
                layoutIterations
            }
        ]
    };

    return (
        <BaseChart
            chartType="sankey"
            data={data}
            config={mergedConfig as any}
            theme={theme}
            {...props}
        />
    );
};

export default SankeyChart;
