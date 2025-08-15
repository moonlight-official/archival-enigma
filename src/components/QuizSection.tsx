import React, { useState } from 'react';
import { MuseumCard, MuseumCardContent, MuseumCardHeader, MuseumCardTitle } from './ui/museum-card';
import { MuseumButton } from './ui/museum-button';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  title: string;
  subtitle: string;
  questions: Question[];
}

interface QuizSectionProps {
  quizData: QuizData;
  onComplete: () => void;
  isActive: boolean;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ 
  quizData, 
  onComplete, 
  isActive 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);

    const newFeedback = [...showFeedback];
    newFeedback[questionIndex] = true;
    setShowFeedback(newFeedback);

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (questionIndex < quizData.questions.length - 1) {
        setCurrentQuestion(questionIndex + 1);
      } else {
        setIsCompleted(true);
      }
    }, 1500);
  };

  const isCorrect = (questionIndex: number) => {
    return selectedAnswers[questionIndex] === quizData.questions[questionIndex].correctAnswer;
  };

  const currentQ = quizData.questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;
  const showCurrentFeedback = showFeedback[currentQuestion];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-garamond text-4xl font-bold text-foreground tracking-wide">
          {quizData.title}
        </h1>
        <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {quizData.subtitle}
        </p>
      </div>

      <MuseumCard className="max-w-4xl mx-auto p-8">
        <MuseumCardHeader>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                {currentQuestion + 1} / {quizData.questions.length}
              </div>
              <div className="h-2 bg-muted/30 rounded-full w-48 overflow-hidden">
                <div 
                  className="h-full bg-gradient-golden transition-all duration-700 ease-out"
                  style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <MuseumCardTitle className="text-2xl mb-8">
            {currentQ.text}
          </MuseumCardTitle>
        </MuseumCardHeader>

        <MuseumCardContent>
          <div className="grid gap-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !hasAnswered && handleAnswerSelect(currentQuestion, index)}
                disabled={hasAnswered}
                className={cn(
                  "group relative p-6 text-left rounded-lg border-2 transition-all duration-300",
                  "hover:scale-[1.01] hover:shadow-glass focus:outline-none",
                  !hasAnswered && "hover:border-accent/50 hover:bg-accent/5 cursor-pointer",
                  hasAnswered && index === currentQ.correctAnswer && "border-green-400/60 bg-green-50/50",
                  hasAnswered && index === selectedAnswers[currentQuestion] && index !== currentQ.correctAnswer && "border-red-400/60 bg-red-50/50",
                  !hasAnswered && "border-border/30 bg-muted/20",
                  hasAnswered && "cursor-default"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-base leading-relaxed text-foreground">
                    {option}
                  </span>
                  
                  {showCurrentFeedback && (
                    <div className="ml-4 flex-shrink-0">
                      {index === currentQ.correctAnswer ? (
                        <CheckCircle className="w-6 h-6 text-green-500 animate-bloom" />
                      ) : index === selectedAnswers[currentQuestion] && (
                        <XCircle className="w-6 h-6 text-red-500 animate-ripple" />
                      )}
                    </div>
                  )}
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-lg bg-gradient-golden opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              </button>
            ))}
          </div>

          {showCurrentFeedback && (
            <div className="mt-8 p-6 rounded-lg bg-gradient-shadow border border-border/20 animate-fade-in">
              <div className="flex items-center space-x-3">
                {isCorrect(currentQuestion) ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <p className="font-sans text-green-700 font-medium">
                      Правильно! {currentQuestion < quizData.questions.length - 1 ? 'Переходите к следующему вопросу' : 'Завершить этап'}
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <p className="font-sans text-red-700 font-medium">
                      Неверно. Правильный ответ: {currentQ.options[currentQ.correctAnswer]}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="mt-8 text-center">
              <MuseumButton 
                variant="liquid" 
                size="lg"
                onClick={onComplete}
                className="group"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Далее</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </MuseumButton>
            </div>
          )}
        </MuseumCardContent>
      </MuseumCard>
    </div>
  );
};

function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}