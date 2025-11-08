declare module 'antd-mobile' {
  import type { CSSProperties, ReactNode } from 'react'

  export interface SpinLoadingProps {
    color?: 'default' | 'primary' | string
    style?: CSSProperties
    className?: string
    children?: ReactNode
  }

  export const SpinLoading: React.FC<SpinLoadingProps>
}

