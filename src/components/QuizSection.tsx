import React, { useState } from 'react';
import { MuseumCard, MuseumCardContent, MuseumCardHeader, MuseumCardTitle } from './ui/museum-card';
import { MuseumButton } from './ui/museum-button';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer?: number;
  correctAnswers?: Array<{answerIndex: number, completionText: string}>;
  clues: string[];
  completionText?: string;
}

interface QuizData {
  title: string;
  subtitle: string;
  questions: Question[];
  completionText?: string;
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
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>([]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);

    const newFeedback = [...showFeedback];
    newFeedback[questionIndex] = true;
    setShowFeedback(newFeedback);

    const question = quizData.questions[questionIndex];
    
    // Check if answer is correct (handle both single and branching answers)
    let isCorrectAnswer = false;
    if (question.correctAnswers) {
      // Branching question - check if answer is in the correct answers array
      isCorrectAnswer = question.correctAnswers.some(ca => ca.answerIndex === answerIndex);
    } else if (question.correctAnswer !== undefined) {
      // Single correct answer question
      isCorrectAnswer = answerIndex === question.correctAnswer;
    }
    
    if (isCorrectAnswer) {
      // Auto-advance to next question if correct
      setTimeout(() => {
        if (questionIndex < quizData.questions.length - 1) {
          setCurrentQuestion(questionIndex + 1);
          // Reset feedback for new question
          const resetFeedback = [...showFeedback];
          resetFeedback[questionIndex + 1] = false;
          setShowFeedback(resetFeedback);
        } else {
          setIsCompleted(true);
        }
      }, 1500);
    } else {
      // Stay on same question if wrong, reset after showing feedback
      setTimeout(() => {
        const resetFeedback = [...showFeedback];
        resetFeedback[questionIndex] = false;
        setShowFeedback(resetFeedback);
        
        const resetAnswers = [...selectedAnswers];
        resetAnswers[questionIndex] = undefined as any;
        setSelectedAnswers(resetAnswers);
      }, 2000);
    }
  };

  const isCorrect = (questionIndex: number) => {
    const question = quizData.questions[questionIndex];
    const selectedAnswer = selectedAnswers[questionIndex];
    
    if (question.correctAnswers) {
      // Branching question
      return question.correctAnswers.some(ca => ca.answerIndex === selectedAnswer);
    } else if (question.correctAnswer !== undefined) {
      // Single correct answer question
      return selectedAnswer === question.correctAnswer;
    }
    return false;
  };

  const getCompletionText = (questionIndex: number) => {
    const question = quizData.questions[questionIndex];
    const selectedAnswer = selectedAnswers[questionIndex];
    
    if (question.correctAnswers) {
      // Branching question - find the specific completion text for the selected answer
      const correctAnswer = question.correctAnswers.find(ca => ca.answerIndex === selectedAnswer);
      return correctAnswer?.completionText || 'Правильно! Переходите к следующему вопросу';
    } else {
      // Single answer question
      return question.completionText || (questionIndex < quizData.questions.length - 1 ? 'Правильно! Переходите к следующему вопросу' : 'Завершить этап');
    }
  };

  const currentQ = quizData.questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;
  const showCurrentFeedback = showFeedback[currentQuestion];

  if (!isActive) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-garamond text-4xl font-bold text-white tracking-wide drop-shadow-lg">
          {quizData.title}
        </h1>
        <p className="font-sans text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
          {quizData.subtitle}
        </p>
      </div>

      <MuseumCard className="max-w-4xl mx-auto p-2 md:p-8">
        <MuseumCardHeader>
          <MuseumCardTitle className="text-lg md:text-3xl mb-3 md:mb-8 text-center">
            {currentQ.text}
          </MuseumCardTitle>
        </MuseumCardHeader>

        <MuseumCardContent>
          <div className="grid gap-2 md:gap-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !hasAnswered && handleAnswerSelect(currentQuestion, index)}
                disabled={hasAnswered}
                className={cn(
                  "group relative p-3 md:p-6 text-left rounded-lg border-2 transition-all duration-300",
                  "bg-gradient-to-br from-museum-charcoal to-museum-dusty-brown",
                  "border-museum-aged-gold/30 text-museum-aged-gold",
                  "hover:scale-[1.02] hover:shadow-glass focus:outline-none",
                  !hasAnswered && "hover:border-museum-aged-gold/60 hover:bg-gradient-to-br hover:from-museum-dusty-brown hover:to-museum-charcoal cursor-pointer",
                  hasAnswered && index === selectedAnswers[currentQuestion] && index !== currentQ.correctAnswer && "border-red-400/60 bg-red-900/30",
                  hasAnswered && "cursor-default"
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-garamond text-base md:text-xl leading-relaxed text-museum-aged-gold font-semibold">
                      {option}
                    </span>
                    
                    {showCurrentFeedback && index === selectedAnswers[currentQuestion] && isCorrect(currentQuestion) && (
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 animate-ripple flex-shrink-0" />
                    )}
                  </div>
                  
                  {showCurrentFeedback && index === selectedAnswers[currentQuestion] && !isCorrect(currentQuestion) && currentQ.clues[index] && (
                    <p className="font-sans text-xs md:text-sm text-red-400 leading-relaxed">
                      💡 {currentQ.clues[index]}
                    </p>
                  )}
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-museum-aged-gold/10 to-museum-aged-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>

          {showCurrentFeedback && isCorrect(currentQuestion) && (
            <div className="mt-3 md:mt-6 p-3 md:p-6 rounded-lg bg-gradient-shadow border border-border/20 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                <p className="font-sans text-green-700 font-medium text-sm md:text-base">
                  {getCompletionText(currentQuestion)}
                </p>
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="mt-8 text-center space-y-4">
              <p className="font-garamond text-xl text-center text-museum-aged-gold font-semibold">
                {quizData.completionText || "Задание завершено!"}
              </p>
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