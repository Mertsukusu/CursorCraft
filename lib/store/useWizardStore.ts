import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PlatformType = "web" | "mobile" | "desktop" | "api";
export type FrameworkType = string;

export interface Package {
  id: string;
  name: string;
  description: string;
  category?: string;
}

export interface WizardState {
  currentStep: number;
  projectName: string;
  projectDescription: string;
  platform: PlatformType | null;
  framework: FrameworkType | null;
  selectedPackages: string[];
  
  // Generated prompts
  generatedPRD: string | null;
  generatedCodeStyle: string | null;
  generatedCursorRules: string | null;
  generatedProgressTracker: string | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  setProjectName: (name: string) => void;
  setProjectDescription: (description: string) => void;
  setPlatform: (platform: PlatformType) => void;
  setFramework: (framework: FrameworkType) => void;
  addPackage: (packageId: string) => void;
  removePackage: (packageId: string) => void;
  togglePackage: (packageId: string) => void;
  
  setGeneratedPRD: (content: string) => void;
  setGeneratedCodeStyle: (content: string) => void;
  setGeneratedCursorRules: (content: string) => void;
  setGeneratedProgressTracker: (content: string) => void;
  
  resetWizard: () => void;
  canProceed: () => boolean;
}

const initialState = {
  currentStep: 0,
  projectName: "",
  projectDescription: "",
  platform: null,
  framework: null,
  selectedPackages: [],
  
  generatedPRD: null,
  generatedCodeStyle: null,
  generatedCursorRules: null,
  generatedProgressTracker: null,
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setProjectName: (name) => set({ projectName: name }),
      
      setProjectDescription: (description) => set({ projectDescription: description }),
      
      setPlatform: (platform) => set({ 
        platform,
        // Reset framework when platform changes
        framework: null
      }),
      
      setFramework: (framework) => set({ framework }),
      
      addPackage: (packageId) => set((state) => ({
        selectedPackages: [...state.selectedPackages, packageId]
      })),
      
      removePackage: (packageId) => set((state) => ({
        selectedPackages: state.selectedPackages.filter(id => id !== packageId)
      })),
      
      togglePackage: (packageId) => {
        const { selectedPackages } = get();
        if (selectedPackages.includes(packageId)) {
          get().removePackage(packageId);
        } else {
          get().addPackage(packageId);
        }
      },
      
      setGeneratedPRD: (content) => set({ generatedPRD: content }),
      setGeneratedCodeStyle: (content) => set({ generatedCodeStyle: content }),
      setGeneratedCursorRules: (content) => set({ generatedCursorRules: content }),
      setGeneratedProgressTracker: (content) => set({ generatedProgressTracker: content }),
      
      resetWizard: () => set(initialState),
      
      canProceed: () => {
        const { currentStep, projectName, platform, framework } = get();
        
        // Step 0: Project Basics
        if (currentStep === 0) {
          return projectName.trim().length > 0;
        }
        
        // Step 1: Platform
        if (currentStep === 1) {
          return platform !== null;
        }
        
        // Step 2: Framework
        if (currentStep === 2) {
          return framework !== null;
        }
        
        // Step 3: Packages - can proceed regardless
        return true;
      }
    }),
    {
      name: "cursorcraft-wizard-state"
    }
  )
); 