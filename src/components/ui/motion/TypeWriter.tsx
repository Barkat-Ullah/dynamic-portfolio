"use client";

import { useEffect, useState } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);

      const wordsArray = words.map((word) => word.text);
      const textToType = wordsArray.join(" ");
      console.log(textToType);

      const letterAnimation = async () => {
        await animate(
          "span",
          {
            opacity: 1,
            x: 0,
          },
          {
            duration: 0.1,
            delay: stagger(0.1),
            ease: "easeInOut",
          }
        );
      };

      letterAnimation();
    }
  }, [isInView, animate, started, words]);

  const renderWords = () => {
    return (
      <div className="inline">
        {words.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.split("").map((char, index) => (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  key={`char-${index}`}
                  className={cn(`opacity-0`, word.className)}
                >
                  {char}
                </motion.span>
              ))}
              {idx < words.length - 1 && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  className="opacity-0"
                >
                  &nbsp;
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      ref={scope}
      className={cn("text-base font-bold text-center sm:text-start", className)}
    >
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block h-5 w-[2px] bg-primary ml-1",
          cursorClassName
        )}
      />
    </div>
  );
};
