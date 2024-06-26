/* eslint-disable no-console */
import {
  DefineFunction,
  Schema,
  SlackFunction,
} from 'https://deno.land/x/deno_slack_sdk@2.7.0/mod.ts'

export const VerifyCaptcha = DefineFunction({
  callback_id: 'verify_captcha',
  title: 'Verify captcha',
  description: 'Verify the captcha token with Google\'s API.',
  source_file: 'functions/verify_captcha.ts',
  input_parameters: {
    properties: {
      captcha: {
        type: Schema.types.string,
        description: 'The token created in the client-side',
      },
    },
    required: ['captcha'],
  },
  output_parameters: {
    properties: {
      success: {
        type: Schema.types.boolean,
      },
    },
    required: ['success'],
  },
})

export default SlackFunction(
  VerifyCaptcha,
  async ({ inputs, env }) => {
    console.log(`Verifying captcha with token: ${inputs.captcha} and secret: ${env.GOOGLE_CAPTCHA_KEY}`)

    try {
      const url = new URL('https://www.google.com/recaptcha/api/siteverify')

      const response = await fetch(`${url}?secret=${env.GOOGLE_CAPTCHA_KEY}&response=${inputs.captcha}`)

      const result = await response.json()

      console.log(`Captcha verification result: ${JSON.stringify(result)}`)

      if (!result.success) {
        return {
          error: 'Captcha verification failed',
        }
      }

      return {
        outputs: {
          success: true,
        },
      }
    }
    catch (error) {
      console.error(error)
      return {
        error: `Error: ${error}`,
      }
    }
  },
)
