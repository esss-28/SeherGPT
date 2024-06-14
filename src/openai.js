import OpenAI from 'openai';

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: 'sk-proj-7FDgKLOIeQB1J80Wd4e4T3BlbkFJjYvDsNGniFuBNGIT7DBo',
});
 
export async function sendMsgToOpenAI(message) {
  try {
    const res = await openai.Completions.create({
      model: 'text-davinci-003',
      prompt: message,
      temperature: 0.7,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return res.choices[0].text;
  } catch (error) {
    console.error("Error sending message to OpenAI:", error);
    throw error;
  }
}
