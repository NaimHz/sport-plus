import { Exercise } from '../types';

export const exercises: Exercise[] = [
    {
        id: '1',
        name: 'Pompes',
        durationPerRep: {
            facile: 4,
            moyen: 3,
            difficile: 2
        },
        description: 'Exercice de renforcement musculaire des bras et de la poitrine',
        instructions: '1. Placez vos mains à plat sur le sol, légèrement plus larges que vos épaules\n2. Gardez votre corps droit, en appui sur les orteils\n3. Descendez votre corps en pliant les coudes jusqu\'à ce que votre poitrine touche presque le sol\n4. Poussez pour revenir à la position de départ'
    },
    {
        id: '2',
        name: 'Squats',
        durationPerRep: {
            facile: 3,
            moyen: 2,
            difficile: 1.5
        },
        description: 'Exercice de renforcement des jambes',
        instructions: '1. Tenez-vous debout, pieds écartés à la largeur des épaules\n2. Gardez le dos droit et les bras tendus devant vous\n3. Pliez les genoux et descendez comme si vous vous asseyiez\n4. Remontez en poussant sur vos talons'
    },
    {
        id: '3',
        name: 'Planche',
        durationPerRep: {
            facile: 60,
            moyen: 45,
            difficile: 30
        },
        description: 'Exercice de gainage',
        instructions: '1. Placez vos avant-bras au sol, coudes sous les épaules\n2. Gardez votre corps droit, en appui sur les orteils\n3. Contractez les abdominaux et maintenez la position\n4. Respirez normalement pendant l\'exercice'
    },
    {
        id: '4',
        name: 'Burpees',
        durationPerRep: {
            facile: 6,
            moyen: 4,
            difficile: 3
        },
        description: 'Exercice cardio complet',
        instructions: '1. Commencez debout\n2. Accroupissez-vous et placez vos mains au sol\n3. Lancez vos pieds en arrière en position de planche\n4. Faites une pompe\n5. Ramenez vos pieds vers vos mains\n6. Sautez en l\'air avec les bras tendus'
    },
    {
        id: '5',
        name: 'Fentes',
        durationPerRep: {
            facile: 4,
            moyen: 3,
            difficile: 2
        },
        description: 'Exercice de renforcement des jambes et des fessiers',
        instructions: '1. Tenez-vous debout, pieds joints\n2. Faites un grand pas en avant avec une jambe\n3. Descendez jusqu\'à ce que votre genou arrière touche presque le sol\n4. Poussez sur votre jambe avant pour revenir à la position de départ'
    },
    {
        id: '6',
        name: 'Mountain Climbers',
        durationPerRep: {
            facile: 3,
            moyen: 2,
            difficile: 1.5
        },
        description: 'Exercice cardio et gainage',
        instructions: '1. Commencez en position de planche\n2. Amenez alternativement chaque genou vers votre poitrine\n3. Gardez le rythme rapide et contrôlé\n4. Maintenez le dos droit et les abdominaux contractés'
    },
    {
        id: '7',
        name: 'Jumping Jacks',
        durationPerRep: {
            facile: 2,
            moyen: 1.5,
            difficile: 1
        },
        description: 'Exercice cardio dynamique',
        instructions: '1. Tenez-vous debout, pieds joints\n2. Sautez en écartant les jambes et en levant les bras\n3. Revenez à la position initiale en sautant\n4. Gardez un rythme régulier'
    },
    {
        id: '8',
        name: 'Crunch',
        durationPerRep: {
            facile: 3,
            moyen: 2,
            difficile: 1.5
        },
        description: 'Exercice de renforcement des abdominaux',
        instructions: '1. Allongez-vous sur le dos, genoux pliés\n2. Placez vos mains derrière la tête\n3. Soulevez le haut du corps en contractant les abdominaux\n4. Redescendez lentement en contrôlant le mouvement'
    },
    {
        id: '9',
        name: 'Dips',
        durationPerRep: {
            facile: 4,
            moyen: 3,
            difficile: 2
        },
        description: 'Exercice de renforcement des triceps',
        instructions: '1. Placez vos mains sur une chaise ou un banc\n2. Gardez les jambes tendues devant vous\n3. Descendez en pliant les coudes\n4. Remontez en poussant sur vos bras'
    },
    {
        id: '10',
        name: 'Superman',
        durationPerRep: {
            facile: 5,
            moyen: 4,
            difficile: 3
        },
        description: 'Exercice de renforcement du dos',
        instructions: '1. Allongez-vous sur le ventre\n2. Étendez les bras devant vous\n3. Soulevez simultanément les bras et les jambes\n4. Maintenez la position quelques secondes'
    }
];
