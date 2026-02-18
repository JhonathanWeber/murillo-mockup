"use client";

import { motion, Variants } from "framer-motion";

interface TypingEffectProps {
    text: string;
    className?: string; // Additional classes for wrapper
    speed?: number; // Speed in seconds per character (default 0.05) if no totalDuration
    delay?: number; // Delay before starting animation (default 0)
    totalDuration?: number; // If set, calculates speed based on text length
    triggerOnView?: boolean; // Whether to animate when in view (default true)
}

export function TypingEffect({
    text,
    className = "",
    speed = 0.05,
    delay = 0,
    totalDuration,
    triggerOnView = true
}: TypingEffectProps) {
    // Calculate speed if totalDuration is provided. otherwise use speed prop
    const calculatedSpeed = totalDuration
        ? totalDuration / (text.length || 1) // Avoid division by zero
        : speed;

    // Split text into words to prevent breaking in the middle of a word
    const words = text.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: calculatedSpeed,
                delayChildren: delay,
            },
        },
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 5,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.span
            variants={container}
            initial="hidden"
            whileInView={triggerOnView ? "visible" : undefined}
            animate={!triggerOnView ? "visible" : undefined}
            viewport={{ once: true }}
            className={`inline-block ${className}`}
        >
            {words.map((word, index) => (
                <span key={index} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                        <motion.span key={charIndex} variants={child} className="inline-block">
                            {char}
                        </motion.span>
                    ))}
                    {index < words.length - 1 && (
                        <motion.span variants={child} className="inline-block">
                            &nbsp;
                        </motion.span>
                    )}
                </span>
            ))}
        </motion.span>
    );
}
