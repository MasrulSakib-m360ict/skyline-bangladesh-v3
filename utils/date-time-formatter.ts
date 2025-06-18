import { format } from "date-fns"

export function timeSlice(timeString: any) {
  if (!timeString) return "No time found"
  const timeOnly = timeString.substring(0, 5)
  return timeOnly
}

export function minutesToHoursAndMinutes(minutes: any) {
  const toNum = Number(minutes || 0)
  const hours = Math.floor(toNum / 60) || 0
  const remainingMinutes = toNum % 60
  return { time: `${hours}h : ${remainingMinutes}m` }
}

export function formatFlightDate(DateTimeString: string | undefined) {
  if (!DateTimeString) return "No time found"
  const formattedDate = DateTimeString.split("T")[0]
  return formattedDate
}

export function convertMinutesToHM(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const hoursPart = hours > 0 ? `${hours}h ` : ""
  const minutesPart = `${remainingMinutes}m`

  return `${hoursPart}${minutesPart}`
}


export const formatGlobalTime = (timeString: any) => {
  if (!timeString) return ""
  // Parse the time string with timezone offset into a Date object
  const date = new Date(`1970-01-01T${timeString}`)
  // Format the date to your desired format (global time format with timezone)
  const formattedTime = format(date, "HH:mm:ssXXX")
  return formattedTime
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
}