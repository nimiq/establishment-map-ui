import { defineStore } from 'pinia'
import { authenticateAnonUser } from 'database'
import { useExpiringStorage } from '@/composables/useExpiringStorage'
import { DATABASE_ARGS } from '@/shared'

const CAPTCHA_TOKEN_VALIDITY = 10 * 60 * 1000 // 10 minutes for the captcha token
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY

export const useCaptcha = defineStore('captcha', async () => {
  async function getCaptchaToken() {
    while (!globalThis.grecaptcha)
      await new Promise(resolve => setTimeout(resolve, 100))
    return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'idle' })
  }

  async function getCaptchaUuid() {
    return await authenticateAnonUser(DATABASE_ARGS, await getCaptchaToken())
  }

  const { payload: captchaToken } = await useExpiringStorage('captcha_token_uuid', getCaptchaUuid, { expiresIn: CAPTCHA_TOKEN_VALIDITY })

  // const loadRecaptcha = () => {
  //   if (loaded)
  //     return
  //   const script = document.createElement('script')

  //   script.src = `https://www.google.com/recaptcha/api.js?render=${recapthaKey}`
  //   script.id = 'recaptcha-script'
  //   script.async = true

  //   document.body.append(script)
  //   script.onload = () => loaded = true
  // }

  // const removeRecaptcha = () => {
  //   const script = document.getElementById('recaptcha-script')
  //   if (script)
  //     script.remove()

  //   const recaptchaElems = document.getElementsByClassName('grecaptcha-badge')
  //   if (recaptchaElems.length)
  //     recaptchaElems[0].remove()
  // }

  return {
    getCaptchaToken,
    captchaToken,
  }
})
