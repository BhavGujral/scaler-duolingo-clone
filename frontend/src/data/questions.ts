export type QuestionType = 'mcq' | 'rearrange' | 'match' | 'listen';

export interface Question {
    id: string; type: QuestionType; prompt: string; locale: string; options?: string[]; correct: string | string[]; hint: string; pairs?: { term: string; match: string }[];
}

export const questionBank: Record<string, Question[]> = {
    Spanish: [
        { id: 'es1', type: 'mcq', prompt: 'Select the word for "Apple"', locale: 'es-ES', options: ['Manzana', 'Perro', 'Gato', 'Agua'], correct: 'Manzana', hint: 'Starts with M, usually red or green.' },
        { id: 'es2', type: 'rearrange', prompt: 'Translate: "The boy drinks water"', locale: 'es-ES', options: ['agua', 'niño', 'El', 'bebe'], correct: ['El', 'niño', 'bebe', 'agua'], hint: 'Subject (El niño) + Verb (bebe) + Object (agua).' },
        { id: 'es3', type: 'match', prompt: 'Match the greetings', locale: 'es-ES', pairs: [{ term: 'Hello', match: 'Hola' }, { term: 'Goodbye', match: 'Adiós' }, { term: 'Please', match: 'Por favor' }, { term: 'Thanks', match: 'Gracias' }], correct: 'match', hint: 'Think about basic politeness.' },
        { id: 'es4', type: 'listen', prompt: 'Type what you hear', locale: 'es-ES', correct: 'Buenos dias', hint: 'Used in the morning.' },
    ],
    French: [
        { id: 'fr1', type: 'mcq', prompt: 'Select the word for "Cat"', locale: 'fr-FR', options: ['Chat', 'Chien', 'Oiseau', 'Pomme'], correct: 'Chat', hint: 'Sounds like "sha".' },
        { id: 'fr2', type: 'rearrange', prompt: 'Translate: "I love you"', locale: 'fr-FR', options: ['t\'', 'Je', 'aime'], correct: ['Je', 't\'', 'aime'], hint: 'French places the object pronoun before the verb.' },
        { id: 'fr3', type: 'match', prompt: 'Match the colors', locale: 'fr-FR', pairs: [{ term: 'Red', match: 'Rouge' }, { term: 'Blue', match: 'Bleu' }, { term: 'Green', match: 'Vert' }], correct: 'match', hint: 'Rouge sounds like a makeup term.' },
        { id: 'fr4', type: 'listen', prompt: 'Type what you hear', locale: 'fr-FR', correct: 'Bonjour', hint: 'Standard daytime greeting.' },
    ]
};