'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface WizardStep {
  number: number;
  title: string;
  description: string;
}

interface WizardLayoutProps {
  steps: WizardStep[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  isStepValid: boolean;
  children: React.ReactNode;
}

export function WizardLayout({
  steps,
  currentStep,
  onNext,
  onPrevious,
  onCancel,
  onSubmit,
  isStepValid,
  children
}: WizardLayoutProps) {
  const isLastStep = currentStep === steps.length;

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                  currentStep > step.number
                    ? 'border-[#3ecf8e] bg-[#3ecf8e] text-white'
                    : currentStep === step.number
                      ? 'border-[#3ecf8e] text-[#3ecf8e]'
                      : 'border-muted text-muted-foreground'
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    'text-xs font-medium',
                    currentStep === step.number
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-2 mt-[-30px]',
                  currentStep > step.number ? 'bg-[#3ecf8e]' : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].description}</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[400px]">{children}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          이전
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            취소
          </Button>
          {isLastStep ? (
            <Button
              onClick={onSubmit}
              disabled={!isStepValid}
              className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90"
            >
              <Check className="h-4 w-4 mr-1" />
              등록
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={!isStepValid}
              className="bg-[#3ecf8e] hover:bg-[#3ecf8e]/90"
            >
              다음
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
