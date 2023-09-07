import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import handler from './handler.tsx'

// For development run:
// deno task og:dev
// Go to http://localhost:54321/functions/v1/og-image
serve(handler)
