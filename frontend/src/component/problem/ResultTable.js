import React from "react";
import Styles from "../../styles/result.module.css";

export default function ResultTable() {
  return (
    <div>
      <table>
        <thead className={Styles.tableheader}>
          <tr>
            <td>Name</td>
            <td>Attemps</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          <tr className={Styles.tablebody}>
            <td>Daily Tuition</td>
            <td>03</td>
            <td>20</td>
            <td>Passed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
