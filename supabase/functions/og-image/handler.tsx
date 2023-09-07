import React from 'https://esm.sh/react@18.2.0?deno-std=0.140.0'
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.6/mod.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const key = Deno.env.get('SUPABASE_ANON_KEY')

if (!supabaseUrl || !key)
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY')

const fontRegular = fetch(new URL(`${supabaseUrl}/storage/v1/object/public/images/Mulish-Regular.ttf`))
  .then(res => res.arrayBuffer())

const fontSemibold = fetch(new URL(`${supabaseUrl}/storage/v1/object/public/images/Mulish-SemiBold.ttf`))
  .then(res => res.arrayBuffer())

const fontBold = fetch(new URL(`${supabaseUrl}/storage/v1/object/public/images/Mulish-Bold.ttf`))
  .then(res => res.arrayBuffer())

export default async function handler(req: Request) {
  const url = new URL(`${supabaseUrl}/rest/v1/rpc/get_stats`)
  const res = await fetch(url, { headers: { apikey: key! } })
  const stats = await res.json()
  return new ImageResponse(
    <div tw="flex flex-col items-start justify-between bg-white h-full w-full text-6xl p-24" style={{ fontFamily: 'Mulish-Regular' }}>
      <div tw="flex flex-row justify-between items-center w-full">
        <div tw="flex flex-col">
          <h1 tw="text-[#1F2348] text-[80px] font-bold" style={{ fontFamily: 'Mulish-Bold' }}>Crypto Map</h1>
          <span tw="text-[#1F2348]/60 text-[32px]">Find where to spend your Crypto world-wide</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="180" height="153" viewBox="0 0 38 32"><path fill="url(#a)" fill-rule="evenodd" d="M26.378 29.785a.5.5 0 0 0 .016.157l-7.354 2.005a1.5 1.5 0 0 1-.787 0L10.9 29.942a.496.496 0 0 0 .017-.144l-.332-13.299h1.945a.998.998 0 1 0 0-1.996h-1.995L10.172.009l8.126 2.032c.23.057.47.059.7.006L27.867 0l-.692 13.82-2.02-2.02a.998.998 0 1 0-1.412 1.412l2.47 2.469-2.47 2.468a.999.999 0 0 0 1.412 1.412l1.824-1.824-.602 12.048Zm-8.893-15.282a.998.998 0 1 0 0 1.996h2.478a.998.998 0 1 0 0-1.996h-2.478Z" clip-rule="evenodd"/><path fill="url(#b)" d="M9.539 14.632 9.174.035 1.056 2.533A1.496 1.496 0 0 0 .002 4.04l.728 14.2 1.921-.787a.998.998 0 0 1 .757 1.847l-2.34.96a.992.992 0 0 1-.23.063l.507 9.914a1.499 1.499 0 0 0 1.858 1.376l6.73-1.683a.5.5 0 0 1-.014-.108l-.327-13.056-1.503.617a.998.998 0 1 1-.757-1.848l2.207-.904v.001Z"/><path fill="url(#c)" d="m30.093 19.56-2.1-2.099-.619 12.374a.493.493 0 0 1-.014.096l6.73 1.683a1.495 1.495 0 0 0 1.858-1.376l1.345-26.226a1.496 1.496 0 0 0-1.022-1.496L28.864.046l-.683 13.667 1.912-1.912a.998.998 0 0 1 1.412 1.411l-2.469 2.469 2.468 2.468a.998.998 0 0 1-1.41 1.412v-.001Z"/><defs><radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="matrix(-37.2946 0 0 -32 37.295 32)" gradientUnits="userSpaceOnUse"><stop stop-color="#EC991C"/><stop offset="1" stop-color="#E9B213"/></radialGradient><radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="matrix(-37.2946 0 0 -32 37.295 32)" gradientUnits="userSpaceOnUse"><stop stop-color="#EC991C"/><stop offset="1" stop-color="#E9B213"/></radialGradient><radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="matrix(-37.2946 0 0 -32 37.295 32)" gradientUnits="userSpaceOnUse"><stop stop-color="#EC991C"/><stop offset="1" stop-color="#E9B213"/></radialGradient></defs></svg>
      </div>
      <div tw="flex justify-between items-center w-full">
        <div tw="flex">
          <div tw="flex">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"><g clip-path="url(#a)" opacity=".7"><path stroke="#1F2348" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M33.09 25.43H1.91c-.602 0-1.09.512-1.09 1.145v6.458c0 .633.489 1.146 1.09 1.146h31.183c.601 0 1.088-.513 1.088-1.146v-6.458c0-.633-.488-1.146-1.09-1.146Z"/><path fill="#1F2348" d="M8.75 19.96a1.094 1.094 0 1 0 0-2.187 1.094 1.094 0 0 0 0 2.187Z"/><path stroke="#1F2348" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M30.898 25.43V13.45c0-.633-.493-1.146-1.101-1.146H5.203c-.608 0-1.101.513-1.101 1.146v11.98"/><path stroke="#1F2348" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M25.175 16.132h-4.357a1.677 1.677 0 0 0-1.677 1.678v2.114a1.677 1.677 0 0 0 1.677 1.677h4.357a1.622 1.622 0 0 0 1.622-1.622v-.092l.027-2.04v-.093a1.641 1.641 0 0 0-1.649-1.622Z"/><path fill="#1F2348" d="M16.406 12.304a.544.544 0 0 1-.547-.543V.755a.545.545 0 0 1 .72-.516l2.16.72c.258.086.54.072.79-.04l1.85-.822a.547.547 0 0 1 .445 0l1.85.823c.25.11.532.125.791.038l2.16-.72a.545.545 0 0 1 .719.517v11.005a.543.543 0 0 1-.547.543h-10.39Z" opacity=".4"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h35v35H0z"/></clipPath></defs></svg>
            <div tw="flex flex-col ml-5">
              <span tw="text-[32px] text-[#1F2348]/80" style={{ fontFamily: 'Mulish-Semibold' }}>{stats.locations}</span>
              <span tw="text-2xl text-[#1F2348]/60">Locations</span>
            </div>
          </div>
          <div tw="flex ml-16">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32"fill="none"><g stroke="#1F2348" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"><g opacity=".3"><path d="M40.188 11.113c.48-1.443-.32-3.205-1.763-3.686-1.442-.48-3.204.32-3.685 1.763l-1.843 5.127L31.001 20m9.187-8.887-2.885 8.17m2.885-8.17 1.922-5.448c.481-1.442 2.243-2.243 3.686-1.763 1.442.48 2.243 2.243 1.762 3.686m0 0-3.845 10.895m3.845-10.895 1.282-3.686c.48-1.442 2.243-2.243 3.685-1.762 1.602.64 2.404 2.243 1.763 3.685L53.006 9.51m0 0L49.16 20.406M53.006 9.51c.48-1.442 2.243-2.243 3.685-1.762 1.442.48 2.243 2.243 1.763 3.685L53.807 24.41c-.32.802-.32 1.763-.16 2.564l.16.64"></path><path d="M43.233 29.855c1.762-.961 3.364-1.442 5.127-1.762.8-.16 2.403-.32 3.685-.32s2.564-.321 3.685-.802l3.045-1.282c.961-.32 2.083 0 2.724.801.8.962.64 2.404-.481 3.205l-9.934 9.133c-2.53 2.29-5.786 3.491-9.084 3.265"></path></g><g opacity=".7"><path d="m27.64 24.488-2.526-6.605c-.583-1.75-2.72-2.526-4.468-1.943-1.75.583-2.72 2.72-1.943 4.468l5.05 13.017-5.44-13.017-1.747-4.274c-.583-1.748-2.72-2.526-4.47-1.943-1.747.583-2.72 2.72-1.942 4.469l1.749 4.274m15.737 1.554 3.885 9.909m-3.885-9.91c-.777-1.747.194-3.884 1.943-4.467 1.748-.777 3.885.194 4.468 1.943l7.188 18.456c3.109 7.772-.777 16.709-8.742 19.817l-2.137.777c-5.052 1.943-10.88.972-15.154-2.526L2.966 47.802c-1.36-.777-1.554-2.526-.777-3.886.777-.971 2.137-1.554 3.303-1.165l3.885 2.137c1.555.777 3.303-.777 2.72-2.332L5.492 25.46c-.777-1.75.194-3.886 1.942-4.47 1.749-.776 3.886.196 4.469 1.944m0 0 5.05 13.017"></path></g></g></svg>
            <div tw="flex flex-col ml-5">
              <span tw="text-[32px] text-[#1F2348]/80" style={{ fontFamily: 'Mulish-Semibold' }}>{stats.providers}</span>
              <span tw="text-2xl text-[#1F2348]/60">Providers</span>
            </div>
          </div>
          <div tw="flex ml-16">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none"><g clip-path="url(#a)"><path stroke="#1F2348" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M21.5 62.5c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20Z"/><path stroke="#1F2348" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M22.518 42.8a4.415 4.415 0 0 0 0-8.829H17v8.83m5.518 0H17m5.518 0a4.415 4.415 0 0 1 0 8.83H17V42.8M20.82 31v2.971m0 17.66v2.292"/><path fill="#1F2348" d="M26.727 4.813A15.456 15.456 0 0 0 15.5 0C6.94 0 0 6.94 0 15.5c0 4.944 2.314 9.347 5.919 12.185a21.437 21.437 0 0 1 15.103-6.68 23 23 0 0 1 5.705-16.192Z" opacity=".4"/><path fill="#1F2348" fill-rule="evenodd" d="M34.849 25.645a21.396 21.396 0 0 0-10.816-4.497 20 20 0 1 1 18.82 18.82A21.369 21.369 0 0 0 39.668 31h9.332c.35 0 .695-.096.998-.277.304-.18.556-.441.732-.754l5-8.938a2.112 2.112 0 0 0 .003-2.062l-5-8.938A2.032 2.032 0 0 0 50 9.276a1.953 1.953 0 0 0-1-.276H39c-.35 0-.695.096-.999.277a2.032 2.032 0 0 0-.73.754l-5.004 8.938a2.112 2.112 0 0 0 0 2.062l2.58 4.614Zm18.022-5.648L48.394 28h-8.79l-4.475-8 4.478-8h8.79l4.474 7.997Z" clip-rule="evenodd" opacity=".4"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath></defs></svg>
            <div tw="flex flex-col ml-5">
              <span tw="text-[32px] text-[#1F2348]/80" style={{ fontFamily: 'Mulish-Semibold' }}>{stats.cryptos}</span>
              <span tw="text-2xl text-[#1F2348]/60">Cryptocurrencies</span>
            </div>
          </div>
        </div>

        <div tw="flex justify-end items-baseline pt-[30px]">
          <span tw="text-[#1F2348]/60 text-[20px] w-[92px]">Made by</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="115" height="28" fill="none"><g fill="#1F2348" fill-opacity=".6" clip-path="url(#a)"><path d="M30.35 12.611 23.967 1.81A2.57 2.57 0 0 0 21.756.563H8.995c-.91 0-1.753.473-2.208 1.246L.406 12.612a2.446 2.446 0 0 0 0 2.492l6.38 10.803a2.557 2.557 0 0 0 2.209 1.246h12.761c.91 0 1.753-.473 2.208-1.246l6.381-10.803c.46-.772.46-1.72.004-2.492ZM53.023 5.964h2.774v15.788h-2.135l-8.721-11.01v11.01h-2.765V5.964h2.127l8.72 11.01V5.964ZM61.318 21.752V5.964h2.978v15.788h-2.978ZM83.226 5.964h2.34v15.788h-2.553v-9.764l-4.36 9.764H76.74l-4.36-9.764v9.764h-2.553V5.964h2.34l5.53 12.36 5.53-12.36ZM91.096 21.752V5.964h2.977v15.788h-2.977ZM113.965 18.154c-.868 1.683-2.216 2.671-3.411 3.153.14.316.8 1.197 1.297 1.704.498.507 1.021 1.022 1.685 1.545l-2.021 1.558c-.744-.506-1.391-1.113-2.05-1.82a13.232 13.232 0 0 1-1.732-2.355c-.123.008-.468.02-.684.02-1.647 0-3.021-.328-4.208-.98a6.534 6.534 0 0 1-2.718-2.825c-.574-1.118-.944-2.61-.944-4.296 0-1.687.319-3.067.953-4.296a6.635 6.635 0 0 1 2.73-2.826c1.187-.656 2.574-.98 4.187-.98 1.612 0 3.02.328 4.207.98a6.54 6.54 0 0 1 2.718 2.826c.629 1.23.944 2.609.944 4.296 0 1.687-.378 3.182-.953 4.296Zm-10.519.012c.859 1.006 2.058 1.508 3.603 1.508 1.544 0 2.747-.502 3.603-1.508.859-1.01 1.288-2.43 1.288-4.308 0-1.866-.429-3.32-1.288-4.317-.86-.997-2.059-1.5-3.603-1.5-1.545 0-2.749.494-3.603 1.487-.86.993-1.289 2.452-1.289 4.33 0 1.878.429 3.299 1.289 4.308Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 .5h115v27H0z"/></clipPath></defs></svg>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Mulish-Regular',
          data: await fontRegular,
          style: 'normal',
        },
        {
          name: 'Mulish-Semibold',
          data: await fontSemibold,
          style: 'normal',
        },
        {
          name: 'Mulish-Bold',
          data: await fontBold,
          style: 'normal',
        },
      ],
      headers: {
        'content-type': 'image/png',
        'cache-control': `public, max-age=${60 * 60 * 24 * 7}, s-maxage=${60 * 60 * 24 * 7}, no-transform, immutable`, // 1 week
        'cdn-cache-control': `max-age=${60 * 60 * 24 * 7}`,
      },
    },
  )
}
