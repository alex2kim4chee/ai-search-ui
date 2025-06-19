(function () {
  // Стили
  const style = document.createElement("style");
  style.textContent = `
    #ai-search-widget {
      font-family: Arial, sans-serif;
      max-width: 100%;
      margin: 30px auto;
      padding: 20px;
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
    /* Сетка для результатов */
    #ai-search-results {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-gap: 20px;
      margin-top: 20px;
    }
    /* Карточка товара */
    #ai-search-widget .result {
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
    }
    #ai-search-widget img {
      width: 100%;
      height: auto;
      border-radius: 4px;
      object-fit: cover;
      margin-bottom: 10px;
    }
    #ai-search-widget h4 {
      font-size: 18px;
      margin: 0 0 5px;
    }
    #ai-search-widget p {
      font-size: 14px;
      flex: 1;
      margin: 0 0 10px;
    }
    #ai-search-widget .price {
      font-weight: bold;
      text-align: right;
      font-size: 16px;
      color: #333;
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

      const html = data.map(item => `
        <div class="result">
          <img src="${item.image}" alt="${item.name}" />
          <h4><a href="${item.url}" target="_blank">${item.name}</a></h4>
          <p>${item.description}</p>
          <div class="price">$${item.price}</div>
        </div>
      `).join('');

      resultsDiv.innerHTML = html;
    } catch (e) {
      resultsDiv.innerHTML = "❌ Error loading results.";
    }
  };
})();
