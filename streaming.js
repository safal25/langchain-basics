/*
Streaming API is used when you want to process or show responses as it becomes available, rather than waiting for the entire response to be ready. 
This is particularly useful for handling large responses or real-time chat conversations.
Any component in langchain that implements the Runnable interface provides method from streaming.
To run this example use the command: npm run streaming
*/

import { ChatOpenAI} from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";


const model = new ChatOpenAI({ model: "gpt-4.1",streaming:true });

let messages = [
    new SystemMessage("You are a Professor of computer science and you give detailed explanations to the queries asked by the students."),
    new HumanMessage("Hi what are API's?"),
];

const stream = await model.stream(messages);
let result = [];

console.log("/**** Streaming Response ****/");
for await (const chunk of stream) {
    result.push(chunk);
    process.stdout.write(chunk.content);
}

console.log("\n/**** Complete Response Object ****/");
console.log(result[1]);