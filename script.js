const form = document.getElementById('pitchForm');
const outputDiv = document.getElementById('output');

const apiKey = "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"; // Replace this before going live!

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  outputDiv.innerHTML = "Generating pitch deck...";

  const formData = new FormData(form);
  const inputs = Object.fromEntries(formData.entries());

  // Create a master prompt
  const prompt = `
Generate a startup pitch deck with the following structure:
1. Problem: ${inputs.problem}
2. Solution: ${inputs.solution}
3. Product: ${inputs.product}
4. Market Size: ${inputs.market}
5. Revenue Model: ${inputs.revenue}
6. Team: ${inputs.team}
7. Funding Ask: ${inputs.funding}

Output each section clearly with a title and 2–3 bullet points.
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    const result = data.choices[0].message.content;

    outputDiv.innerHTML = `<pre>${result}</pre>`;
  } catch (error) {
    console.error(error);
    outputDiv.innerHTML = "Something went wrong. Try again.";
  }
});

