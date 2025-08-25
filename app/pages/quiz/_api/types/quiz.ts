export interface QuizResponse {
  quizId: number;
  title: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}
