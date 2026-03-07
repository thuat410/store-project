import api from './api'

const mockCategories = [
  { id: 1, name: 'Fruits', slug: 'fruits', icon: '🍎', color: 'bg-red-50', textColor: 'text-red-600', count: 45, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200' },
  { id: 2, name: 'Vegetables', slug: 'vegetables', icon: '🥦', color: 'bg-green-50', textColor: 'text-green-600', count: 62, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200' },
  { id: 3, name: 'Dairy & Eggs', slug: 'dairy', icon: '🥛', color: 'bg-yellow-50', textColor: 'text-yellow-600', count: 38, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200' },
  { id: 4, name: 'Bakery', slug: 'bakery', icon: '🍞', color: 'bg-amber-50', textColor: 'text-amber-600', count: 29, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200' },
  { id: 5, name: 'Beverages', slug: 'beverages', icon: '🥤', color: 'bg-blue-50', textColor: 'text-blue-600', count: 54, image: 'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=200' },
  { id: 6, name: 'Meat & Seafood', slug: 'meat', icon: '🥩', color: 'bg-pink-50', textColor: 'text-pink-600', count: 33, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200' },
  { id: 7, name: 'Snacks', slug: 'snacks', icon: '🍿', color: 'bg-purple-50', textColor: 'text-purple-600', count: 47, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200' },
  { id: 8, name: 'Frozen Foods', slug: 'frozen', icon: '🧊', color: 'bg-cyan-50', textColor: 'text-cyan-600', count: 41, image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=200' }
]

/**
 * Get all categories
 */
export async function getCategories() {
  try {
    // When real API is ready, replace with:
    // const response = await api.get('/categories')
    // return response.data

    await new Promise(resolve => setTimeout(resolve, 150))
    return mockCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

/**
 * Get category by slug
 * @param {string} slug - Category slug
 */
export async function getCategoryBySlug(slug) {
  try {
    await new Promise(resolve => setTimeout(resolve, 100))
    const category = mockCategories.find(c => c.slug === slug)
    if (!category) {
      throw new Error('Category not found')
    }
    return category
  } catch (error) {
    console.error('Error fetching category:', error)
    throw error
  }
}
