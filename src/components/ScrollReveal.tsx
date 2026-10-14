import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
                                                              children,
                                                              className = '',
                                                              delay = 0,
                                                              direction = 'up',
                                                              duration = 0.6,
                                                          }) => {
    const getInitialPosition = () => {
        switch (direction) {
            case 'up':
                return { opacity: 0, y: 28 };
            case 'down':
                return { opacity: 0, y: -28 };
            case 'left':
                return { opacity: 0, x: 28 };
            case 'right':
                return { opacity: 0, x: -28 };
            case 'none':
                return { opacity: 0 };
        }
    };

    return (
        <motion.div
            initial={getInitialPosition()}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerContainer: React.FC<{
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.08 }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] },
                },
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
