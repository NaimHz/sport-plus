export type Difficulty = 'facile' | 'moyen' | 'difficile';

export type ExerciseResult = {
    id: string;
    exerciseId: string;
    exerciseName: string;
    duration: number;
    repetitions: number;
    completedAt: string;
    completed: boolean;
    timeLeft: number;
    difficulty: Difficulty;
};

export type Exercise = {
    id: string;
    name: string;
    durationPerRep: {
        facile: number;
        moyen: number;
        difficile: number;
    };
    description: string;
    instructions: string;
};
