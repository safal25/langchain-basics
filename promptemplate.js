/*
Prompt templates are used to create prompts for LLM's, the prompt can be dynamic and can take input variables.
To run this file command: npm run promptemplate
*/

import { ChatOpenAI} from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const systemTemplate = `You are a helpful assistant that translates {input_language} to {output_language}.`;
const humanTemplate = `Translate the following text: {text}`;

const promptTemplate = ChatPromptTemplate.fromMessages([
   ["system", systemTemplate],
   ["user", humanTemplate],
]);

const promptValue = await promptTemplate.invoke({
    input_language: "English",
    output_language: "French",
    text: "I love programming and natural language processing"
});
console.log("/**** Prompt Template ****/");


