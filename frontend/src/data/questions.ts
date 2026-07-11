export type QuestionType = 'mcq' | 'rearrange' | 'match' | 'listen';

export interface Question {
    id: string;
    type: QuestionType;
    prompt: string;
    locale: string;
    options?: string[];
    correct: string | string[];
    hint: string;
    pairs?: { term: string; match: string }[];
}

export const questionBank: Record<string, Question[]> = {
    Spanish: [
        { id: 'es1', type: 'mcq', prompt: 'Select the word for "Apple"', locale: 'es-ES', options: ['Manzana', 'Perro', 'Gato', 'Agua'], correct: 'Manzana', hint: 'Starts with M, usually red or green.' },
        { id: 'es2', type: 'rearrange', prompt: 'Translate: "The boy drinks water"', locale: 'es-ES', options: ['agua', 'niño', 'El', 'bebe'], correct: ['El', 'niño', 'bebe', 'agua'], hint: 'Subject (El niño) + Verb (bebe) + Object (agua).' },
        { id: 'es3', type: 'match', prompt: 'Match the greetings', locale: 'es-ES', pairs: [{ term: 'Hello', match: 'Hola' }, { term: 'Goodbye', match: 'Adiós' }, { term: 'Please', match: 'Por favor' }, { term: 'Thanks', match: 'Gracias' }], correct: 'match', hint: 'Think about basic politeness.' },
        { id: 'es4', type: 'listen', prompt: 'Type what you hear', locale: 'es-ES', correct: 'Buenos dias', hint: 'Used in the morning.' },
        { id: 'es5', type: 'mcq', prompt: 'Translate: "I eat bread"', locale: 'es-ES', options: ['Yo como pan', 'Tu bebes agua', 'El corre rapido'], correct: 'Yo como pan', hint: 'Yo = I, como = eat.' }
    ],
    French: [
        { id: 'fr1', type: 'mcq', prompt: 'Select the word for "Cat"', locale: 'fr-FR', options: ['Chat', 'Chien', 'Oiseau', 'Pomme'], correct: 'Chat', hint: 'Sounds like "sha".' },
        { id: 'fr2', type: 'rearrange', prompt: 'Translate: "I love you"', locale: 'fr-FR', options: ['t\'', 'Je', 'aime'], correct: ['Je', 't\'', 'aime'], hint: 'French places the object pronoun before the verb.' },
        { id: 'fr3', type: 'match', prompt: 'Match the colors', locale: 'fr-FR', pairs: [{ term: 'Red', match: 'Rouge' }, { term: 'Blue', match: 'Bleu' }, { term: 'Green', match: 'Vert' }, { term: 'Yellow', match: 'Jaune' }], correct: 'match', hint: 'Rouge sounds like a makeup term.' },
        { id: 'fr4', type: 'listen', prompt: 'Type what you hear', locale: 'fr-FR', correct: 'Bonjour', hint: 'Standard daytime greeting.' },
        { id: 'fr5', type: 'mcq', prompt: 'Translate: "Water"', locale: 'fr-FR', options: ['L\'eau', 'Le feu', 'La terre', 'Le vent'], correct: 'L\'eau', hint: 'Starts with L.' }
    ],
    German: [
        { id: 'de1', type: 'mcq', prompt: 'Select the word for "Dog"', locale: 'de-DE', options: ['Hund', 'Katze', 'Maus', 'Vogel'], correct: 'Hund', hint: 'Sounds similar to "hound".' },
        { id: 'de2', type: 'rearrange', prompt: 'Translate: "I drink milk"', locale: 'de-DE', options: ['Milch', 'trinke', 'Ich'], correct: ['Ich', 'trinke', 'Milch'], hint: 'Subject (Ich) + Verb (trinke) + Object (Milch).' },
        { id: 'de3', type: 'match', prompt: 'Match the numbers', locale: 'de-DE', pairs: [{ term: 'One', match: 'Eins' }, { term: 'Two', match: 'Zwei' }, { term: 'Three', match: 'Drei' }, { term: 'Four', match: 'Vier' }], correct: 'match', hint: 'Zwei starts with a Z.' },
        { id: 'de4', type: 'listen', prompt: 'Type what you hear', locale: 'de-DE', correct: 'Guten Morgen', hint: 'Standard morning greeting.' },
        { id: 'de5', type: 'mcq', prompt: 'Translate: "Thank you"', locale: 'de-DE', options: ['Danke', 'Bitte', 'Hallo', 'Tschüss'], correct: 'Danke', hint: 'Starts with D.' }
    ],
    Japanese: [
        { id: 'ja1', type: 'mcq', prompt: 'Select the word for "Water"', locale: 'ja-JP', options: ['Mizu', 'Hi', 'Kaze', 'Tsuchi'], correct: 'Mizu', hint: 'Starts with M.' },
        { id: 'ja2', type: 'rearrange', prompt: 'Translate: "I eat sushi"', locale: 'ja-JP', options: ['tabemasu', 'wa', 'sushi', 'Watashi', 'o'], correct: ['Watashi', 'wa', 'sushi', 'o', 'tabemasu'], hint: 'Subject (Watashi wa) + Object (sushi o) + Verb (tabemasu).' },
        { id: 'ja3', type: 'match', prompt: 'Match the basics', locale: 'ja-JP', pairs: [{ term: 'Yes', match: 'Hai' }, { term: 'No', match: 'Iie' }, { term: 'Thanks', match: 'Arigatou' }, { term: 'Sorry', match: 'Gomen' }], correct: 'match', hint: 'Hai is a very common affirmation.' },
        { id: 'ja4', type: 'listen', prompt: 'Type what you hear (in romaji)', locale: 'ja-JP', correct: 'Konnichiwa', hint: 'Standard daytime greeting.' },
        { id: 'ja5', type: 'mcq', prompt: 'Select the word for "Cat"', locale: 'ja-JP', options: ['Neko', 'Inu', 'Tori', 'Uma'], correct: 'Neko', hint: 'Starts with N.' }
    ],
    Italian: [
        { id: 'it1', type: 'mcq', prompt: 'Select the word for "Bread"', locale: 'it-IT', options: ['Pane', 'Vino', 'Acqua', 'Formaggio'], correct: 'Pane', hint: 'Similar to the French "Pain" or Spanish "Pan".' },
        { id: 'it2', type: 'rearrange', prompt: 'Translate: "The woman eats an apple"', locale: 'it-IT', options: ['mela', 'una', 'mangia', 'donna', 'La'], correct: ['La', 'donna', 'mangia', 'una', 'mela'], hint: 'Subject (La donna) + Verb (mangia) + Object (una mela).' },
        { id: 'it3', type: 'match', prompt: 'Match the greetings', locale: 'it-IT', pairs: [{ term: 'Hello/Goodbye', match: 'Ciao' }, { term: 'Goodbye (Formal)', match: 'Arrivederci' }, { term: 'Thanks', match: 'Grazie' }, { term: 'You are welcome', match: 'Prego' }], correct: 'match', hint: 'Ciao is used for both hello and goodbye.' },
        { id: 'it4', type: 'listen', prompt: 'Type what you hear', locale: 'it-IT', correct: 'Buonasera', hint: 'Used in the evening.' },
        { id: 'it5', type: 'mcq', prompt: 'Translate: "Please"', locale: 'it-IT', options: ['Per favore', 'Grazie', 'Prego', 'Scusa'], correct: 'Per favore', hint: 'Two words starting with P and F.' }
    ]
};