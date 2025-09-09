import { ChatOpenAI} from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {add, multiply,weatherTool, toolInvoker} from "./tool.js";
import { outputSchema } from "./structuredOutput.js";

const model = new ChatOpenAI({ model: "gpt-4.1" });

const tools = [add, multiply, weatherTool];

const modelWithTools = await model.bindTools(tools);
const modelWithSchema  = await model.withStructuredOutput(outputSchema);

const messages = [
  new SystemMessage("You are a helpful assistant that can use tools, Don't alter the results sent by the tools, just present them to the user."),
  new HumanMessage("Can you multiply the numbers 2,3,4 and 5 and then add 40 to it? Please get me the weather of New York as well."),
];

//For testing only weather tool
const messages2 =[new HumanMessage("Can you get me the weather of San Fransisco?")];

//For testing only math tools
const messages3 =[new HumanMessage("Can you multiply the numbers 6,7,8 and 9 and then add 50 to it?")];

let finalResponse = '';
let count = 0;

while (true){
    count++;
    let result = await modelWithTools.invoke(messages);
    messages.push(result);
    if(result.tool_calls.length>0 && result.response_metadata.finish_reason === 'tool_calls'){
        let toolResults = await toolInvoker(result.tool_calls);
        messages.push(...toolResults);
    }
    else if(result.response_metadata.finish_reason === 'stop' || count>8){
        finalResponse = result;
        break;
    }
}

console.log("/**** Final Response ****/");
console.log("Total number of interactions: ", count);
console.log(finalResponse.content);

console.log("/**** Final Response with Structured Output ****/");
console.log(await modelWithSchema.invoke([finalResponse]))
