import { genkit } from 'genkit';
import * as z from 'zod';
import { vertexAI } from '@genkit-ai/vertexai';

const ai = genkit({
    plugins: [vertexAI()],
});

const outputSchema = z.object({
    questions: z.array(
        z.object({
            question: z.string(),
            options: z.array(z.string()).length(4),
            correctAnswer: z.string(),
            hint: z.string(),
        })
    ),
});

export const quizSuggestionFlow = ai.defineFlow(
    {
        name: 'quizSuggestion',
        inputSchema: z.object({
            topic: z.string().min(1, 'Topic is required').describe('The topic for the quiz.'),
            difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the quiz.'),
            numQuestions: z.number().min(1).max(20).describe('The number of questions in the quiz.'),
        }),
        outputSchema: outputSchema,
        streamSchema: z.string(),
    },
    async (input) => {
        const prompt = `Generate a quiz with ${input.numQuestions} questions on the topic of "${input.topic}" with a difficulty level of "${input.difficulty}". 
        Each question should be multiple choice with 4 options. Provide the question, the options, the correct answer (which must be one of the options), and a short hint. 
        Please format the output as a JSON array.`;

        try {
            const { output } = await ai.generate({
                model: vertexAI.model('gemini-2.5-flash'),
                prompt,
                output: {
                    schema: outputSchema,
                },
            });

            return output || { questions: [] };
        } catch (error) {
            console.error('Error generating suggestions with Genkit: ', error);
            return { questions: [] };
        }
    }
)

export function initializeGenkit() {
    console.log('Genkit initialized');
}