'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { motion, useAnimation, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

const STRETCH_VARIANTS: Variants = {
  hidden: { scaleX: 1, x: 0, opacity: 0 },
  normal: { scaleX: 1, x: 0, opacity: 1 },
  animate: {
    scaleX: [1, 1.15, 1],
    x: [0, 2, 0],
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 0.2,
    },
  },
  animateOnce: {
    scaleX: [1, 1.15, 1],
    x: [0, 2, 0],
    opacity: 1,
    transition: {
      opacity: { duration: 0.3, ease: 'easeOut' },
      duration: 0.45,
      ease: 'easeInOut',
      repeat: 3,
      repeatDelay: 0.2,
    },
  },
};

export interface CornerDownRightIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CornerDownRightIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CornerDownRightIcon = forwardRef<
  CornerDownRightIconHandle,
  CornerDownRightIconProps
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
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={controls}
        variants={STRETCH_VARIANTS}
        initial="hidden"
      >
        <path d="m15 10 5 5-5 5" />
        <path d="M4 4v7a4 4 0 0 0 4 4h12" />
      </motion.svg>
    </div>
  );
});

CornerDownRightIcon.displayName = 'CornerDownRightIcon';

export { CornerDownRightIcon };
