<script setup lang="ts">
</script>

<template>
  <div absolute inset-0 z-100 grid h-100dvh h-screen place-content-center bg-neutral-0 px-48>
    <div
      aria-hidden i-nimiq:logos-crypto-map-horizontal dark:i-nimiq:logos-crypto-map-white-horizontal
      class="animate-fade !h-64 !w-[min(510px,90vw)]"
    />
    <div absolute inset-x-0 bottom-0 w-screen p-16 text="12 desktop:center neutral-800">
      This site is protected by reCAPTCHA and the Google <a
        href="https://policies.google.com/privacy" target="_blank" rel="noopener"
        class="text-neutral/80 underline dark:text-white/60"
      >
        Privacy Policy
      </a> and <a
        href="https://policies.google.com/terms" target="_blank" rel="noopener"
        class="text-neutral/80 underline dark:text-white/60"
      >
        Terms of Service
      </a> apply.
    </div>
    <!-- <i18n-t
      absolute inset-x-0 bottom-0 w-screen p-16 text="12 desktop:center neutral-800" tag="div"
      keypath="This site is protected by reCAPTCHA and the Google {privacyPolicy} and {termsOfService} apply."
    >
      <template #privacyPolicy>
        <a
          href="https://policies.google.com/privacy" target="_blank" rel="noopener"
          class="text-space/80 underline dark:text-white/60"
        >
          Privacy Policy
      </a>
      </template>
      <template #termsOfService>
        <a
          href="https://policies.google.com/terms" target="_blank" rel="noopener"
          class="text-space/80 underline dark:text-white/60"
        >
          Terms of Service
      </a>
      </template>
    </i18n-t> -->
  </div>
</template>
