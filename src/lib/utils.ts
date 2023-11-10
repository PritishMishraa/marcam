import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function relativeTime(date: Date) {
  return formatDistanceToNow(date, { addSuffix: true });
}
