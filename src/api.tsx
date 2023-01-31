import "./todolist.css";
import React from "react";

export const APIData: React.FC<any> = ({ APIData }) => {
  console.log(APIData);
  return <div>{APIData}</div>;
};

export default APIData;
