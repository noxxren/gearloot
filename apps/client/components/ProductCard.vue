<template>
  <UCard hoverable class="cursor-pointer group">
    <div class="relative">
      <div class="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <UIcon name="i-ph-image" class="text-4xl text-zinc-400 group-hover:scale-110 transition-transform" />
      </div>
      <UButton
        v-if="!isFavorite"
        size="sm"
        color="zinc"
        variant="ghost"
        icon="i-ph-heart"
        class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        @click.stop="toggleFavorite"
      />
      <UButton
        v-else
        size="sm"
        color="lime"
        variant="solid"
        icon="i-ph-heart-fill"
        class="absolute top-2 right-2"
        @click.stop="toggleFavorite"
      />
    </div>

    <h3 class="font-semibold text-zinc-900 dark:text-zinc-100 mb-1 truncate">
      {{ product.title }}
    </h3>
    <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-2 truncate">
      {{ product.category }}
    </p>

    <div class="flex items-center justify-between">
      <span class="text-primary-600 dark:text-primary-400 font-semibold">
        {{ product.price }} zł
      </span>
      <UBadge :color="product.condition === 'new' ? 'lime' : 'zinc'" variant="subtle">
        {{ product.condition === 'new' ? 'Nowy' : 'Używany' }}
      </UBadge>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface Product {
  title: string
  category: string
  price: number
  condition: 'new' | 'used'
}

interface Props {
  product: Product
}

const props = defineProps<Props>()

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>
