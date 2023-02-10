import "./Todolist.css";
import React from "react";
interface APIObj {
  API: string;
  Category: string;
  Description: string;
  Link: string;
}
export const APIData: React.FC<any> = (APIData: any) => {
  const API: APIObj = APIData.apiData;
  return (
    <tbody>
      <tr>
        <th>{APIData.count}</th>
        <th>{API.API}</th>
        <th>{API.Category}</th>
        <th>{API.Description}</th>
        <th>{API.Link}</th>
      </tr>
    </tbody>
  );
};

export default APIData;
