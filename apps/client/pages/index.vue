<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-b from-primary-50 to-zinc-50 dark:from-primary-950/20 dark:to-zinc-950">
      <UContainer>
        <div class="text-center space-y-6">
          <div class="flex items-center justify-center gap-2 mb-4">
            <UIcon name="i-ph-diamond" class="text-primary-500 text-6xl" />
            <UIcon name="i-ph-diamond" class="text-primary-500 text-6xl" />
            <UIcon name="i-ph-diamond" class="text-primary-500 text-6xl" />
          </div>
          <h1 class="text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-wider">
            Something is coming
          </h1>
          <p class="text-xl text-zinc-600 dark:text-zinc-400 tracking-wide">
            Marketplace dla społeczności LARP, Rekonstrukcji i Cosplay
          </p>
          <div class="flex justify-center gap-4 pt-4">
            <UButton size="lg" color="lime" variant="solid" icon="i-ph-arrow-right">
              Wkrótce
            </UButton>
            <UButton size="lg" color="zinc" variant="outline" icon="i-ph-bell">
              Powiadom mnie
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white dark:bg-zinc-950">
      <UContainer>
        <h2 class="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-12">
          Co oferujemy?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <UIcon name="iph-shopping-cart" class="text-primary-500 text-2xl" />
                </div>
                <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Marketplace
                </h3>
              </div>
            </template>
            <p class="text-zinc-600 dark:text-zinc-400">
              Sprzedaż, kupno i zamiana przedmiotów dla społeczności LARP, Rekonstrukcji i Cosplay.
            </p>
          </UCard>

          <!-- Feature 2 -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <UIcon name="i-ph-user-circle" class="text-primary-500 text-2xl" />
                </div>
                <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Profil rzemieślnika
                </h3>
              </div>
            </template>
            <p class="text-zinc-600 dark:text-zinc-400">
              Album zdjęć z pracami, portfolio i prezentacja twórczości.
            </p>
          </UCard>

          <!-- Feature 3 -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <UIcon name="i-ph-chat-circle-dots" class="text-primary-500 text-2xl" />
                </div>
                <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Komunikacja
                </h3>
              </div>
            </template>
            <p class="text-zinc-600 dark:text-zinc-400">
              Wbudowany czat do komunikacji kupca ze sprzedawcą.
            </p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-zinc-50 dark:bg-zinc-900">
      <UContainer>
        <h2 class="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-12">
          Kategorie
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <!-- LARP -->
          <UCard hoverable class="cursor-pointer group">
            <div class="flex flex-col items-center text-center space-y-3">
              <UIcon name="i-ph-sword" class="text-4xl text-zinc-400 group-hover:text-primary-500 transition-colors" />
              <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">LARP</h3>
            </div>
          </UCard>

          <!-- Rekonstrukcje -->
          <UCard hoverable class="cursor-pointer group">
            <div class="flex flex-col items-center text-center space-y-3">
              <UIcon name="i-ph-shield" class="text-4xl text-zinc-400 group-hover:text-primary-500 transition-colors" />
              <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Rekonstrukcje</h3>
            </div>
          </UCard>

          <!-- Cosplay -->
          <UCard hoverable class="cursor-pointer group">
            <div class="flex flex-col items-center text-center space-y-3">
              <UIcon name="i-ph-mask-happy" class="text-4xl text-zinc-400 group-hover:text-primary-500 transition-colors" />
              <h3 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Cosplay</h3>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Status Section -->
    <section class="py-16 bg-white dark:bg-zinc-950">
      <UContainer>
        <UAlert
          color="lime"
          variant="subtle"
          icon="i-ph-info"
          title="Work in Progress"
          description="GearLoot jest obecnie w fazie rozwoju. Wkrótce pojawi się więcej funkcji i szczegóły."
        />
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'GearLoot - Marketplace dla LARP, Rekonstrukcji i Cosplay',
  description: 'Sprzedaż, kupno i zamiana przedmiotów dla społeczności LARP, Rekonstrukcji i Cosplay.'
})
</script>
