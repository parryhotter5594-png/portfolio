import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  className?: string;
  threshold?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  direction = "up", 
  delay = 0,
  className = "",
  threshold = 0.2
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can disconnect if we only want it to animate once
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0 translate-y-8"; // Initial state
    
    switch (direction) {
      case "up": return "animate-fade-in-up";
      case "left": return "animate-fade-in-left";
      case "right": return "animate-fade-in-right";
      case "none": return "animate-[fadeIn_0.5s_ease-out_forwards]";
      default: return "animate-fade-in-up";
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${className}`} 
      style={{ width }}
    >
      <div 
        className={`${isVisible ? getAnimationClass() : 'opacity-0'} transition-all duration-700 ease-out`}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </div>
    </div>
  );
};

interface CountUpProps {
  end: string;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, className = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  
  // Extract number from string (e.g., "1,500+" -> 1500)
  const numericValue = parseInt(end.replace(/[^0-9]/g, '')) || 0;
  const suffix = end.replace(/[0-9,]/g, '');
  const prefix = end.match(/^[^0-9]*/) ? end.match(/^[^0-9]*/)![0] : '';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      // Ease out quart
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(ease * numericValue));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, numericValue, duration]);

  // Format number with commas
  const formattedCount = count.toLocaleString();

  // If the value isn't numeric (like "~21h"), just show the original string after a delay
  if (numericValue === 0 && end.length > 0) {
      return <span ref={ref} className={className}>{end}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};