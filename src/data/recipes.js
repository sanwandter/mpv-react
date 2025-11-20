// Catálogo de recetas disponibles en el supermercado
export const RECIPES = [
  {
    id: 'r1',
    name: 'Ensalada César con Pollo',
    category: 'lunch',
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    servings: 2,
    prepTime: '20 min',
    difficulty: 'Fácil',
    ingredients: [
      { id: 'i1', name: 'Lechuga romana', amount: 1, unit: 'unidad', category: 'verduras', price: 1200 },
      { id: 'i2', name: 'Pechuga de pollo', amount: 300, unit: 'g', category: 'carnes', price: 2400 },
      { id: 'i3', name: 'Pan para crutones', amount: 100, unit: 'g', category: 'panaderia', price: 500 },
      { id: 'i4', name: 'Queso parmesano', amount: 50, unit: 'g', category: 'lacteos', price: 1800 },
      { id: 'i5', name: 'Salsa césar', amount: 1, unit: 'frasco', category: 'despensa', price: 2500 }
    ]
  },
  {
    id: 'r2',
    name: 'Pasta Primavera',
    category: 'dinner',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    servings: 3,
    prepTime: '25 min',
    difficulty: 'Fácil',
    ingredients: [
      { id: 'i6', name: 'Pasta penne', amount: 400, unit: 'g', category: 'despensa', price: 1500 },
      { id: 'i7', name: 'Brócoli', amount: 200, unit: 'g', category: 'verduras', price: 1000 },
      { id: 'i8', name: 'Zanahorias', amount: 2, unit: 'unidades', category: 'verduras', price: 400 },
      { id: 'i9', name: 'Pimientos', amount: 2, unit: 'unidades', category: 'verduras', price: 1200 },
      { id: 'i10', name: 'Aceite de oliva', amount: 3, unit: 'cdas', category: 'despensa', price: 400 },
      { id: 'i11', name: 'Ajo', amount: 3, unit: 'dientes', category: 'verduras', price: 200 }
    ]
  },
  {
    id: 'r3',
    name: 'Tostadas con Aguacate',
    category: 'breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
    servings: 2,
    prepTime: '10 min',
    difficulty: 'Muy Fácil',
    ingredients: [
      { id: 'i12', name: 'Pan integral', amount: 4, unit: 'rebanadas', category: 'panaderia', price: 800 },
      { id: 'i13', name: 'Aguacate', amount: 2, unit: 'unidades', category: 'verduras', price: 3000 },
      { id: 'i14', name: 'Tomates cherry', amount: 8, unit: 'unidades', category: 'verduras', price: 1200 },
      { id: 'i15', name: 'Limón', amount: 1, unit: 'unidad', category: 'frutas', price: 300 },
      { id: 'i16', name: 'Huevos', amount: 2, unit: 'unidades', category: 'lacteos', price: 500 }
    ]
  },
  {
    id: 'r4',
    name: 'Salmón al Horno con Vegetales',
    category: 'dinner',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    servings: 2,
    prepTime: '35 min',
    difficulty: 'Media',
    ingredients: [
      { id: 'i17', name: 'Filete de salmón', amount: 400, unit: 'g', category: 'pescados', price: 6500 },
      { id: 'i18', name: 'Espárragos', amount: 200, unit: 'g', category: 'verduras', price: 2200 },
      { id: 'i19', name: 'Papas', amount: 4, unit: 'unidades', category: 'verduras', price: 800 },
      { id: 'i20', name: 'Limón', amount: 1, unit: 'unidad', category: 'frutas', price: 300 },
      { id: 'i21', name: 'Aceite de oliva', amount: 2, unit: 'cdas', category: 'despensa', price: 300 }
    ]
  },
  {
    id: 'r5',
    name: 'Bowl de Yogurt con Frutas',
    category: 'breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    servings: 2,
    prepTime: '5 min',
    difficulty: 'Muy Fácil',
    ingredients: [
      { id: 'i22', name: 'Yogurt natural', amount: 400, unit: 'g', category: 'lacteos', price: 1500 },
      { id: 'i23', name: 'Granola', amount: 100, unit: 'g', category: 'cereales', price: 1200 },
      { id: 'i24', name: 'Arándanos', amount: 150, unit: 'g', category: 'frutas', price: 2500 },
      { id: 'i25', name: 'Plátano', amount: 2, unit: 'unidades', category: 'frutas', price: 600 },
      { id: 'i26', name: 'Miel', amount: 2, unit: 'cdas', category: 'despensa', price: 800 }
    ]
  },
  {
    id: 'r6',
    name: 'Tacos de Carne',
    category: 'lunch',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    servings: 4,
    prepTime: '30 min',
    difficulty: 'Fácil',
    ingredients: [
      { id: 'i27', name: 'Carne molida', amount: 500, unit: 'g', category: 'carnes', price: 4000 },
      { id: 'i28', name: 'Tortillas', amount: 8, unit: 'unidades', category: 'panaderia', price: 1800 },
      { id: 'i29', name: 'Tomate', amount: 3, unit: 'unidades', category: 'verduras', price: 900 },
      { id: 'i30', name: 'Cebolla', amount: 1, unit: 'unidad', category: 'verduras', price: 400 },
      { id: 'i31', name: 'Lechuga', amount: 1, unit: 'unidad', category: 'verduras', price: 800 },
      { id: 'i32', name: 'Queso rallado', amount: 200, unit: 'g', category: 'lacteos', price: 2200 }
    ]
  },
  {
    id: 'r7',
    name: 'Sopa de Lentejas',
    category: 'lunch',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    servings: 4,
    prepTime: '45 min',
    difficulty: 'Fácil',
    ingredients: [
      { id: 'i33', name: 'Lentejas', amount: 300, unit: 'g', category: 'legumbres', price: 1200 },
      { id: 'i34', name: 'Zanahorias', amount: 2, unit: 'unidades', category: 'verduras', price: 400 },
      { id: 'i35', name: 'Apio', amount: 2, unit: 'tallos', category: 'verduras', price: 600 },
      { id: 'i36', name: 'Cebolla', amount: 1, unit: 'unidad', category: 'verduras', price: 400 },
      { id: 'i37', name: 'Caldo de verduras', amount: 1, unit: 'litro', category: 'despensa', price: 1300 }
    ]
  },
  {
    id: 'r8',
    name: 'Pizza Casera Margarita',
    category: 'dinner',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    servings: 3,
    prepTime: '40 min',
    difficulty: 'Media',
    ingredients: [
      { id: 'i38', name: 'Masa de pizza', amount: 1, unit: 'unidad', category: 'panaderia', price: 1800 },
      { id: 'i39', name: 'Salsa de tomate', amount: 200, unit: 'g', category: 'despensa', price: 900 },
      { id: 'i40', name: 'Queso mozzarella', amount: 250, unit: 'g', category: 'lacteos', price: 2800 },
      { id: 'i41', name: 'Tomate', amount: 2, unit: 'unidades', category: 'verduras', price: 600 },
      { id: 'i42', name: 'Albahaca fresca', amount: 1, unit: 'manojo', category: 'verduras', price: 1200 }
    ]
  }
]

export const MEAL_TYPES = {
  breakfast: { label: 'Desayuno', emoji: '🌅' },
  lunch: { label: 'Almuerzo', emoji: '☀️' },
  dinner: { label: 'Cena', emoji: '🌙' }
}

export const INGREDIENT_CATEGORIES = {
  verduras: { label: 'Verduras y Hortalizas', emoji: '🥕' },
  frutas: { label: 'Frutas', emoji: '🍎' },
  carnes: { label: 'Carnes', emoji: '🥩' },
  pescados: { label: 'Pescados y Mariscos', emoji: '🐟' },
  lacteos: { label: 'Lácteos y Huevos', emoji: '🥛' },
  panaderia: { label: 'Panadería', emoji: '🍞' },
  cereales: { label: 'Cereales', emoji: '🌾' },
  legumbres: { label: 'Legumbres', emoji: '🫘' },
  despensa: { label: 'Despensa', emoji: '🥫' },
  otros: { label: 'Otros', emoji: '📦' }
}
