"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max: number;
  determinate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, determinate = true, ...props }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
          className
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={determinate ? value : undefined}
        {...props}
      >
        <div
          className="h-full w-full flex-1 bg-primary transition-all"
          style={
            determinate
              ? { transform: `translateX(-${100 - percentage}%)` }
              : { animation: "indeterminate 1.5s infinite ease" }
          }
        />
      </div>
    );
  }
);

Progress.displayName = "Progress";

export interface StepIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  currentStep: number;
  label: string;
}

export const StepIndicator = React.forwardRef<HTMLDivElement, StepIndicatorProps>(
  ({ className, step, currentStep, label, ...props }, ref) => {
    const isActive = step === currentStep;
    const isCompleted = step < currentStep;
    
    return (
      <div className="flex flex-col items-center gap-2" ref={ref} {...props}>
        <div 
          className={cn(
            "step-indicator",
            isActive && "active",
            isCompleted && "completed",
            className
          )}
        >
          {isCompleted ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <span>{step + 1}</span>
          )}
          
          {step !== 0 && (
            <div 
              className={cn(
                "step-connector -left-full",
                (isActive || isCompleted) && "active"
              )}
            />
          )}
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
    );
  }
);

StepIndicator.displayName = "StepIndicator";

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  steps: string[];
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, currentStep, steps, ...props }, ref) => {
    return (
      <div 
        className={cn("flex w-full justify-between", className)} 
        ref={ref} 
        {...props}
      >
        {steps.map((label, index) => (
          <StepIndicator 
            key={index} 
            step={index} 
            currentStep={currentStep} 
            label={label} 
          />
        ))}
      </div>
    );
  }
);

Steps.displayName = "Steps";

export { Progress }; 