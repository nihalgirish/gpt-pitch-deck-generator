const form = document.getElementById("pitchForm");
const output = document.getElementById("output");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  output.innerHTML = "<p>Generating pitch deck slides, please wait...</p>";

  // Create a prompt combining all user inputs
  const prompt = `
Generate a slide for a pitch deck with the following details:

Startup Name: ${data.startupName}
Problem: ${data.problem}
Solution: ${data.solution}
Product: ${data.product}
Market Size: ${data.market}
Revenue Model: ${data.revenueModel}
Team Info: ${data.teamInfo}
Funding Ask: ${data.funding}

For each section, generate a slide title and 2-3 bullet points.
`;

  try {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const result = await response.json();

    // Show the GPT-generated pitch deck text
    output.innerHTML = `<pre>${result.text}</pre>`;
  } catch (error) {
    output.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    console.error(error);
  }
});
