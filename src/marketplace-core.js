(function exposeMarketplaceCore(root, factory) {
  const core = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = core;
  }

  if (root) {
    root.MarketplaceCore = core;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function marketplaceFactory() {
  const categories = [
    "Alimentos",
    "Artesanato",
    "Aulas",
    "Beleza",
    "Casa",
    "Eventos",
    "Manutencao",
    "Tecnologia"
  ];

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function formatCurrency(value) {
    const amount = Number(value || 0);

    try {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(amount);
    } catch (error) {
      return "R$ " + amount.toFixed(2).replace(".", ",");
    }
  }

  function createId(prefix) {
    return [
      prefix,
      Date.now().toString(36),
      Math.random().toString(36).slice(2, 8)
    ].join("-");
  }

  function averageRating(reviews, listingId) {
    const related = reviews.filter((review) => review.listingId === listingId);
    if (!related.length) return 0;
    const total = related.reduce((sum, review) => sum + Number(review.stars || 0), 0);
    return Number((total / related.length).toFixed(1));
  }

  function countSellerListings(listings, sellerId) {
    return listings.filter((listing) => listing.sellerId === sellerId).length;
  }

  function getSellerById(sellers, sellerId) {
    return sellers.find((seller) => seller.id === sellerId) || null;
  }

  function filterListings(listings, sellers, reviews, filters) {
    const safeFilters = filters || {};
    const query = normalizeText(safeFilters.query);
    const type = safeFilters.type || "";
    const category = safeFilters.category || "";
    const city = safeFilters.city || "";
    const maxPrice = Number(safeFilters.maxPrice || 0);
    const sellerMap = new Map(sellers.map((seller) => [seller.id, seller]));

    const filtered = listings.filter((listing) => {
      const seller = sellerMap.get(listing.sellerId) || {};
      const haystack = normalizeText([
        listing.title,
        listing.description,
        listing.category,
        listing.type,
        seller.name,
        seller.city,
        seller.segment
      ].join(" "));

      const matchesQuery = !query || haystack.includes(query);
      const matchesType = !type || listing.type === type;
      const matchesCategory = !category || listing.category === category;
      const matchesCity = !city || seller.city === city;
      const matchesPrice = !maxPrice || Number(listing.price) <= maxPrice;

      return matchesQuery && matchesType && matchesCategory && matchesCity && matchesPrice;
    });

    const sort = safeFilters.sort || "recent";
    return filtered.sort((left, right) => {
      if (sort === "priceAsc") return Number(left.price) - Number(right.price);
      if (sort === "priceDesc") return Number(right.price) - Number(left.price);
      if (sort === "rating") {
        return averageRating(reviews, right.id) - averageRating(reviews, left.id);
      }
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    });
  }

  function validateSeller(seller) {
    const errors = [];
    if (!String(seller.name || "").trim()) errors.push("Informe o nome do vendedor.");
    if (!String(seller.city || "").trim()) errors.push("Informe a cidade do vendedor.");
    if (!String(seller.segment || "").trim()) errors.push("Informe o segmento do vendedor.");
    if (!String(seller.contact || "").trim()) errors.push("Informe um contato do vendedor.");
    return errors;
  }

  function validateListing(listing) {
    const errors = [];
    if (!listing.sellerId) errors.push("Selecione um vendedor.");
    if (!String(listing.title || "").trim()) errors.push("Informe o titulo do anuncio.");
    if (!String(listing.description || "").trim()) errors.push("Informe a descricao do anuncio.");
    if (!categories.includes(listing.category)) errors.push("Selecione uma categoria valida.");
    if (!["Produto", "Servico"].includes(listing.type)) errors.push("Selecione um tipo valido.");
    if (Number.isNaN(Number(listing.price)) || Number(listing.price) < 0) {
      errors.push("Informe um preco valido.");
    }
    if (!String(listing.image || "").trim()) errors.push("Adicione uma imagem ao anuncio.");
    return errors;
  }

  function summarizeState(state) {
    return {
      sellers: state.sellers.length,
      listings: state.listings.length,
      favorites: state.favorites.length,
      messages: state.messages.length,
      reviews: state.reviews.length
    };
  }

  return {
    averageRating,
    categories,
    countSellerListings,
    createId,
    filterListings,
    formatCurrency,
    getSellerById,
    normalizeText,
    summarizeState,
    validateListing,
    validateSeller
  };
});
