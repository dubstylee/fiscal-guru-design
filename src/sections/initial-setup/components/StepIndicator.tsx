'use client'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: Array<{ number: number; label: string; completed: boolean }>
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step.number < currentStep
                    ? 'bg-amber-500 dark:bg-amber-400 text-white dark:text-slate-900'
                    : step.number === currentStep
                    ? 'bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-900 ring-4 ring-amber-500/20 dark:ring-amber-400/20'
                    : 'bg-stone-200 dark:bg-slate-800 text-stone-500 dark:text-slate-400'
                }`}
              >
                {step.completed ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <p
                className={`mt-2 text-xs font-semibold text-center max-w-[80px] ${
                  step.number === currentStep
                    ? 'text-slate-900 dark:text-slate-50'
                    : 'text-stone-500 dark:text-stone-400'
                }`}
              >
                {step.label}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all ${
                  step.number < currentStep
                    ? 'bg-amber-500 dark:bg-amber-400'
                    : 'bg-stone-200 dark:bg-slate-800'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  )
}

