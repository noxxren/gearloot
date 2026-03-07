<template>
  <div>
    <section class="py-12">
      <UContainer>
        <h1 class="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
          Profil rzemieślnika
        </h1>

        <!-- Profile Header -->
        <UCard class="mb-8">
          <div class="flex items-start gap-6">
            <div class="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <UIcon name="i-ph-user" class="text-primary-500 text-4xl" />
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Jan Kowalski
              </h2>
              <p class="text-zinc-600 dark:text-zinc-400 mb-4">
                Rzemieślnik specjalizujący się w LARP i Rekonstrukcjach
              </p>
              <div class="flex gap-4">
                <UButton color="lime" variant="solid" icon="iph-envelope">
                  Wyślij wiadomość
                </UButton>
                <UButton color="zinc" variant="outline" icon="iph-heart">
                  Obserwuj
                </UButton>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-zinc-600 dark:text-zinc-400">
                <span class="text-primary-500 font-semibold">24</span> przedmiotów
              </p>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">
                <span class="text-primary-500 font-semibold">156</span> obserwujących
              </p>
            </div>
          </div>
        </UCard>

        <!-- Works Gallery -->
        <h3 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
          Galeria prac
        </h3>
        <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <UCard v-for="i in 8" :key="i" hoverable class="cursor-pointer">
            <div class="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
              <UIcon name="i-ph-image" class="text-4xl text-zinc-400" />
            </div>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-3 text-center">
              Praca {{ i }}
            </p>
          </UCard>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Profil - GearLoot',
  description: 'Profil rzemieślnika i galeria prac.'
})
</script>
