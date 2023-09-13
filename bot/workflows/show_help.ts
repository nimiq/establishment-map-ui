import {
  DefineWorkflow,
  Schema,
} from 'https://deno.land/x/deno_slack_sdk@2.2.0/mod.ts'
import { SendContext } from '../functions/send_context.ts'

const ShowHelpWorkflow = DefineWorkflow({
  callback_id: 'show_help_wf',
  title: 'Help',
  description: 'Shows a help message',
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ['interactivity'],
  },
})

const helpContent = `:cryptomap: Crypto Map Bot Help :cryptomap:

Message triggered by <@${ShowHelpWorkflow.inputs.interactivity.interactor.id!}>.

What can I do?
- I will notify in this channel when a user submits a new candidate. You later can decide if you want to add it to the Map or ignore it.
- I will notify in this channel when a user submits a new issue. You later can decide if you want to remove it or ignore it.
- Write \`/add\` in this channel to add an location. A modal will open and you will add the information.
- Write \`/delete\` in this channel to remove an location. A modal will open and you will set the UUID. `

ShowHelpWorkflow.addStep(
  SendContext,
  {
    type: 'info',
    environment: 'Production',
    content: helpContent,
  },
)

export default ShowHelpWorkflow
