import "./todolist.css";
import API from "./api";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface APIObj {
  API: string;
  Category: string;
  Description: string;
  Link: string;
}

export const apilist: React.FC<any> = ({ apiDatas }) => {
  if (apiDatas === undefined) {
    return <></>;
  }
  console.log(apiDatas,"list");
  console.log(apiDatas[100]);
  return apiDatas
    .slice(0, 100)
    .map((apiData: APIObj, count: number) => (
      <API apiData={apiData} key={uuidv4()} count={count} />
    ));
};

export default apilist;
