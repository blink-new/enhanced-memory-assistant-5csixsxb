import { useState } from 'react';
import { CheckCircle, Zap } from 'lucide-react';

const OnboardingPage = ({ onFinish }: { onFinish: () => void }) => {
  const [step, setStep] = useState(1);

  const totalSteps = 4;

  const nextStep = () => {
    if (step === totalSteps) {
      onFinish();
    } else {
      setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
    }
  };
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <ConnectServicesStep />;
      case 3:
        return <PermissionsStep />;
      case 4:
        return <FinishStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in duration-500">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-2">
            <Zap className="w-8 h-8 text-indigo-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome to Memoria</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Create a persistent memory layer across all your AI conversations.</p>

          {/* Stepper */}
          <div className="flex items-center mb-8">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center w-full">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step > i + 1 ? 'bg-indigo-500 text-white' : step === i + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                  {step > i + 1 ? <CheckCircle size={20} /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`flex-1 h-1 ${step > i + 1 ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-colors"
            >
              {step === totalSteps ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
       <p className="text-xs text-gray-400 dark:text-gray-500 mt-6">© 2025 Memoria. All rights reserved.</p>
    </div>
  );
};

const WelcomeStep = () => (
  <div className="text-center">
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Never lose context again.</h2>
    <p className="text-gray-600 dark:text-gray-300">
      This extension will extract your conversation history from ChatGPT, Claude, Gemini, and Grok, then sync them so each AI has access to your complete conversation history.
    </p>
  </div>
);

const ConnectServicesStep = () => (
    <div className="text-center">
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Connect your AI services.</h2>
    <p className="text-gray-600 dark:text-gray-300 mb-6">
      Connect your accounts to start syncing your conversations.
    </p>
    <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">🤖 ChatGPT</button>
        <button className="flex items-center justify-center gap-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">🧠 Claude</button>
        <button className="flex items-center justify-center gap-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">💎 Gemini</button>
        <button className="flex items-center justify-center gap-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">🚀 Grok</button>
    </div>
  </div>
);

const PermissionsStep = () => (
  <div className="text-center">
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Grant necessary permissions.</h2>
    <p className="text-gray-600 dark:text-gray-300">
      To sync your data, we need your permission to access your conversation history.
    </p>
  </div>
);

const FinishStep = () => (
  <div className="text-center">
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">All set!</h2>
    <p className="text-gray-600 dark:text-gray-300">
      You're ready to start using your enhanced memory.
    </p>
  </div>
);

export default OnboardingPage;
