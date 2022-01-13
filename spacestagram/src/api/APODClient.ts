import { APODItem } from "../types/global";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY || "";
const BASE_API_URL = "https://api.nasa.gov/planetary/apod";
const numberOfDays = 5;
let startDate = dateFromXDaysAgo(numberOfDays);
let endDate = dateFromXDaysAgo(0);

function dateFromXDaysAgo(days: number, date?: Date): string {
  let last_x_days = new Date();
  if (date) {
    last_x_days = date;
  }
  last_x_days.setDate(last_x_days.getDate() - days);
  return last_x_days.toISOString().split("T")[0];
}

function buildSearchQuery(): string {
  const url = new URL(BASE_API_URL);

  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("thumbs", true.toString());

  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);

  startDate = dateFromXDaysAgo(numberOfDays + 1, new Date(startDate));
  endDate = dateFromXDaysAgo(numberOfDays + 1, new Date(endDate));

  return url.toString();
}

export async function searchAPOD(): Promise<APODItem[]> {
  try {
    const url = buildSearchQuery();
    const res = await axios.get(url);
    return res.data.reverse() as APODItem[];
  } catch (error) {
    throw new Error(
      "Something went wrong while fetching the APOD data. Please try again later."
    );
  }
}
