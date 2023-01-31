import "./todolist.css";
import API from "./api";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const apilist: React.FC<any> = ({ apiDatas }) => {
  console.log(apiDatas);
  if (apiDatas === undefined) {
    return <></>;
  }
  return apiDatas.map((apiData: any) =>
  (
    <API apiData={apiData[0]} key={uuidv4()} />
  ));
};

export default apilist;
