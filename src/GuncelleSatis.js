import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import GetEmployeeList from "./MockServices/GetEmployeeList";
import GetCustomerList from "./MockServices/GetCustomerList";
import GetFlatList from "./MockServices/GetFlatList";
import ListeSatis from "./ListeSatis";
import siteAddress from "./SiteAddress";

function GuncelleSatis({ paramSetOpen }) {
  const [salesDate, setSalesDate] = useState();
  const [customerID, setCustomerID] = useState();
  const [flatID, setFlatID] = useState();
  const [price, setPrice] = useState();
  const [employeeID, setEmployeeID] = useState();
  const [notes, setNotes] = useState();
  const [salesList, setSalesList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  ListeSatis({ paramSetSalesList: setSalesList });
  GetCustomerList({ paramSetCustomerList: setCustomerList });
  useEffect(() => {
    if (salesList.length != 0) {
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
      const filteredSalesList = salesList.filter(
        (repofilter) => repofilter.SalesID == searchParam.get("id")
      );
      document.getElementById("dtpSaleDate").value = formatDate(
        filteredSalesList[0].SalesDate
      );
      document.getElementById("cmbCustomer").value =
        filteredSalesList[0].CustomerID;
      document.getElementById("cmbFlat").value = filteredSalesList[0].FlatID;
      document.getElementById("txtPrice").value = filteredSalesList[0].Price;
      document.getElementById("cmbEmployees").value =
        filteredSalesList[0].EmployeeID;
      document.getElementById("txtNotes").value = filteredSalesList[0].Notes;

      setSalesDate(document.getElementById("dtpSaleDate").value);
      setCustomerID(document.getElementById("cmbCustomer").value);
      setFlatID(document.getElementById("cmbFlat").value);
      setPrice(document.getElementById("txtPrice").value);
      setEmployeeID(document.getElementById("cmbEmployees").value);
      setNotes(document.getElementById("txtNotes").value);
    }
  }, [salesList, customerList]);

  const Guncelle = async () => {
    const requestBody = {
      SalesID: searchParam.get("id"),
      SalesDate: salesDate,
      CustomerID: customerID,
      FlatID: flatID,
      Price: price,
      EmployeeID: employeeID,
      Notes: notes,
    };

    const response = await axios.put(siteAddress + "/putSales", requestBody);
    // const response = await axios.put(
    //   "http://localhost:8080/putSales",
    //   requestBody
    // );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Satış Bilgileri Güncellenmiştir.");
      console.log(requestBody);
    } else {
      window.alert("Hata Oluştu!");
    }
  };

  return (
    <div className="col-xl-12 ">
      {/* BEGIN SAMPLE FORM PORTLET*/}
      <div className="portlet light">
        <div className="portlet-title">
          <div className="caption">
            <i className="fa fa-cogs font-green-sharp" />
            <span className="caption-subject font-green-sharp bold uppercase">
              SATIŞ BİLGİLERİ GÜNCELLE
            </span>
          </div>
        </div>
        <div className="portlet-body form">
          <form>
            <div className="form-body">
              <div className="form-group">
                <label>Satış Tarihi *</label>
                <input
                  id="dtpSaleDate"
                  name="dtpSaleDate"
                  className="form-control form-control-inline input-medium date-picker"
                  size={16}
                  type="date"
                  onChange={(e) => setSalesDate(e.target.value)}
                  defaultValue
                  required
                />
                <span className="help-block">Tarih Seçiniz </span>
              </div>
              <GetCustomerList setCustomerID={setCustomerID} />
              <GetFlatList setFlatID={setFlatID} />
              <div className="form-group">
                <label>Fiyat *</label>
                <input
                  className="form-control"
                  id="txtPrice"
                  name="txtPrice"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <GetEmployeeList setEmployeeID={setEmployeeID} />
              <div className="form-group">
                <label>Notlar *</label>
                <textarea
                  id="txtNotes"
                  name="txtNotes"
                  className="form-control"
                  autoComplete="off"
                  onChange={(e) => setNotes(e.target.value)}
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

export default GuncelleSatis;
