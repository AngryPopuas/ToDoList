import { Button, ConfigProvider, Input, Space, theme } from 'antd';
import React from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
    <ConfigProvider
        theme={{
            algorithm: theme.darkAlgorithm,
            components: {
                Button: {
                    fontSize: 16,
                    borderRadius: 4,
                },
                Input: {
                    fontSize: 16,
                    borderRadius: 4,
                }
            }
        }}
    >
        {children}
    </ConfigProvider>
);

export default ThemeProvider;