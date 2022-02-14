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
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
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
    document.getElementById("txtUserName").value = employeeList
      .filter((repofilter) => repofilter.EmployeeID == searchParam.get("id"))
      .map((repo) => repo.Username);
    document.getElementById("txtPassword").value = employeeList
      .filter((repofilter) => repofilter.EmployeeID == searchParam.get("id"))
      .map((repo) => repo.Password);
    setName(document.getElementById("txtFirstName").value);
    setSurname(document.getElementById("txtLastName").value);
    setUsername(document.getElementById("txtUserName").value);
    setPassword(document.getElementById("txtPassword").value);
  }, [employeeList]);

  const Guncelle = async () => {
    const requestBody = {
      EmployeeID: searchParam.get("id"),
      EmployeeName: name,
      EmployeeSurname: surname,
      Username: username,
      Password: password,
    };

    const response = await axios.put(siteAddress + "/putEmployee", requestBody);
    // const response = await axios.put(
    //   "http://localhost:8080/putEmployee",
    //   requestBody
    // );
    if (response.data.Result == "İşlem Başarılı!") {
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
            <div className="form-group">
              <label>Kullanıcı Adı *</label>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-user" />
                </span>
                <input
                  type="text"
                  id="txtUserName"
                  name="txtUserName"
                  className="form-control"
                  placeholder="Kullanıcı Adı"
                  autoComplete="off"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Parola *</label>
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fa fa-lock" />
                </span>
                <input
                  type="password"
                  id="txtPassword"
                  name="txtPassword"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Parola"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
