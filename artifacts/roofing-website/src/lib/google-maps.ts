import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_BROWSER_API_KEY as string | undefined) ?? "";

export const GOOGLE_MAPS_KEY_AVAILABLE = apiKey.length > 0;

let loaderPromise: Promise<void> | null = null;

export function loadGoogleMaps(): Promise<void> {
  if (!apiKey) {
    return Promise.reject(
      new Error("Google Maps API key is not configured. Set VITE_GOOGLE_MAPS_BROWSER_API_KEY."),
    );
  }
  if (!loaderPromise) {
    setOptions({ key: apiKey, v: "weekly" });
    loaderPromise = (async () => {
      await Promise.all([
        importLibrary("maps"),
        importLibrary("places"),
        importLibrary("geometry"),
        importLibrary("marker"),
      ]);
    })();
  }
  return loaderPromise;
}
