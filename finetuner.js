const fs = require('fs');
const OpenAI = require('openai');

async function generateAudio() {
  const openai = new OpenAI({
    apiKey: 'AIzaSyBLQYevnF0IGkhFD_qOxpyTdfc8eVnmHjs', // Replace with your actual API key
  });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-audio-preview',
      messages: [
        {
          role: 'user',
          content: 'Is a golden retriever a good family dog?',
        },
      ],
      modalities: ["text", "audio"],
      audio: { voice: "alloy", format: "wav" },
      store: true,
    });

    console.log(response.choices[0]);

    const audioDataBase64 = response.choices[0].message.audio.data;
    const audioData = Buffer.from(audioDataBase64, 'base64');

    fs.writeFileSync('dog.wav', audioData);

    console.log('dog.wav file has been successfully created.');
  } catch (error) {
    console.error('Error generating audio:', error);
  }
}

generateAudio();