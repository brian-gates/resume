import Script from "next/script";

const UMAMI_SRC = "/stats/script.js";
const UMAMI_WEBSITE_ID = "27ee491e-7f7b-4eac-972d-454a781f78ba";

export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      src={UMAMI_SRC}
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
