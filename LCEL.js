/*
LCEL refers to langchain special language and is used to create complex chains and agents using a combination of natural language and specific syntax.
Runnable sequence allows us to chain runnables in a sequence where the output of one runnable is passed as input to the next.
Runnable parallel allows us to run multiple runnables in parallel and collect their results.
Runnables can also be streamed.
In this example we will use prompt templates and model in a chain.
To run this file command: śnpm run lcel
*/

import { ChatOpenAI} from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnableParallel } from "@langchain/core/runnables";

const model = new ChatOpenAI({ model: "gpt-4.1" });

const promptTemplate1 = ChatPromptTemplate.fromMessages([
   ["system", "You are a helpful assistant that translates {input_language} to {output_language}."],
   ["user", "Translate the following text to {input_language}: {text}"],
]);

//using runnable sequence to chain prompt template and model
const chain =  new RunnableSequence({
    first: promptTemplate1,
    last: model
})

//final response from the chain
const response1 = await chain.invoke({
    input_language: "English",
    output_language: "Hindi",
    text: "I love programming and natural language processing"
});

console.log("/**** Runnable Sequence Response ****/");
console.log(response1);

//using pipe
const chainUsingPipe = promptTemplate1.pipe(model);
const response2 = await chainUsingPipe.invoke({
    input_language: "English",
    output_language: "Spanish",
    text: "I love programming and natural language processing"
});

console.log("/**** Runnable Sequence using Pipe Response ****/");
console.log(response2);