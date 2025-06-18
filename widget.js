(function () {
  // Стили
  const style = document.createElement("style");
  style.textContent = `
    #ai-search-widget {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 30px auto;
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    #ai-search-widget input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
    }
    #ai-search-widget button {
      margin-top: 10px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    #ai-search-widget .result {
      border: 1px solid #ddd;
      margin-top: 20px;
      padding: 10px;
      border-radius: 6px;
    }
    #ai-search-widget img {
      max-width: 100px;
      display: block;
      margin-top: 10px;
    }
  `;
  document.head.appendChild(style);

  // HTML
  const container = document.getElementById("ai-search-widget");
  container.innerHTML = `
    <h3>Find your perfect tee</h3>
    <input type="text" id="ai-search-query" placeholder="Try: retro tee or serotonin shirt" />
    <button id="ai-search-button">Search</button>
    <div id="ai-search-results"></div>
  `;

  // JS Logic
  document.getElementById("ai-search-button").onclick = async () => {
    const q = document.getElementById("ai-search-query").value.trim();
    const resultsDiv = document.getElementById("ai-search-results");
    if (!q) return;

    resultsDiv.innerHTML = "🔍 Searching...";
    try {
      const res = await fetch(`https://ai-search-worker.pecanstudio.workers.dev/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      if (!data.length) {
        resultsDiv.innerHTML = "😕 Nothing found.";
        return;
      }

      resultsDiv.innerHTML = data.map(item => `
        <div class="result">
          <h4><a href="${item.url}" target="_blank">${item.name}</a></h4>
          <p>${item.description}</p>
          <img src="${item.image}" alt="${item.name}" />
        </div>
      `).join('');
    } catch (e) {
      resultsDiv.innerHTML = "❌ Error loading results.";
    }
  };
})();
