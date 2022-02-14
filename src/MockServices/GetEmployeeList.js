import React, { useEffect, useState } from "react";
import axios from "axios";
import SiteAddress from "../SiteAddress";

function GetEmployeeList({ setEmployeeID, paramSetEmployeeList }) {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(async () => {
    const response = await axios.get(SiteAddress + "/getEmployeeList");
    // const response = await axios.get("http://localhost:8080/getEmployeeList");
    setEmployeeList(response.data[0].EmployeeTable);
    if (paramSetEmployeeList != undefined) {
      paramSetEmployeeList(response.data[0].EmployeeTable);
    }
  }, []);

  return (
    <div className="form-group">
      <label>Çalışan *</label>
      <select
        id="cmbEmployees"
        name="cmbEmployees"
        className="form-control"
        onChange={(e) => setEmployeeID(e.target.value)}
      >
        <option value="0" hidden>
          Lütfen Seçiniz...
        </option>
        {employeeList.map((myArrayItem, index) => (
          <option
            key={index}
            name="cmbEmployeeList"
            value={myArrayItem.EmployeeID}
          >
            {myArrayItem.EmployeeName} {myArrayItem.EmployeeSurname}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GetEmployeeList;
