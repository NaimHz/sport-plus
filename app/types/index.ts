export interface Exercise {
    id: string;
    name: string;
    durationPerRep: {
        facile: number;
        moyen: number;
        difficile: number;
    };
    description: string;
    instructions: string;
}

export type Difficulty = 'facile' | 'moyen' | 'difficile';

export interface ExerciseResult {
    id: string;
    exerciseId: string;
    exerciseName: string;
    duration: number;
    repetitions: number;
    completedAt: string;
    completed: boolean;
    timeLeft: number;
}
