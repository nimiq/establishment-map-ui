<script setup lang="ts">
const { cryptocityBanner, showSearchBoxHint } = useUIParams()
</script>

<template>
  <header relative z-10 flex="~ items-center gap-16" w-full p-24 desktop:p-16 pl-16 z-100>
    <div i-nimiq:logos-crypto-map text-24 aria-hidden shrink-0 />
    <slot name="search" />
    <CryptoMapModal id="crypto-map-modal" />
  </header>

  <!--
    This is the dynamic block.
    We will show the cryptocity information if the user is exploring the map in an area with a cryptocity
    Otherwise, we will show the "Search for locations" hint. Once the user searchs something, we will hide this hint.

    If the user has already search something and he is not on top of a cryptocity, we won't show anything.

    Note: We need to hardcode the height, otherwise the desktop list will break
  -->
  <div v-if="cryptocityBanner" p-20 text-16 border-t h-88 max-w-320 bg-neutral-200 flex="~ gap-12">
    <div>
      <div i-nimiq:logos-cryptocity text-40 grid="~ place-content-center">
        <PopoverRoot>
          <PopoverTrigger>
            <div i-nimiq:info text-14 text-neutral-700 />
          </PopoverTrigger>
          <PopoverPortal>
            <Transition name="slide-left">
              <PopoverContent as-child :side-offset="isMobile ? 4 : 280" :collision-padding="8"
                :side="isMobile ? 'top' : 'right'">
                <div bg-gradient-neutral p-16 rounded-8 z-300>
                  <div flex="~ gap-8 items-center" text-neutral-100 font-semibold>
                    <div bg-neutral-0 rounded-full size-40 p-4>
                      <div i-nimiq:logos-cryptocity text-32 />
                    </div>
                    {{ cryptocityBanner.name }}
                  </div>
                  <p mt-8 text-neutral-300>
                    {{ $t('The initiative for crypto-friendly cities.') }}
                  </p>
                  <a :href="cryptocityBanner.url" target="_blank" mt-12 pill-sm transition-colors
                    bg-image="$nq-blue-on-dark-gradient hocus:$nq-blue-on-light-gradient-darkened">
                    {{ $t('Learn more') }}
                  </a>
                </div>
                <PopoverArrow as-child>
                  <div w-16 h-8 i-nimiq:tooltip-triangle rotate-180 aria-hidden text-neutral />
                </PopoverArrow>
              </PopoverContent>
            </Transition>
          </PopoverPortal>
        </PopoverRoot>
      </div>
    </div>
    <i18n-t keypath="Spend {CriptocityPoints} at unique locations in this area." tag="p" text-neutral-800>
      <template #CryptocityPoints>
        <b>{{ $t('Cryptocity Points') }}</b>
      </template>
    </i18n-t>
  </div>

  <p v-else-if="showSearchBoxHint" px-20 py-16 text-12 border-t text-neutral-700 h-88 max-w-320>
    {{ $t(`Enter country, city or zip code to discover locations that accept Bitcoin, Nimiq and other
    crypto-currencies.`) }}
  </p>
</template>
