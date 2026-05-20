const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../src/marketplace-core");

const sellers = [
  { id: "s1", name: "Ana", city: "Centro", segment: "Alimentos" },
  { id: "s2", name: "Bruno", city: "Vila Nova", segment: "Manutencao" }
];

const listings = [
  {
    id: "l1",
    sellerId: "s1",
    title: "Bolo de cenoura",
    type: "Produto",
    category: "Alimentos",
    price: 35,
    description: "Bolo caseiro",
    createdAt: "2026-05-10T12:00:00.000Z"
  },
  {
    id: "l2",
    sellerId: "s2",
    title: "Revisao de bicicleta",
    type: "Servico",
    category: "Manutencao",
    price: 80,
    description: "Freio e cambio",
    createdAt: "2026-05-12T12:00:00.000Z"
  }
];

const reviews = [
  { listingId: "l1", stars: 5 },
  { listingId: "l1", stars: 4 },
  { listingId: "l2", stars: 3 }
];

test("normaliza texto removendo acentos e caixa", () => {
  assert.equal(core.normalizeText("Manutencao Àgil"), "manutencao agil");
});

test("filtra anuncios por busca, tipo, categoria, cidade e preco", () => {
  const result = core.filterListings(listings, sellers, reviews, {
    query: "cenoura",
    type: "Produto",
    category: "Alimentos",
    city: "Centro",
    maxPrice: 40
  });

  assert.equal(result.length, 1);
  assert.equal(result[0].id, "l1");
});

test("ordena por avaliacao media", () => {
  const result = core.filterListings(listings, sellers, reviews, { sort: "rating" });
  assert.equal(result[0].id, "l1");
});

test("calcula media de avaliacoes", () => {
  assert.equal(core.averageRating(reviews, "l1"), 4.5);
  assert.equal(core.averageRating(reviews, "sem-avaliacao"), 0);
});

test("valida cadastro de vendedor", () => {
  assert.deepEqual(core.validateSeller({ name: "", city: "", segment: "", contact: "" }), [
    "Informe o nome do vendedor.",
    "Informe a cidade do vendedor.",
    "Informe o segmento do vendedor.",
    "Informe um contato do vendedor."
  ]);
});

test("valida anuncio com imagem obrigatoria", () => {
  const errors = core.validateListing({
    sellerId: "s1",
    title: "Mesa",
    description: "Mesa usada",
    category: "Casa",
    type: "Produto",
    price: 100,
    image: ""
  });

  assert.ok(errors.includes("Adicione uma imagem ao anuncio."));
});
