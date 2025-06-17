'use client';

import React from 'react';

import { AlertTriangle, CheckCircle, Info,XCircle } from 'lucide-react';
import { type ExternalToast,toast } from 'sonner';

type ShowToastParams = {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
} & ExternalToast

// Custom styling for different toast types
const toastStyles = {
  success: {
    style: { 
      backgroundColor: 'hsl(79 98% 50%)', // Brand accent color (#adfc03)
      borderColor: 'hsl(79 98% 45%)', 
      color: 'black', 
      fontWeight: 'bold' 
    },
    icon: () => React.createElement(CheckCircle, { 
      className: 'h-5 w-5 text-black'
    }),
    defaultDuration: 3000
  },
  error: {
    style: { 
      backgroundColor: 'hsl(0 84.2% 60.2%)', // Brand destructive color
      borderColor: 'hsl(0 84.2% 55%)', 
      color: 'white', 
      fontWeight: 'bold' 
    },
    icon: () => React.createElement(XCircle, { 
      className: 'h-5 w-5 text-white'
    }),
    defaultDuration: 4000
  },
  warning: {
    style: { 
      backgroundColor: 'hsl(38 92% 50%)', // Warmer orange that complements the brand
      borderColor: 'hsl(38 92% 45%)', 
      color: 'white', 
      fontWeight: 'bold' 
    },
    icon: () => React.createElement(AlertTriangle, { 
      className: 'h-5 w-5 text-white'
    }),
    defaultDuration: 4000
  },
  info: {
    style: { 
      backgroundColor: 'hsl(221.2 83.2% 53.3%)', // Brand primary color
      borderColor: 'hsl(221.2 83.2% 48%)', 
      color: 'white', 
      fontWeight: 'bold' 
    },
    icon: () => React.createElement(Info, { 
      className: 'h-5 w-5 text-white'
    }),
    defaultDuration: 3500
  }
};

export const showToast = ({ 
  type, 
  title, 
  ...options
}: ShowToastParams) => {
  const defaultStyle = toastStyles[type];
  
  // Extract custom options and merge with defaults
  const {
    description,
    duration,
    style,
    position,
    richColors,
    unstyled,
    ...restOptions
  } = options;
  
  toast[type](title, {
    description,
    duration: duration ?? defaultStyle.defaultDuration,
    style: unstyled ? style : { ...defaultStyle.style, ...style },
    icon: unstyled ? undefined : defaultStyle.icon(),
    position: position ?? 'top-right',
    richColors: richColors ?? true,
    closeButton: true,
    classNames: unstyled ? undefined : {
      closeButton: 'text-gray-500 hover:text-gray-700 transition-colors',
      actionButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors',
      cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors',
      title: '!font-bold font-body tracking-wide text-sm leading-tight',
      description: 'text-xs opacity-90 leading-relaxed font-mono',
      toast: 'backdrop-blur-sm',
    },
    ...restOptions
  });
};
