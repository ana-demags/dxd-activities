'use client';

import type { Transition, Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

export interface LoaderPinwheelIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LoaderPinwheelIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const gVariants: Variants = {
  hidden: { rotate: 0, opacity: 0 },
  normal: { rotate: 0, opacity: 1 },
  animate: {
    rotate: 360,
    opacity: 1,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear',
    },
  },
  animateOnce: {
    rotate: 360,
    opacity: 1,
    transition: {
      opacity: { duration: 0.3, ease: 'easeOut' },
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 50,
  damping: 10,
};

const LoaderPinwheelIcon = forwardRef<
  LoaderPinwheelIconHandle,
  LoaderPinwheelIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => {
        if (!shouldReduceMotion) controls.start('animateOnce');
      },
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!shouldReduceMotion) controls.start('animate');
      onMouseEnter?.(e);
    },
    [controls, onMouseEnter, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      controls.start('normal');
      onMouseLeave?.(e);
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.g
          transition={defaultTransition}
          variants={gVariants}
          animate={controls}
          initial="hidden"
        >
          <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
          <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
          <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
          <circle cx="12" cy="12" r="10" />
        </motion.g>
      </svg>
    </div>
  );
});

LoaderPinwheelIcon.displayName = 'LoaderPinwheelIcon';

export { LoaderPinwheelIcon };
