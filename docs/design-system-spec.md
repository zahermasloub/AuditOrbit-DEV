🎯 **مهمة Copilot:** تنفيذ نظام تصميم موحد وإعداد البنية الأساسية للواجهة الأمامية

## 📋 **نطاق العمل:**
- إنشاء نظام ألوان وتصميم موحد
- إعداد مكتبة المكونات الأساسية
- تكوين نظام التنقل الموحد
- إعداد بيئة التطوير

## 🛠️ **التنفيذ خطوة بخطوة:**

### 1. إعداد نظام التصميم (Design System)
\`\`\`javascript
// src/design-system/theme.js
export const designSystem = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#ffffff',
    surface: '#f8fafc',
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      disabled: '#94a3b8',
    }
  },
  typography: {
    fontFamily: {
      arabic: "'Cairo', 'Tajawal', sans-serif",
      english: "'Inter', 'Segoe UI', sans-serif"
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    }
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  }
};

// تطبيق Theme Provider
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${props => props.theme.typography.fontFamily.arabic};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text.primary};
    line-height: 1.6;
    direction: rtl;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }
  
  input, textarea, select {
    font-family: inherit;
    outline: none;
  }
`;

export const DesignSystemProvider = ({ children }) => (
  <ThemeProvider theme={designSystem}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
