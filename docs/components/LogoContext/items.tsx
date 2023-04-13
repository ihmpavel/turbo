import {
  VercelLogo,
  TurborepoLogo,
  TurbopackLogo,
  IconType,
  NextJSLogo,
  DesignSystemLogo,
} from "./icons";
import type { ContextItem, ContextList } from "./types";
import copy from "copy-to-clipboard";

export const PLATFORM_MENU_ITEMS = ({
  theme,
}: ContextList): Array<ContextItem> => [
  {
    name: "copy-logo",
    "aria-label": "Copy Logo as SVG to Clipboard",
    children: "Copy Logo as SVG",
    prefix: <VercelLogo className="mr-3 h-4 w-4" />,
    type: "copy",
    onClick: () => {
      copy(
        `<svg
        width="76"
        height="65"
        viewBox="0 0 76 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="${
          theme === "dark" ? "#ffffff" : "#000000"
        }" />
      </svg>`
      );
    },
  },
  {
    name: "copy-wordmark",
    "aria-label": "Copy Wordmark as SVG to Clipboard",
    children: "Copy Wordmark as SVG",
    prefix: <IconType className="mr-3 h-4 w-4" />,
    type: "copy",
    onClick: () => {
      copy(
        // NOTE: We include `xmlns` as this is required when the SVG isn't inlined.
        `<svg xmlns="http://www.w3.org/2000/svg" fill="${
          theme === "dark" ? "#ffffff" : "#000000"
        }" viewBox="0 0 284 65"><path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" /><!-- With love, the ▲ team --></svg>`
      );
    },
  },
  {
    name: "brand-guidelines",
    "aria-label": "Open Brand Guidelines in New Tab",
    children: "Brand Guidelines",
    prefix: <DesignSystemLogo className="mr-3 h-4 w-4" />,
    type: "external",
    href: "https://vercel.com/design/brands",
  },
];

export const PRODUCT_MENU_ITEMS = ({
  site,
}: ContextList): Array<ContextItem> => [
  {
    name: "vercel",
    "aria-label": "Open Vercel Home in New Tab",
    children: "Next.js",
    prefix: <VercelLogo className="mr-3 h-4 w-4" />,
    type: "external",
    href: "https://vercel.com",
  },
  {
    name: "next-js",
    "aria-label": "Open Next.js Home in New Tab",
    children: "Next.js",
    prefix: <NextJSLogo className="mr-3 h-4 w-4" />,
    type: "external",
    href: "https://nextjs.org",
  },
  {
    name: "turborepo",
    "aria-label": "Open Turborepo Home in New Tab",
    disabled: site === "repo",
    children: "Turborepo",
    prefix: <TurborepoLogo className="mr-3 h-4 w-4" />,
    type: "internal",
    href: "/repo",
  },
  {
    name: "turbopack",
    "aria-label": "Open Turbopack Home in New Tab",
    disabled: site === "pack",
    children: "Turbopack",
    prefix: <TurbopackLogo className="mr-3 h-4 w-4" />,
    type: "internal",
    href: "/pack",
  },
];
