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
    style: { backgroundColor: '#1cb052', borderColor: '#16a34a', color: 'white', fontWeight: 'bold' },
    icon: () => React.createElement(CheckCircle, { 
      className: 'h-5 w-5 text-white'
    }),
    defaultDuration: 3000
  },
  error: {
    style: { backgroundColor: '#ef4444', borderColor: '#dc2626', color: 'white', fontWeight: 'bold' },
    icon: () => React.createElement(XCircle, { 
      className: 'h-5 w-5 text-white'
    }),
    defaultDuration: 4000
  },
  warning: {
    style: { backgroundColor: '#f59e0b', borderColor: '#d97706', color: 'white', fontWeight: 'bold' },
    icon: () => React.createElement(AlertTriangle, { 
      className: 'h-5 w-5 text-white'
    }),
    defaultDuration: 4000
  },
  info: {
    style: { backgroundColor: '#3b82f6', borderColor: '#2563eb', color: 'white', fontWeight: 'bold' },
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
      title: 'font-bold! text-sm leading-tight',
      description: 'text-xs opacity-90 leading-relaxed',
      toast: 'backdrop-blur-sm',
    },
    ...restOptions
  });
};
