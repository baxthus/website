<template>
  <footer class="p-4 flex justify-center">
    <Motion
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, delay: 0.9 }"
    >
      <p class="text-sm opacity-75">
        baxthus • <a
          href="https://github.com/baxthus/bio-link"
          target="blank"
          rel="noopener noreferrer nofollow"
          class="underline hover:text-violet-400 transition-colors"
        >source code</a>
      </p>
    </Motion>
  </footer>
</template>
