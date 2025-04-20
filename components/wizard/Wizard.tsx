"use client";

import React from "react";
import { Steps } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useWizardStore } from "@/lib/store/useWizardStore";
import { StepBasics } from "./StepBasics";
import { StepPlatform } from "./StepPlatform";
import { StepFramework } from "./StepFramework";
import { StepPackages } from "./StepPackages";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = ["Project Basics", "Platform", "Framework", "Packages & Tools"];

/**
 * Main Wizard component for the multi-step configuration
 */
export function Wizard() {
  const { 
    currentStep, 
    setCurrentStep,
    canProceed
  } = useWizardStore();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1 && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepBasics />;
      case 1:
        return <StepPlatform />;
      case 2:
        return <StepFramework />;
      case 3:
        return <StepPackages />;
      default:
        return <StepBasics />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-10">
        <Steps currentStep={currentStep} steps={STEPS} />
      </div>

      <div className="mb-8">{renderStep()}</div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed() || currentStep === STEPS.length - 1}
          className={cn(
            "flex items-center gap-1",
            currentStep === STEPS.length - 1 && "hidden"
          )}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>

        {currentStep === STEPS.length - 1 && (
          <Button
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            onClick={() => window.location.href = "/generate"}
            disabled={!canProceed()}
          >
            Generate Prompts
          </Button>
        )}
      </div>
    </div>
  );
} 