'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PixelButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}

export default function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon,
  type = 'button',
  isLoading = false
}: PixelButtonProps) {
  const baseStyles = "relative font-pixel uppercase tracking-wider cursor-pointer transition-all duration-150 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-gradient-to-b from-[#4ade80] to-[#22c55e] text-black shadow-[0_4px_0_#166534,0_6px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_0_#166534,0_8px_15px_rgba(0,0,0,0.4)] active:shadow-[0_2px_0_#166534,0_3px_5px_rgba(0,0,0,0.2)]",
    secondary: "bg-gradient-to-b from-[#6366f1] to-[#4f46e5] text-white shadow-[0_4px_0_#3730a3,0_6px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_0_#3730a3,0_8px_15px_rgba(0,0,0,0.4)] active:shadow-[0_2px_0_#3730a3,0_3px_5px_rgba(0,0,0,0.2)]",
    outline: "bg-transparent border-2 border-[#4ade80] text-[#4ade80] shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:bg-[#4ade80] hover:text-black",
    danger: "bg-gradient-to-b from-[#ef4444] to-[#dc2626] text-white shadow-[0_4px_0_#991b1b,0_6px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_0_#991b1b,0_8px_15px_rgba(0,0,0,0.4)] active:shadow-[0_2px_0_#991b1b,0_3px_5px_rgba(0,0,0,0.2)]"
  };

  const sizes = {
    sm: "px-4 py-2 text-[8px]",
    md: "px-6 py-3 text-[10px]",
    lg: "px-8 py-4 text-[12px]"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={{ y: disabled || isLoading ? 0 : -2 }}
      whileTap={{ y: disabled || isLoading ? 0 : 2 }}
    >
      {isLoading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        icon && <span>{icon}</span>
      )}
      {children}
    </motion.button>
  );
}
