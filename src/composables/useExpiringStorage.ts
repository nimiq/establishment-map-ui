import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'

interface ExpiringValue<T> {
  value: T
  expires: string
}

interface UseExpiringStorageOptions {
  /**
   * The amount of time in ms when the storage expires
   */
  expiresIn: number

  /**
   * If true, the storage will be updated when it expires
   * @default true
   */
  autoRefresh?: boolean
}

/**
 * Returns a storage that expires after the given date
 *
 * @param key the key to use
 * @param defaultValue the default value to use
 * @param getValue the function to get the value. It will run when the storage is empty and once the storage expires
 * @returns
 */
export async function useExpiringStorage<T>(key: string, getValue: () => Promise<T>, options: UseExpiringStorageOptions) {
  const { expiresIn, autoRefresh = true } = options

  const hasExpired = (expiryDate: string) => new Date(expiryDate).getTime() <= Date.now()

  const storage = globalThis.localStorage

  const storedValue = storage.getItem(key) ? JSON.parse(storage.getItem(key)!) as ExpiringValue<T> : undefined
  const alreadyExists = storedValue && !hasExpired(storedValue.expires)

  // eslint-disable-next-line no-console
  console.log(`LocalStorage ${key}: ${alreadyExists ? '♻️ Reusing value' : '🛎️ Creating new one'}`)

  const stored = ref(alreadyExists ? storedValue.value : await getValue()) as Ref<T>

  watch(stored, () => {
    const expires = new Date(Date.now() + expiresIn).toISOString()
    storage.setItem(key, JSON.stringify({ value: stored.value, expires }))
  }, { immediate: true })

  async function refreshData(expiresIn: number) {
    if (autoRefresh) {
      setTimeout(async () => {
        // eslint-disable-next-line no-console
        console.log(`LocalStorage ${key}: ♻️ Refreshing value`)
        stored.value = await getValue()
        refreshData(expiresIn)
      }, expiresIn)
    }
  };

  const remainingTime = alreadyExists && storedValue ? expiresIn - (Date.now() - new Date(storedValue.expires).getTime()) : expiresIn
  refreshData(remainingTime)
  return {
    payload: computed(() => stored.value),
  }
}
