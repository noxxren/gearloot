<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-900">
    <!-- Header -->
    <header class="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <UContainer>
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="flex items-center gap-2">
            <UIcon name="i-ph-diamond" class="text-primary-500 text-2xl" />
            <span class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">GearLoot</span>
          </NuxtLink>
          <nav class="flex items-center gap-4">
            <NuxtLink to="/" class="text-zinc-600 dark:text-zinc-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/marketplace" class="text-zinc-600 dark:text-zinc-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              Marketplace
            </NuxtLink>
            <NuxtLink to="/profile" class="text-zinc-600 dark:text-zinc-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
              Profile
            </NuxtLink>
          </nav>
          <div class="flex items-center gap-2">
            <UButton icon="i-ph-moon" color="zinc" variant="ghost" @click="toggleColorMode" />
            <UButton icon="i-ph-user" color="lime" variant="solid">
              Login
            </UButton>
          </div>
        </div>
      </UContainer>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-auto">
      <UContainer>
        <div class="flex items-center justify-between py-6">
          <div class="flex items-center gap-2">
            <UIcon name="i-ph-diamond" class="text-primary-500" />
            <span class="text-zinc-600 dark:text-zinc-400">GearLoot &copy; 2024</span>
          </div>
          <div class="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <NuxtLink to="/about" class="hover:text-primary-500 transition-colors">About</NuxtLink>
            <NuxtLink to="/privacy" class="hover:text-primary-500 transition-colors">Privacy</NuxtLink>
            <NuxtLink to="/terms" class="hover:text-primary-500 transition-colors">Terms</NuxtLink>
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
