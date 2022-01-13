import { APODItem } from "../types/global";

const API_KEY = process.env.REACT_APP_API_KEY || "3cUAbJsBjlng09J2VJ5YrlF3NB14h5cxYbjmHNRF";
const BASE_API_URL = "https://api.nasa.gov/planetary/apod";

function buildSearchQuery(date?: string) {
  const url = new URL(BASE_API_URL);

  url.searchParams.set("api_key", API_KEY);

  if (date) {
    url.searchParams.set("start_date", date);
  }
  else{
    let last_5_days = new Date();
    last_5_days.setDate(last_5_days.getDate() - 5);
    url.searchParams.set("start_date", last_5_days.toISOString().split('T')[0]);
  }

  return url.toString();
}

export async function searchAPOD(date?: string) {
  try {
    const res = await fetch(buildSearchQuery(date));

    if (res.ok) {
      const result = await res.json();
      return result as APODItem[];
    } else {
      throw new Error(`Error - Status: ${res.status}: ${res.statusText}`);
    }
  } catch (error) {
    console.error(error);

    throw new Error(
     'Something went wrong while fetching the APOD data. Please try again later.'
    );
  }
}
