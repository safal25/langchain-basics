/*
Structured output is used langchain to define the output format of the model. there are three methods to tell the model to use structured output.
1. Using tool calls
2. Using json mode
3. Using withStructuredOutput() method (The best way to use structured output)
*/
import { z } from "zod";

export const outputSchema = z.object({
    resultOfCalculations: z.number().describe("The final result of the calculations performed").optional().nullable(),
    weatherInfo: z.string().describe("The weather information to be presented to the user").optional().nullable(),
});

//structured output used in index.js
