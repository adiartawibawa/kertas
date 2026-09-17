<template>
  <div class="min-h-screen bg-[#F7F8F5] font-sans text-ink antialiased">
    <header class="border-b border-slate-200">
      <div class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <NuxtLink to="/" class="text-lg font-semibold">Kertas</NuxtLink>
        <nav class="hidden gap-6 text-sm text-ink-soft sm:flex">
          <NuxtLink to="/office-tools/documents" class="hover:text-ink">Documents</NuxtLink>
          <NuxtLink to="/office-tools/pdf" class="hover:text-ink">PDF</NuxtLink>
          <NuxtLink to="/office-tools/spreadsheet" class="hover:text-ink">Spreadsheet</NuxtLink>
          <NuxtLink to="/office-tools/data" class="hover:text-ink">Data</NuxtLink>
          <NuxtLink to="/office-tools/productivity" class="hover:text-ink">Productivity</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-6">
      <slot />
    </main>

    <footer class="mt-16 border-t border-slate-200 py-8">
      <div class="mx-auto max-w-3xl px-6 text-sm text-ink-soft">
        Kertas — office utilities yang berjalan sepenuhnya di browser Anda.
      </div>
    </footer>
  </div>
</template>
