import axios from "axios";
import { valuePair } from "../Interfaces/valuePair";
import getDays from "../components/Filters/helpers/DayCalculation";
import DateFormating from "../components/Filters/helpers/DateFormating";
import INTERVAL from "../Enums/Interval";

const ApiBaseUrl = process.env.REACT_APP_ApiBaseUrl;

const getToDosByDate = async (Date: string) => {
  return await axios
    .get(`${ApiBaseUrl}/todos/date/${Date}`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const getToDosByFilter = async (
  priority: string,
  status: string,
  title: string,
  interval: valuePair
) => {
  console.log("Serch function is calling....");
  const titleParam = title ? title : "NoTitle";
  const days = getDays.getDateListByInterval(interval);
  let startDate = "";
  let endtDate = "";
  if (days.length == 0 || days[0] == INTERVAL.EMPTY) return;
  if (days.length == 1) {
    startDate = days[0];
    const dp = days[0].split("-");
    const day = new Date(parseInt(dp[0]), parseInt(dp[1]), parseInt(dp[2]));
    endtDate = DateFormating.addDays(day, 1);
  } else {
    startDate = days[0];
    endtDate = days[days.length - 1];
  }

  return await axios

    .get(
      `${ApiBaseUrl}/todos/filter/${priority}/${status}/${titleParam}/${startDate}/${endtDate}`
    )
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const getToDosByDependency = async (e: any) => {
  return await axios
    .post(`${ApiBaseUrl}/todos/dependency`, e)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const saveTodos = async (body: any) => {
  return await axios
    .post(`${ApiBaseUrl}/todos`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const editTodo = async (e: any) => {
  const body = {
    _id: e._id,
    date: e.date,
    title: e.title,
    status: e.status,
    priority: e.priority,
    dependancy: e.dependancy,
  };
  return await axios
    .put(`${ApiBaseUrl}/todo/${e._id}`, body)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const deleteTodo = async (e: any) => {
  return await axios
    .delete(`${ApiBaseUrl}/todo/${e}`)
    .then((data) => {
      return data.data;
    })
    .catch((error) => console.log(error));
};

const api = {
  getToDosByDate,
  getToDosByFilter,
  saveTodos,
  editTodo,
  deleteTodo,
  getToDosByDependency,
};

export default api;
