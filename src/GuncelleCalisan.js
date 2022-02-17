import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import GetEmployeeList from "./MockServices/GetEmployeeList";
import siteAddress from "./SiteAddress";

function GuncelleCalisan({ paramSetOpen }) {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [searchParam, setSearchParam] = useSearchParams();
  const [employeeList, setEmployeeList] = useState([]);
  GetEmployeeList({ paramSetEmployeeList: setEmployeeList });
  useEffect(() => {
    document.getElementById("txtFirstName").value = employeeList
      .filter((repofilter) => repofilter.EmployeeID == searchParam.get("id"))
      .map((repo) => repo.EmployeeName);
    document.getElementById("txtLastName").value = employeeList
      .filter((repofilter) => repofilter.EmployeeID == searchParam.get("id"))
      .map((repo) => repo.EmployeeSurname);
    setName(document.getElementById("txtFirstName").value);
    setSurname(document.getElementById("txtLastName").value);
  }, [employeeList]);

  const Guncelle = async () => {
    const requestBody = {
      EmployeeID: searchParam.get("id"),
      EmployeeName: name,
      EmployeeSurname: surname,
    };

    const response = await axios.put(siteAddress + "/putEmployee", requestBody);
    // const response = await axios.put(
    //   "http://localhost:8080/putEmployee",
    //   requestBody
    // );
    if (response.config.status == 200 || 201) {
      window.alert("Çalışan Bilgileri Güncellenmiştir.");
      console.log(requestBody);
    } else {
      window.alert("Hata Oluştu!");
    }
  };

  return (
    <div className="portlet light">
      <div className="portlet-title">
        <div className="caption">
          <i className="fa fa-cogs font-green-sharp" />
          <span className="caption-subject font-green-sharp bold uppercase">
            CALIŞAN BİLGİLERİ GÜNCELLE
          </span>
        </div>
      </div>
      <div className="portlet-body form">
        <form role="form">
          <div className="form-body">
            <div className="form-group">
              <label>Ad *</label>
              <input
                type="text"
                id="txtFirstName"
                name="txtFirstName"
                className="form-control"
                autoComplete="off"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Soyad *</label>
              <input
                type="text"
                id="txtLastName"
                name="txtLastName"
                className="form-control"
                autoComplete="off"
                required
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions right">
            <button
              type="button"
              className="btn default"
              id="btnCancel"
              name="btnCancel"
              onClick={() => paramSetOpen(false)}
            >
              Vazgeç
            </button>
            <input
              className="btn green"
              id="btnSave"
              name="btnSave"
              type="button"
              onClick={() => Guncelle()}
              value="Güncelle"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default GuncelleCalisan;
