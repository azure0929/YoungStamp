
declare interface ExpendType {
  amount: number,
  userId: string,
  category: string,
  date: string,
  description?: string,
}

declare interface SearchParamsType {
  q: string,
  userId: string
}

declare interface SummaryType {
  period: string,
  userId: string,
  category?: string
}

declare interface CalendarDataType {
  year: string,
  month: string,
  userId: string
}

declare interface searchParamsTypeOutput {
  _id:string,
  amount:number,
  userId:string,
  category:string,
  date:string,
  description?:string,
}