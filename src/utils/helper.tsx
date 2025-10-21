import { AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';
import { Status } from '../types';

export const getStatus = (score: number | null): Status => {
  if (score === null) return {
    label: 'Not Analyzed',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    icon: Shield
  };
  if (score < 25) return { 
    label: 'Safe', 
    color: 'text-white', 
    bgColor: 'bg-gradient-to-r from-orange-400 to-orange-500',
    borderColor: 'border-orange-500',
    icon: CheckCircle 
  };
  if (score < 50) return { 
    label: 'Low Risk', 
    color: 'text-white', 
    bgColor: 'bg-gradient-to-r from-orange-500 to-orange-600',
    borderColor: 'border-orange-600',
    icon: Shield 
  };
  if (score < 75) return { 
    label: 'Risky', 
    color: 'text-white', 
    bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
    borderColor: 'border-red-600',
    icon: AlertTriangle 
  };
  return { 
    label: 'Critical', 
    color: 'text-white', 
    bgColor: 'bg-gradient-to-r from-red-600 to-red-700',
    borderColor: 'border-red-700',
    icon: XCircle 
  };
};

export const getGradientColor = (score: number): string => {
  if (score < 25) return 'from-orange-400 to-orange-500';
  if (score < 50) return 'from-orange-500 to-orange-600';
  if (score < 75) return 'from-red-500 to-red-600';
  return 'from-red-600 to-red-700';
};
