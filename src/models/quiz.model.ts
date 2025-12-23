export interface QuizConfiguration {
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    numQuestions: number;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    hint: string;
}

export interface QuizResultDetail {
    question: string;
    providedAnswer: string | null;
    correctAnswer: string;
}

export interface QuizResults {
    score: number;
    totalQuestions: number;
    details: QuizResultDetail[];
}
