(function marketplaceApp() {
  const core = window.MarketplaceCore;
  const storageKey = "marketplace-local-state-v1";

  const refs = {
    sellerCount: document.querySelector("#seller-count"),
    listingCount: document.querySelector("#listing-count"),
    favoriteCount: document.querySelector("#favorite-count"),
    messageCount: document.querySelector("#message-count"),
    resultCount: document.querySelector("#result-count"),
    listingGrid: document.querySelector("#listing-grid"),
    favoriteList: document.querySelector("#favorite-list"),
    messageList: document.querySelector("#message-list"),
    reviewList: document.querySelector("#review-list"),
    favoriteLabel: document.querySelector("#favorite-label"),
    messageLabel: document.querySelector("#message-label"),
    reviewLabel: document.querySelector("#review-label"),
    sellerForm: document.querySelector("#seller-form"),
    listingForm: document.querySelector("#listing-form"),
    listingSeller: document.querySelector("#listing-seller"),
    listingCategory: document.querySelector("#listing-category"),
    imageInput: document.querySelector("#listing-image"),
    imagePreview: document.querySelector("#image-preview"),
    searchInput: document.querySelector("#search-input"),
    typeFilter: document.querySelector("#type-filter"),
    categoryFilter: document.querySelector("#category-filter"),
    cityFilter: document.querySelector("#city-filter"),
    maxPriceFilter: document.querySelector("#max-price-filter"),
    sortFilter: document.querySelector("#sort-filter"),
    clearFilters: document.querySelector("#clear-filters"),
    resetDemo: document.querySelector("#reset-demo"),
    exportData: document.querySelector("#export-data"),
    importData: document.querySelector("#import-data"),
    dialog: document.querySelector("#listing-dialog"),
    dialogContent: document.querySelector("#dialog-content"),
    closeDialog: document.querySelector("#close-dialog"),
    toast: document.querySelector("#toast")
  };

  let state = loadState();
  let currentImageData = "";
  let selectedListingId = "";
  let toastTimer = 0;

  function seedState() {
    return {
      sellers: [
        {
          id: "seller-ana",
          name: "Ana Quitutes",
          city: "Centro",
          segment: "Alimentos",
          contact: "(11) 90000-1122",
          bio: "Doces e salgados feitos sob encomenda para familias, festas pequenas e cafes."
        },
        {
          id: "seller-lucas",
          name: "Lucas Bike Care",
          city: "Vila Nova",
          segment: "Manutencao",
          contact: "(11) 98888-2200",
          bio: "Revisao de bicicletas, regulagem de freios, limpeza e pequenos reparos."
        },
        {
          id: "seller-marina",
          name: "Marina Criativa",
          city: "Jardim Escola",
          segment: "Aulas",
          contact: "marina.aulas@email.com",
          bio: "Aulas particulares de desenho, reforco escolar e organizacao de estudos."
        },
        {
          id: "seller-rafa",
          name: "Rafa Artes",
          city: "Centro",
          segment: "Artesanato",
          contact: "(11) 97777-4310",
          bio: "Pecas decorativas, lembrancinhas e presentes personalizados feitos a mao."
        }
      ],
      listings: [
        {
          id: "listing-bolo",
          sellerId: "seller-ana",
          title: "Bolo caseiro de cenoura",
          type: "Produto",
          category: "Alimentos",
          price: 38,
          description: "Bolo macio com cobertura de chocolate. Entrega combinada para bairros proximos.",
          image: "assets/bolo-caseiro.png",
          createdAt: "2026-05-18T10:30:00.000Z"
        },
        {
          id: "listing-bike",
          sellerId: "seller-lucas",
          title: "Revisao completa de bicicleta",
          type: "Servico",
          category: "Manutencao",
          price: 75,
          description: "Ajuste de cambio, freios, lubrificacao e diagnostico geral para uso diario.",
          image: "assets/manutencao-bike.png",
          createdAt: "2026-05-17T16:10:00.000Z"
        },
        {
          id: "listing-aula",
          sellerId: "seller-marina",
          title: "Aula particular de desenho",
          type: "Servico",
          category: "Aulas",
          price: 45,
          description: "Aulas para iniciantes com materiais simples, treino de observacao e pratica guiada.",
          image: "assets/aula-desenho.png",
          createdAt: "2026-05-16T13:20:00.000Z"
        },
        {
          id: "listing-vaso",
          sellerId: "seller-rafa",
          title: "Vaso artesanal pintado a mao",
          type: "Produto",
          category: "Artesanato",
          price: 52,
          description: "Vaso pequeno para decoracao de mesa, com pintura autoral e acabamento fosco.",
          image: "assets/vaso-artesanal.png",
          createdAt: "2026-05-15T18:40:00.000Z"
        }
      ],
      favorites: ["listing-bolo"],
      messages: [
        {
          id: "message-1",
          listingId: "listing-bike",
          sellerId: "seller-lucas",
          buyerName: "Cliente demo",
          buyerContact: "cliente@email.com",
          text: "Tem horario no sabado de manha?",
          reply: "Tenho sim. Posso reservar as 9h.",
          createdAt: "2026-05-19T08:15:00.000Z"
        }
      ],
      reviews: [
        {
          id: "review-1",
          listingId: "listing-bolo",
          sellerId: "seller-ana",
          buyerName: "Paula",
          stars: 5,
          comment: "Chegou fresquinho e foi muito elogiado.",
          createdAt: "2026-05-19T09:40:00.000Z"
        },
        {
          id: "review-2",
          listingId: "listing-bike",
          sellerId: "seller-lucas",
          buyerName: "Diego",
          stars: 4,
          comment: "Atendimento rapido e preco justo.",
          createdAt: "2026-05-18T20:05:00.000Z"
        }
      ]
    };
  }

  function loadState() {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return seedState();
      const parsed = JSON.parse(saved);
      return {
        sellers: Array.isArray(parsed.sellers) ? parsed.sellers : [],
        listings: Array.isArray(parsed.listings) ? parsed.listings : [],
        favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
        messages: Array.isArray(parsed.messages) ? parsed.messages : [],
        reviews: Array.isArray(parsed.reviews) ? parsed.reviews : []
      };
    } catch (error) {
      return seedState();
    }
  }

  function saveState() {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getSeller(id) {
    return state.sellers.find((seller) => seller.id === id) || null;
  }

  function getListing(id) {
    return state.listings.find((listing) => listing.id === id) || null;
  }

  function getFilters() {
    return {
      query: refs.searchInput.value,
      type: refs.typeFilter.value,
      category: refs.categoryFilter.value,
      city: refs.cityFilter.value,
      maxPrice: refs.maxPriceFilter.value,
      sort: refs.sortFilter.value
    };
  }

  function uniqueCities() {
    return Array.from(new Set(state.sellers.map((seller) => seller.city).filter(Boolean))).sort();
  }

  function renderSelectOptions() {
    const sellerOptions = state.sellers
      .map((seller) => `<option value="${escapeHtml(seller.id)}">${escapeHtml(seller.name)} - ${escapeHtml(seller.city)}</option>`)
      .join("");

    refs.listingSeller.innerHTML = sellerOptions || "<option value=\"\">Cadastre um vendedor</option>";
    refs.listingSeller.disabled = !state.sellers.length;

    const categoryOptions = core.categories
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
      .join("");
    refs.listingCategory.innerHTML = categoryOptions;

    const previousCategory = refs.categoryFilter.value;
    refs.categoryFilter.innerHTML = "<option value=\"\">Todas</option>" + categoryOptions;
    refs.categoryFilter.value = previousCategory;

    const previousCity = refs.cityFilter.value;
    refs.cityFilter.innerHTML = "<option value=\"\">Todas</option>" + uniqueCities()
      .map((city) => `<option value="${escapeHtml(city)}">${escapeHtml(city)}</option>`)
      .join("");
    refs.cityFilter.value = previousCity;
  }

  function renderStats() {
    const summary = core.summarizeState(state);
    refs.sellerCount.textContent = summary.sellers;
    refs.listingCount.textContent = summary.listings;
    refs.favoriteCount.textContent = summary.favorites;
    refs.messageCount.textContent = summary.messages;
    refs.favoriteLabel.textContent = `${summary.favorites} salvos`;
    refs.messageLabel.textContent = `${summary.messages} conversas`;
    refs.reviewLabel.textContent = `${summary.reviews} notas`;
  }

  function renderListings() {
    const filtered = core.filterListings(state.listings, state.sellers, state.reviews, getFilters());
    refs.resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "resultado" : "resultados"}`;

    if (!filtered.length) {
      refs.listingGrid.innerHTML = "<div class=\"empty-state\">Nenhum anuncio encontrado para estes filtros.</div>";
      return;
    }

    refs.listingGrid.innerHTML = filtered.map((listing) => {
      const seller = getSeller(listing.sellerId) || {};
      const rating = core.averageRating(state.reviews, listing.id);
      const isFavorite = state.favorites.includes(listing.id);
      return `
        <article class="listing-card">
          <div class="listing-media">
            <img src="${escapeHtml(listing.image)}" alt="${escapeHtml(listing.title)}">
            <button class="favorite-toggle" type="button" data-action="favorite" data-id="${escapeHtml(listing.id)}" title="Favoritar" aria-label="Favoritar anuncio">${isFavorite ? "♥" : "♡"}</button>
          </div>
          <div class="listing-body">
            <div class="listing-meta">
              <span class="tag">${escapeHtml(listing.type)}</span>
              <span>${escapeHtml(listing.category)}</span>
            </div>
            <h3>${escapeHtml(listing.title)}</h3>
            <p>${escapeHtml(listing.description)}</p>
            <div class="seller-line">
              <span>${escapeHtml(seller.name || "Vendedor")}</span>
              <span>${escapeHtml(seller.city || "")}</span>
            </div>
            <div class="price-line">
              <span class="price">${core.formatCurrency(listing.price)}</span>
              <span class="rating-line">${rating ? "★ " + rating : "Sem notas"}</span>
            </div>
            <button class="ghost-button full-width" type="button" data-action="open" data-id="${escapeHtml(listing.id)}">Ver detalhes</button>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderFavorites() {
    const favorites = state.favorites.map(getListing).filter(Boolean);
    refs.favoriteList.innerHTML = favorites.length ? favorites.map((listing) => `
      <article class="compact-item">
        <strong>${escapeHtml(listing.title)}</strong>
        <span>${core.formatCurrency(listing.price)} · ${escapeHtml(listing.category)}</span>
        <div class="compact-actions">
          <button class="ghost-button" type="button" data-action="open" data-id="${escapeHtml(listing.id)}">Abrir</button>
          <button class="danger-button" type="button" data-action="favorite" data-id="${escapeHtml(listing.id)}">Remover</button>
        </div>
      </article>
    `).join("") : "<div class=\"compact-item\"><span>Nenhum favorito salvo.</span></div>";
  }

  function renderMessages() {
    const sorted = [...state.messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    refs.messageList.innerHTML = sorted.length ? sorted.map((message) => {
      const listing = getListing(message.listingId) || {};
      const seller = getSeller(message.sellerId) || {};
      return `
        <article class="compact-item">
          <strong>${escapeHtml(message.buyerName)} para ${escapeHtml(seller.name || "vendedor")}</strong>
          <span>${escapeHtml(listing.title || "Anuncio removido")} · ${escapeHtml(message.buyerContact)}</span>
          <p>${escapeHtml(message.text)}</p>
          ${message.reply ? `<p><strong>Resposta:</strong> ${escapeHtml(message.reply)}</p>` : ""}
          <form class="reply-form" data-id="${escapeHtml(message.id)}">
            <label class="field-label" for="reply-${escapeHtml(message.id)}">Resposta</label>
            <textarea id="reply-${escapeHtml(message.id)}" class="field" rows="2" maxlength="220">${escapeHtml(message.reply || "")}</textarea>
            <button class="ghost-button full-width" type="submit">Salvar resposta</button>
          </form>
        </article>
      `;
    }).join("") : "<div class=\"compact-item\"><span>Nenhuma mensagem recebida.</span></div>";
  }

  function renderReviews() {
    const sorted = [...state.reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    refs.reviewList.innerHTML = sorted.length ? sorted.map((review) => {
      const listing = getListing(review.listingId) || {};
      return `
        <article class="compact-item">
          <strong>${"★".repeat(Number(review.stars))} ${escapeHtml(review.buyerName)}</strong>
          <span>${escapeHtml(listing.title || "Anuncio removido")}</span>
          <p>${escapeHtml(review.comment)}</p>
        </article>
      `;
    }).join("") : "<div class=\"compact-item\"><span>Nenhuma avaliacao cadastrada.</span></div>";
  }

  function renderAll() {
    renderSelectOptions();
    renderStats();
    renderListings();
    renderFavorites();
    renderMessages();
    renderReviews();
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    refs.toast.textContent = message;
    refs.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => refs.toast.classList.remove("is-visible"), 2600);
  }

  function addSeller(formData) {
    const seller = {
      id: core.createId("seller"),
      name: formData.get("name").trim(),
      city: formData.get("city").trim(),
      segment: formData.get("segment").trim(),
      contact: formData.get("contact").trim(),
      bio: formData.get("bio").trim()
    };

    const errors = core.validateSeller(seller);
    if (errors.length) {
      showToast(errors[0]);
      return;
    }

    state.sellers.push(seller);
    saveState();
    refs.sellerForm.reset();
    renderAll();
    showToast("Vendedor cadastrado.");
  }

  function addListing(formData) {
    const listing = {
      id: core.createId("listing"),
      sellerId: formData.get("sellerId"),
      title: formData.get("title").trim(),
      type: formData.get("type"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      description: formData.get("description").trim(),
      image: currentImageData,
      createdAt: new Date().toISOString()
    };

    const errors = core.validateListing(listing);
    if (errors.length) {
      showToast(errors[0]);
      return;
    }

    state.listings.push(listing);
    saveState();
    refs.listingForm.reset();
    currentImageData = "";
    refs.imagePreview.hidden = true;
    refs.imagePreview.removeAttribute("src");
    renderAll();
    showToast("Anuncio publicado.");
  }

  function toggleFavorite(listingId) {
    if (state.favorites.includes(listingId)) {
      state.favorites = state.favorites.filter((id) => id !== listingId);
      showToast("Favorito removido.");
    } else {
      state.favorites.push(listingId);
      showToast("Anuncio favoritado.");
    }
    saveState();
    renderAll();
  }

  function openListing(listingId) {
    const listing = getListing(listingId);
    if (!listing) return;
    selectedListingId = listingId;
    const seller = getSeller(listing.sellerId) || {};
    const rating = core.averageRating(state.reviews, listing.id);
    const sellerListings = core.countSellerListings(state.listings, listing.sellerId);
    const relatedReviews = state.reviews.filter((review) => review.listingId === listing.id);

    refs.dialogContent.innerHTML = `
      <div class="dialog-layout">
        <section>
          <img src="${escapeHtml(listing.image)}" alt="${escapeHtml(listing.title)}">
          <p class="kicker">${escapeHtml(listing.type)} · ${escapeHtml(listing.category)}</p>
          <h2>${escapeHtml(listing.title)}</h2>
          <div class="price-line">
            <span class="price">${core.formatCurrency(listing.price)}</span>
            <span>${rating ? "★ " + rating : "Sem avaliacoes"}</span>
          </div>
          <p>${escapeHtml(listing.description)}</p>
          <article class="compact-item">
            <strong>${escapeHtml(seller.name || "Vendedor")}</strong>
            <span>${escapeHtml(seller.city || "")} · ${escapeHtml(seller.segment || "")}</span>
            <p>${escapeHtml(seller.bio || "")}</p>
            <span>${escapeHtml(seller.contact || "")} · ${sellerListings} anuncio(s)</span>
          </article>
        </section>
        <aside class="dialog-side">
          <form class="mini-form" id="message-form">
            <h3>Mensagem</h3>
            <label class="field-label" for="buyer-name">Nome</label>
            <input id="buyer-name" class="field" name="buyerName" required maxlength="80">
            <label class="field-label" for="buyer-contact">Contato</label>
            <input id="buyer-contact" class="field" name="buyerContact" required maxlength="100">
            <label class="field-label" for="buyer-message">Texto</label>
            <textarea id="buyer-message" class="field" name="text" rows="3" required maxlength="280"></textarea>
            <button class="primary-button full-width" type="submit">Enviar mensagem</button>
          </form>
          <form class="mini-form" id="review-form">
            <h3>Avaliacao</h3>
            <label class="field-label" for="review-name">Nome</label>
            <input id="review-name" class="field" name="buyerName" required maxlength="80">
            <label class="field-label" for="review-stars">Nota</label>
            <select id="review-stars" class="field" name="stars">
              <option value="5">5 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="2">2 estrelas</option>
              <option value="1">1 estrela</option>
            </select>
            <label class="field-label" for="review-comment">Comentario</label>
            <textarea id="review-comment" class="field" name="comment" rows="3" required maxlength="220"></textarea>
            <button class="primary-button full-width" type="submit">Salvar avaliacao</button>
          </form>
          <article class="compact-item">
            <strong>Avaliacoes recentes</strong>
            ${relatedReviews.length ? relatedReviews.map((review) => `<p>${"★".repeat(Number(review.stars))} ${escapeHtml(review.comment)}</p>`).join("") : "<p>Nenhuma avaliacao para este anuncio.</p>"}
          </article>
        </aside>
      </div>
    `;

    if (!refs.dialog.open) {
      refs.dialog.showModal();
    }
  }

  function sendMessage(form) {
    const data = new FormData(form);
    const listing = getListing(selectedListingId);
    if (!listing) return;

    state.messages.push({
      id: core.createId("message"),
      listingId: listing.id,
      sellerId: listing.sellerId,
      buyerName: data.get("buyerName").trim(),
      buyerContact: data.get("buyerContact").trim(),
      text: data.get("text").trim(),
      reply: "",
      createdAt: new Date().toISOString()
    });

    saveState();
    form.reset();
    renderAll();
    showToast("Mensagem enviada.");
  }

  function addReview(form) {
    const data = new FormData(form);
    const listing = getListing(selectedListingId);
    if (!listing) return;

    state.reviews.push({
      id: core.createId("review"),
      listingId: listing.id,
      sellerId: listing.sellerId,
      buyerName: data.get("buyerName").trim(),
      stars: Number(data.get("stars")),
      comment: data.get("comment").trim(),
      createdAt: new Date().toISOString()
    });

    saveState();
    form.reset();
    renderAll();
    openListing(listing.id);
    showToast("Avaliacao salva.");
  }

  function saveReply(form) {
    const messageId = form.dataset.id;
    const message = state.messages.find((item) => item.id === messageId);
    if (!message) return;
    message.reply = form.querySelector("textarea").value.trim();
    saveState();
    renderAll();
    showToast("Resposta salva.");
  }

  function clearFilters() {
    refs.searchInput.value = "";
    refs.typeFilter.value = "";
    refs.categoryFilter.value = "";
    refs.cityFilter.value = "";
    refs.maxPriceFilter.value = "";
    refs.sortFilter.value = "recent";
    renderListings();
  }

  function resetDemoData() {
    if (!window.confirm("Restaurar os dados de demonstracao?")) return;
    state = seedState();
    currentImageData = "";
    saveState();
    renderAll();
    showToast("Dados de demonstracao restaurados.");
  }

  function exportData() {
    const payload = JSON.stringify(state, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "marketplace-local-dados.json";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function importData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!Array.isArray(parsed.sellers) || !Array.isArray(parsed.listings)) {
          throw new Error("Formato invalido");
        }
        state = {
          sellers: parsed.sellers,
          listings: parsed.listings,
          favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
          messages: Array.isArray(parsed.messages) ? parsed.messages : [],
          reviews: Array.isArray(parsed.reviews) ? parsed.reviews : []
        };
        saveState();
        renderAll();
        showToast("Dados importados.");
      } catch (error) {
        showToast("Arquivo de importacao invalido.");
      }
    };
    reader.readAsText(file);
  }

  function resizeImage(file) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("Arquivo invalido"));
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Nao foi possivel ler a imagem."));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error("Nao foi possivel carregar a imagem."));
        image.onload = () => {
          const maxWidth = 1200;
          const scale = Math.min(1, maxWidth / image.width);
          const width = Math.round(image.width * scale);
          const height = Math.round(image.height * scale);
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.86));
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function bindEvents() {
    document.querySelectorAll("[data-scroll-target]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelector(`#${button.dataset.scrollTarget}`).scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    refs.sellerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addSeller(new FormData(refs.sellerForm));
    });

    refs.listingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addListing(new FormData(refs.listingForm));
    });

    refs.imageInput.addEventListener("change", async () => {
      try {
        const [file] = refs.imageInput.files;
        if (!file) {
          currentImageData = "";
          refs.imagePreview.hidden = true;
          return;
        }
        currentImageData = await resizeImage(file);
        refs.imagePreview.src = currentImageData;
        refs.imagePreview.hidden = false;
      } catch (error) {
        currentImageData = "";
        refs.imageInput.value = "";
        refs.imagePreview.hidden = true;
        showToast(error.message);
      }
    });

    [refs.searchInput, refs.typeFilter, refs.categoryFilter, refs.cityFilter, refs.maxPriceFilter, refs.sortFilter].forEach((control) => {
      control.addEventListener("input", renderListings);
      control.addEventListener("change", renderListings);
    });

    refs.clearFilters.addEventListener("click", clearFilters);
    refs.resetDemo.addEventListener("click", resetDemoData);
    refs.exportData.addEventListener("click", exportData);
    refs.importData.addEventListener("change", () => importData(refs.importData.files[0]));

    document.body.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-action]");
      if (!actionButton) return;
      const listingId = actionButton.dataset.id;
      if (actionButton.dataset.action === "favorite") toggleFavorite(listingId);
      if (actionButton.dataset.action === "open") openListing(listingId);
    });

    document.body.addEventListener("submit", (event) => {
      if (event.target.id === "message-form") {
        event.preventDefault();
        sendMessage(event.target);
      }

      if (event.target.id === "review-form") {
        event.preventDefault();
        addReview(event.target);
      }

      if (event.target.classList.contains("reply-form")) {
        event.preventDefault();
        saveReply(event.target);
      }
    });

    refs.closeDialog.addEventListener("click", () => refs.dialog.close());
    refs.dialog.addEventListener("click", (event) => {
      if (event.target === refs.dialog) refs.dialog.close();
    });
  }

  bindEvents();
  renderAll();
})();
