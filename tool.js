import {tool} from "@langchain/core/tools";
import {z} from "zod";

const adder = async ({a,b})=>{
    return a+b;
}

const multiplier = async ({a})=>{
    let result = 1;
    for (let i=0; i<a.length; i++){
        result = result * a[i];
    }
    return result;
}

export const add = tool(
  adder,
  {
    name: "add",
    description: "Add two numbers",
    schema: z.object({
      a: z.number().describe("The first number"),
      b: z.number().describe("The second number"),
    }),
  }
);

export const multiply = tool(
  multiplier,
  {
    name: "multiply",
    description: "Multiply a list of numbers",
    schema: z.object({
      a: z.array(z.number()).describe("The numbers to multiply"),
    }),
  }
)

export const weatherTool = tool(
    async ({location})=>{
        // Dummy implementation, in real scenario you would call a weather API
        return `The weather in ${location} is 25 degrees celcius with clear skies.`;
    },
    {
        name: "get_weather",
        description: "Get the current weather for a given location",
        schema: z.object({
            location: z.string().describe("The location to get the weather for"),
        }),
    }
)

const toolMap = {
  add: add,
  multiply: multiply,
  get_weather: weatherTool,
};

export const toolInvoker = async (tool_calls) => {

    let resultArr = [];
    for(const toolCall of tool_calls){
        const toolFunction = toolMap[toolCall.name];
        const toolMessage = await toolFunction.invoke(toolCall);
        resultArr.push(toolMessage);
    }
    return resultArr;
}