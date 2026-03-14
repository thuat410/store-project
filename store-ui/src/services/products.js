import api from './api'
import limeImage from '../assets/front-view-fresh-sour-lemons-dark-background-lime-fruit-citrus-mellow-ripe_140725-91764.jpg'

// Mock data for grocery products
const mockProducts = [
  { id: 1, name: 'Organic Bananas', nameKey: 'productNames.p1', descKey: 'productDescs.p1', category: 'fruits', price: 1.99, originalPrice: 2.49, discount: 20, rating: 4.5, reviews: 128, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300', brand: 'FreshFarm', stock: 50, isOrganic: true, unit: 'bunch', isFlashDeal: true, isFeatured: true, description: 'Sweet and nutritious organic bananas, perfect for snacking or baking. Sourced directly from certified organic farms.' },
  { id: 2, name: 'Red Apples', nameKey: 'productNames.p2', descKey: 'productDescs.p2', category: 'fruits', price: 3.49, originalPrice: 3.49, discount: 0, rating: 4.3, reviews: 95, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300', brand: 'OrchardFresh', stock: 80, unit: 'kg', isFeatured: true, description: 'Crisp and juicy red apples harvested at peak ripeness. Perfect for eating fresh or using in your favorite recipes.' },
  { id: 3, name: 'Baby Spinach', nameKey: 'productNames.p3', descKey: 'productDescs.p3', category: 'vegetables', price: 2.99, originalPrice: 3.99, discount: 25, rating: 4.7, reviews: 210, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300', brand: 'GreenGarden', stock: 30, isOrganic: true, unit: '200g', isFlashDeal: true, isFeatured: true, description: 'Tender baby spinach leaves, washed and ready to use. Rich in iron and vitamins for a healthy lifestyle.' },
  { id: 4, name: 'Whole Milk', nameKey: 'productNames.p4', descKey: 'productDescs.p4', category: 'dairy', price: 3.29, originalPrice: 3.29, discount: 0, rating: 4.4, reviews: 156, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300', brand: 'DairyPure', stock: 100, unit: '1L', isFeatured: true, description: 'Fresh whole milk from grass-fed cows. Rich and creamy, perfect for cereal, coffee, or drinking straight.' },
  { id: 5, name: 'Sourdough Bread', nameKey: 'productNames.p5', descKey: 'productDescs.p5', category: 'bakery', price: 4.99, originalPrice: 5.99, discount: 17, rating: 4.8, reviews: 342, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300', brand: 'ArtisanBake', stock: 20, unit: 'loaf', isFlashDeal: true, isFeatured: true, description: 'Handcrafted sourdough bread with a crispy crust and chewy interior. Made using traditional fermentation for superior flavor.' },
  { id: 6, name: 'Orange Juice', nameKey: 'productNames.p6', descKey: 'productDescs.p6', category: 'beverages', price: 4.49, originalPrice: 5.49, discount: 18, rating: 4.2, reviews: 89, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300', brand: 'SunFresh', stock: 60, unit: '1L', isFeatured: true, description: 'Freshly squeezed 100% pure orange juice with no added sugars or preservatives. Packed with vitamin C.' },
  { id: 7, name: 'Free Range Eggs', nameKey: 'productNames.p7', descKey: 'productDescs.p7', category: 'dairy', price: 5.99, originalPrice: 6.49, discount: 8, rating: 4.9, reviews: 456, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300', brand: 'HappyHen', stock: 45, unit: '12 pack', isFeatured: true, description: 'Premium free range eggs from hens raised on open pastures. Rich in protein and omega-3 fatty acids.' },
  { id: 8, name: 'Broccoli', nameKey: 'productNames.p8', descKey: 'productDescs.p8', category: 'vegetables', price: 1.49, originalPrice: 1.99, discount: 25, rating: 4.1, reviews: 67, image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300', brand: 'GreenGarden', stock: 55, unit: 'head', isFlashDeal: true, description: 'Fresh broccoli crowns, vibrant green and packed with nutrients. Great for steaming, roasting, or adding to stir-fries.' },
  { id: 9, name: 'Greek Yogurt', nameKey: 'productNames.p9', descKey: 'productDescs.p9', category: 'dairy', price: 3.79, originalPrice: 4.29, discount: 12, rating: 4.6, reviews: 198, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300', brand: 'DairyPure', stock: 35, unit: '500g', isFeatured: true, description: 'Thick and creamy Greek yogurt with a tangy flavor. High in protein and probiotics for digestive health.' },
  { id: 10, name: 'Strawberries', nameKey: 'productNames.p10', descKey: 'productDescs.p10', category: 'fruits', price: 4.99, originalPrice: 5.99, discount: 17, rating: 4.8, reviews: 287, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300', brand: 'BerryBest', stock: 25, isOrganic: true, unit: '400g', isFlashDeal: true, description: 'Sweet and juicy organic strawberries at peak ripeness. Perfect for desserts, smoothies, or eating fresh.' },
  { id: 11, name: 'Chicken Breast', nameKey: 'productNames.p11', descKey: 'productDescs.p11', category: 'meat', price: 8.99, originalPrice: 10.99, discount: 18, rating: 4.5, reviews: 176, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d11d36?w=300', brand: 'FarmFresh', stock: 40, unit: '500g', isFlashDeal: true, description: 'Boneless, skinless chicken breasts from free-range chickens. Lean protein source perfect for healthy meals.' },
  { id: 12, name: 'Sparkling Water', nameKey: 'productNames.p12', descKey: 'productDescs.p12', category: 'beverages', price: 1.29, originalPrice: 1.29, discount: 0, rating: 4.3, reviews: 112, image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=300', brand: 'AquaFizz', stock: 200, unit: '500ml', description: 'Refreshing sparkling mineral water with natural carbonation. Crisp and clean taste, zero calories.' },
  { id: 13, name: 'Cheddar Cheese', nameKey: 'productNames.p13', descKey: 'productDescs.p13', category: 'dairy', price: 5.49, originalPrice: 6.49, discount: 15, rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300', brand: 'CheeseHouse', stock: 30, unit: '300g', description: 'Aged cheddar cheese with a sharp, complex flavor. Made from high-quality milk for premium taste.' },
  { id: 14, name: 'Blueberries', nameKey: 'productNames.p14', descKey: 'productDescs.p14', category: 'fruits', price: 3.99, originalPrice: 4.99, discount: 20, rating: 4.9, reviews: 321, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300', brand: 'BerryBest', stock: 40, isOrganic: true, unit: '250g', isFeatured: true, description: 'Plump and sweet organic blueberries, bursting with antioxidants. A superfood for your daily diet.' },
  { id: 15, name: 'Brown Rice', nameKey: 'productNames.p15', descKey: 'productDescs.p15', category: 'grains', price: 3.49, originalPrice: 3.99, discount: 13, rating: 4.4, reviews: 143, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300', brand: 'WholeGrain', stock: 80, unit: '1kg', description: 'Whole grain brown rice with a nutty flavor and chewy texture. High in fiber and essential minerals.' },
  { id: 16, name: 'Cherry Tomatoes', nameKey: 'productNames.p16', descKey: 'productDescs.p16', category: 'vegetables', price: 2.49, originalPrice: 2.99, discount: 17, rating: 4.6, reviews: 189, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300', brand: 'GreenGarden', stock: 60, isOrganic: true, unit: '300g', isFeatured: true, description: 'Sweet and tangy organic cherry tomatoes, perfect for salads, snacking, or roasting.' },
  { id: 17, name: 'Almond Milk', nameKey: 'productNames.p17', descKey: 'productDescs.p17', category: 'beverages', price: 3.99, originalPrice: 4.49, discount: 11, rating: 4.5, reviews: 267, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=300', brand: 'NutriBlend', stock: 50, unit: '1L', description: 'Creamy, unsweetened almond milk. A delicious dairy-free alternative rich in vitamin E and calcium.' },
  { id: 18, name: 'Croissants', nameKey: 'productNames.p18', descKey: 'productDescs.p18', category: 'bakery', price: 3.99, originalPrice: 4.99, discount: 20, rating: 4.7, reviews: 198, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300', brand: 'ArtisanBake', stock: 15, unit: '4 pack', isFeatured: true, description: 'Buttery, flaky croissants baked fresh daily. Made with premium European-style butter for exceptional flavor.' },
  { id: 19, name: 'Avocados', nameKey: 'productNames.p19', descKey: 'productDescs.p19', category: 'fruits', price: 1.79, originalPrice: 2.29, discount: 22, rating: 4.4, reviews: 145, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300', brand: 'TropicFresh', stock: 35, isOrganic: true, unit: 'each', isFlashDeal: true, description: 'Perfectly ripe organic avocados with creamy texture. Rich in healthy fats and essential nutrients.' },
  { id: 20, name: 'Mixed Nuts', nameKey: 'productNames.p20', descKey: 'productDescs.p20', category: 'snacks', price: 7.99, originalPrice: 9.99, discount: 20, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=300', brand: 'NutHouse', stock: 70, unit: '500g', isFeatured: true, description: 'Premium blend of cashews, almonds, walnuts, and pecans. Lightly salted and roasted to perfection.' },
  { id: 21, name: 'Fresh Oranges', nameKey: 'productNames.p21', descKey: 'productDescs.p21', category: 'fruits', price: 1.99, originalPrice: 3.99, discount: 25, rating: 4.6, reviews: 174, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=300', brand: 'TropicFresh', stock: 60, isOrganic: true, unit: 'kg', isFlashDeal: true, isFeatured: true, description: 'Sweet and juicy organic oranges packed with vitamin C. Perfect for fresh-squeezed juice or eating on the go.' },
  { id: 22, name: 'Lime', nameKey: 'productNames.p22', descKey: 'productDescs.p22', category: 'fruits', price: 0.99, originalPrice: 1.49, discount: 34, rating: 4.7, reviews: 89, image: limeImage, brand: 'TropicFresh', stock: 80, isOrganic: true, unit: 'each', isFlashDeal: true, isFeatured: true, description: 'This is the best lime in the world.' }
]

/**
 * Get products with optional filters
 * @param {Object} params - Filter parameters
 * @param {string} params.category - Category filter
 * @param {string} params.search - Search query
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.sort - Sort option
 * @param {number} params.minPrice - Minimum price
 * @param {number} params.maxPrice - Maximum price
 */
export async function getProducts(params = {}) {
  try {
    // When real API is ready, replace with:
    // const response = await api.get('/products', { params })
    // return response.data

    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...mockProducts]

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter(p => p.category === params.category)
    }

    if (params.search) {
      const query = params.search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }

    if (params.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= params.minPrice)
    }

    if (params.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= params.maxPrice)
    }

    if (params.sort) {
      switch (params.sort) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          filtered.sort((a, b) => b.id - a.id)
          break
        case 'discount':
          filtered.sort((a, b) => b.discount - a.discount)
          break
        default:
          break
      }
    }

    const page = params.page || 1
    const limit = params.limit || 12
    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const data = filtered.slice(start, start + limit)

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

/**
 * Get a single product by ID
 * @param {number|string} id - Product ID
 */
export async function getProductById(id) {
  try {
    // When real API is ready, replace with:
    // const response = await api.get(`/products/${id}`)
    // return response.data

    await new Promise(resolve => setTimeout(resolve, 200))

    const product = mockProducts.find(p => p.id === parseInt(id))
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

/**
 * Get featured products
 */
export async function getFeaturedProducts() {
  try {
    // When real API is ready, replace with:
    // const response = await api.get('/products/featured')
    // return response.data

    await new Promise(resolve => setTimeout(resolve, 200))
    return mockProducts.filter(p => p.isFeatured)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    throw error
  }
}

/**
 * Get flash deal products
 */
export async function getFlashDeals() {
  try {
    // When real API is ready, replace with:
    // const response = await api.get('/products/flash-deals')
    // return response.data

    await new Promise(resolve => setTimeout(resolve, 200))
    return mockProducts.filter(p => p.isFlashDeal && p.discount > 0)
  } catch (error) {
    console.error('Error fetching flash deals:', error)
    throw error
  }
}

/**
 * Get related products by category
 * @param {string} category - Category name
 * @param {number} excludeId - Product ID to exclude
 */
export async function getRelatedProducts(category, excludeId) {
  try {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockProducts
      .filter(p => p.category === category && p.id !== excludeId)
      .slice(0, 5)
  } catch (error) {
    console.error('Error fetching related products:', error)
    throw error
  }
}
