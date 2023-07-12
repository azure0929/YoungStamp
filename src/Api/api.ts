import axios from "axios";

export const ApiHttp = axios.create({
  baseURL: "http://52.78.195.183:3003/api/expenses"
});

export async function postExpense(data: ExpendType) {
  try {
    const res = await ApiHttp.post("", data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getExpense(userId: string) {
  try {
    const res =
      await ApiHttp.get(`http://52.78.195.183:3003/api/categories?userId=${userId}`);
    return res.data;
  } catch (error) {
    console.error;
  }
}

export async function getSearchExpense(params: SearchParamsType) {
  try {
    const res = await ApiHttp.get("search", { params });
    return res.data;
  } catch (error) {
    console.error;
  }
}

export async function getSummary(params: SummaryType) {
  try {
    const res = await ApiHttp.get("summary", { params });
    return res.data;
  } catch (error) {
    console.error;
  }
}

export async function putChange(userId: string, data: ExpendType) {
  try {
    const res = await ApiHttp.put(userId, data);
    return res.data;
  } catch (error) {
    console.error;
  }
}

export async function deleteExpense(userId: string) {
  try {
    const res = await ApiHttp.delete(userId);
    return res.data;
  } catch (error) {
    console.error;
  }
}

export async function getCalendar(params: CalendarDataType) {
  try {
    const res = await ApiHttp.get("calendar", { params });
    return res.data;
  } catch (error) {
    console.error;
  }
}

declare interface ExpendType {
  amount: number,
  userId: string,
  category: string,
  date: string
}

declare interface SearchParamsType {
  q: string,
  userId: string
}

declare interface SummaryType {
  period: string,
  userId: string
}

declare interface CalendarDataType {
  year: string,
  month: string,
  userId: string
}