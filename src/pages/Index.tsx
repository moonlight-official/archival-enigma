import React, { useState } from 'react';
import { MuseumBackground } from '@/components/MuseumBackground';
import { QuizSection } from '@/components/QuizSection';
import { MuseumCard, MuseumCardContent, MuseumCardHeader, MuseumCardTitle } from '@/components/ui/museum-card';
import { MuseumButton } from '@/components/ui/museum-button';
import { quizData } from '@/data/quizData';
import { Trophy, RotateCcw } from 'lucide-react';

const Index = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
  const [completedQuizzes, setCompletedQuizzes] = useState<boolean[]>(new Array(quizData.length).fill(false));

  const handleQuizComplete = () => {
    const newCompleted = [...completedQuizzes];
    newCompleted[currentQuiz] = true;
    setCompletedQuizzes(newCompleted);
    setShowMenu(true);
  };

  const handleQuizStart = (index: number) => {
    setCurrentQuiz(index);
    setShowMenu(false);
  };

  const handleRestart = () => {
    setCompletedQuizzes(new Array(quizData.length).fill(false));
    setCurrentQuiz(0);
    setShowMenu(true);
  };

  const allCompleted = completedQuizzes.every(completed => completed);

  return (
    <div className="min-h-screen relative">
      <MuseumBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        {showMenu ? (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
              <h1 className="font-garamond text-6xl font-bold text-white tracking-wide animate-float drop-shadow-lg">
                Тайны тиары Афродиты
              </h1>
              <p className="font-sans text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow">
                Добро пожаловать в таинственные архивы музея. Разгадайте загадку исчезновения бесценной тиары,
                изучив улики и ответив на вопросы следствия.
              </p>
            </div>

            {/* Quiz Selection Grid */}
            <div className="grid grid-cols-1 gap-6">
              {quizData.map((quiz, index) => (
                <MuseumCard 
                  key={index}
                  className={`cursor-pointer transition-all duration-500 hover:scale-105 ${
                    completedQuizzes[index] ? 'opacity-75 bg-gradient-to-br from-gray-500/20 to-gray-600/20' : ''
                  }`}
                  onClick={() => handleQuizStart(index)}
                >
                  <MuseumCardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <MuseumCardTitle className="text-xl">
                        {quiz.title}
                      </MuseumCardTitle>
                      {completedQuizzes[index] && (
                        <Trophy className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {quiz.questions.length} вопрос{quiz.questions.length > 1 ? (quiz.questions.length > 4 ? 'ов' : 'а') : ''}
                    </p>
                  </MuseumCardHeader>
                  
                  <MuseumCardContent>
                    <MuseumButton 
                      variant="exhibit" 
                      className="w-full group"
                    >
                      <span className="group-hover:tracking-wider transition-all duration-300">
                        {completedQuizzes[index] ? 'Пройти снова' : 'Начать'}
                      </span>
                    </MuseumButton>
                  </MuseumCardContent>
                </MuseumCard>
              ))}
            </div>

            {/* Completion Status */}
            {allCompleted && (
              <div className="text-center space-y-6 mt-16">
                <MuseumCard className="max-w-2xl mx-auto p-8 bg-gradient-golden/5">
                  <MuseumCardContent className="text-center space-y-4">
                    <Trophy className="w-16 h-16 text-accent mx-auto animate-bloom" />
                    <h2 className="font-garamond text-3xl font-bold text-foreground">
                      Поздравляем!
                    </h2>
                    <p className="font-sans text-lg text-muted-foreground">
                      Вы успешно разгадали тайну тиары Афродиты и завершили все этапы расследования.
                    </p>
                    <MuseumButton 
                      variant="liquid" 
                      size="lg"
                      onClick={handleRestart}
                      className="mt-6"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Начать заново
                    </MuseumButton>
                  </MuseumCardContent>
                </MuseumCard>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Fixed back button */}
            <div className="fixed top-4 left-4 z-20">
              <MuseumButton 
                variant="archive" 
                onClick={() => setShowMenu(true)}
                className="shadow-lg"
              >
                ← Назад
              </MuseumButton>
            </div>
            
            {/* Quiz positioned higher */}
            <div className="pt-4">
              <QuizSection
                quizData={quizData[currentQuiz]}
                onComplete={handleQuizComplete}
                isActive={!showMenu}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;