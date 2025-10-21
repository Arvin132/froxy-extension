import { LucideIcon } from 'lucide-react';
import { Status } from '../types';

interface StatusBadgeProps {
  status: Status;
  StatusIcon: LucideIcon;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, StatusIcon }) => {
  return (
    <div className={`${status.bgColor} rounded-xl p-4 mb-6 flex items-center justify-center gap-3 shadow-lg border-2 ${status.borderColor}`}>
      <StatusIcon className={`w-7 h-7 ${status.color}`} />
      <span className={`text-xl font-bold ${status.color}`}>
        {status.label}
      </span>
    </div>
  );
};
