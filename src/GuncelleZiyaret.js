import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import GetCustomerList from "./MockServices/GetCustomerList";
import GetProjectList from "./MockServices/GetProjectList";
import ListeZiyaret from "./ListeZiyaret";

function GuncelleZiyaret({ paramSetOpen }) {
  const [visitDate, setVisitDate] = useState();
  const [customerID, setCustomerID] = useState();
  const [projectID, setProjectID] = useState();
  const [visitList, setVisitList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [notes, setNotes] = useState();
  const [searchParam, setSearchParam] = useSearchParams();
  ListeZiyaret({ paramSetVisitList: setVisitList });
  GetCustomerList({ paramSetCustomerList: setCustomerList });
  useEffect(() => {
    if (visitList.length != 0) {
      function formatDate(date) {
        var dSql = date;
        var dobject = dSql.split("/");

        var d = new Date(dobject[2], dobject[1] - 1, dobject[0]),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = "" + d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }
      const filteredVisitDetails = visitList.filter(
        (repofilter) => repofilter.VisitID == searchParam.get("id")
      );

      document.getElementById("cmbCustomer").value =
        filteredVisitDetails[0].CustomerID;
      document.getElementById("cmbProject").value =
        filteredVisitDetails[0].ProjectID;
      document.getElementById("dtpMeetingDate").value = formatDate(
        filteredVisitDetails[0].VisitDate
      );
      document.getElementById("txtNotes").value = filteredVisitDetails[0].Notes;

      setVisitDate(document.getElementById("dtpMeetingDate").value);
      setCustomerID(document.getElementById("cmbCustomer").value);
      setProjectID(document.getElementById("cmbProject").value);
      setNotes(document.getElementById("txtNotes").value);
    }
  }, [visitList, customerList]);

  const Guncelle = async () => {
    const requestBody = {
      VisitID: searchParam.get("id"),
      VisitDate: visitDate,
      CustomerID: customerID,
      ProjectID: projectID,
      Notes: notes,
    };

    const response = await axios.put(
      "https://private-de332a-insaatapi6.apiary-mock.com/putVisit",
      requestBody
    );
    // const response = await axios.put(
    //   "http://localhost:8080/putVisit",
    //   requestBody
    // );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Ziyaret Bilgileri Güncellenmiştir.");
      console.log(requestBody);
    } else {
      window.alert("Hata Oluştu!");
    }
  };

  return (
    <div className="col-xl-6 ">
      {/* BEGIN SAMPLE FORM PORTLET*/}
      <div className="portlet light">
        <div className="portlet-title">
          <div className="caption">
            <i className="fa fa-cogs font-green-sharp" />
            <span className="caption-subject font-green-sharp bold uppercase">
              ZİYARET BİLGİLERİNİ GÜNCELLE
            </span>
          </div>
        </div>
        <div className="portlet-body form">
          <form role="form">
            <div className="form-body">
              <div className="form-group">
                <label>Ziyaret Tarihi *</label>
                <input
                  id="dtpMeetingDate"
                  name="dtpMeetingDate"
                  className="form-control form-control-inline input-medium date-picker"
                  size={16}
                  type="date"
                  onChange={(e) => setVisitDate(e.target.value)}
                  defaultValue
                  required
                />
                <span className="help-block">Tarih Seçiniz </span>
              </div>
              <GetCustomerList setCustomerID={setCustomerID} />
              <GetProjectList setProjectID={setProjectID} />
              <div className="form-group">
                <label>Notlar *</label>
                <textarea
                  id="txtNotes"
                  name="txtNotes"
                  className="form-control"
                  autoComplete="off"
                  onChange={(e) => setNotes(e.target.value)}
                  required
                  defaultValue={""}
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
      {/* END SAMPLE FORM PORTLET*/}
    </div>
  );
}

export default GuncelleZiyaret;
