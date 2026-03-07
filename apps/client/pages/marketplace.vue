<template>
  <div>
    <section class="py-12">
      <UContainer>
        <h1 class="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
          Marketplace
        </h1>

        <!-- Filters -->
        <UCard class="mb-8">
          <div class="flex flex-wrap gap-4 items-center">
            <USelect
              v-model="selectedCategory"
              :options="categories"
              placeholder="Wybierz kategorię"
              class="w-48"
            />
            <UInput
              v-model="searchQuery"
              placeholder="Szukaj..."
              icon="i-ph-magnifying-glass"
              class="flex-1"
            />
            <UButton color="lime" variant="solid">
              Filtruj
            </UButton>
          </div>
        </UCard>

        <!-- Items Grid -->
        <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <UCard v-for="i in 8" :key="i" hoverable class="cursor-pointer">
            <div class="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
              <UIcon name="i-ph-image" class="text-4xl text-zinc-400" />
            </div>
            <h3 class="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Przykładowy przedmiot {{ i }}
            </h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              Kategoria: {{ selectedCategory || 'Wszystkie' }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-primary-600 dark:text-primary-400 font-semibold">
                {{ (i * 50) }} zł
              </span>
              <UButton size="sm" color="lime" variant="soft" icon="iph-heart">
              </UButton>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)

const categories = [
  { label: 'Wszystkie', value: null },
  { label: 'LARP', value: 'larp' },
  { label: 'Rekonstrukcje', value: 'rekonstrukcje' },
  { label: 'Cosplay', value: 'cosplay' }
]

useSeoMeta({
  title: 'Marketplace - GearLoot',
  description: 'Sprzedaż, kupno i zamiana przedmiotów dla społeczności LARP, Rekonstrukcji i Cosplay.'
})
</script>
