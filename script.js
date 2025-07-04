document.getElementById('pitchForm').addEventListener('submit', function(e) {
  e.preventDefault(); // prevent form from submitting normally

  // Collect values from the form fields
  const formData = {
    startupName: this.startupName.value.trim(),
    problem: this.problem.value.trim(),
    solution: this.solution.value.trim(),
    product: this.product.value.trim(),
    market: this.market.value.trim(),
    revenueModel: this.revenueModel.value.trim(),
    teamInfo: this.teamInfo.value.trim(),
    funding: this.funding.value.trim(),
  };

  console.log('Collected form data:', formData);

  // For now, just show the collected data in output div (for testing)
  document.getElementById('output').innerText = JSON.stringify(formData, null, 2);

  // Next step: send this data to OpenAI API (we'll add soon)
});

