export const useMarketplace = () => {
  const products = ref([
    {
      id: 1,
      title: 'Miecz LARP - Drewniany',
      category: 'LARP',
      price: 150,
      condition: 'new' as const,
      image: null
    },
    {
      id: 2,
      title: 'Hełm Rycerza',
      category: 'Rekonstrukcje',
      price: 500,
      condition: 'used' as const,
      image: null
    },
    {
      id: 3,
      title: 'Kostium Elfa',
      category: 'Cosplay',
      price: 800,
      condition: 'new' as const,
      image: null
    }
  ])

  const filters = ref({
    category: null as string | null,
    search: ''
  })

  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchCategory = !filters.value.category || product.category === filters.value.category
      const matchSearch = !filters.value.search ||
        product.title.toLowerCase().includes(filters.value.search.toLowerCase())

      return matchCategory && matchSearch
    })
  })

  const addProduct = (product: any) => {
    products.value.push(product)
  }

  const removeProduct = (id: number) => {
    products.value = products.value.filter(p => p.id !== id)
  }

  return {
    products,
    filters,
    filteredProducts,
    addProduct,
    removeProduct
  }
}
