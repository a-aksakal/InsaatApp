import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import GetCustomerList from "./MockServices/GetCustomerList";
import GetGenderList from "./MockServices/GetGenderList";
import GetCityList from "./MockServices/GetCityList";
import GetIncomeTypeList from "./MockServices/GetIncomeTypeList";
import SiteAddress from "./SiteAddress";

function GuncelleMusteri({ paramSetOpen }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const [customerList, setCustomerList] = useState([]);
  const [customerNo, setCustomerNo] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [tcNo, setTcNo] = useState();
  const [email, setEmail] = useState();
  const [birthDate, setBirthDate] = useState();
  const [genderID, setGenderID] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [cityID, setCityID] = useState();
  const [flatTypeList, setFlatTypeList] = useState([]);
  const [incomeTypeList, setIncomeTypeList] = useState([]);
  const [customerFlatType, setCustomerFlatType] = useState([]);
  const [incomeTypeID, setIncomeTypeID] = useState();
  GetCustomerList({ paramSetCustomerList: setCustomerList });
  GetIncomeTypeList({ paramSetIncomeTypeList: setIncomeTypeList });
  useEffect(() => {
    const filteredCustomerDetails = customerList.filter(
      (repofilter) => repofilter.CustomerID == searchParam.get("id")
    );
    if (filteredCustomerDetails.length != 0) {
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
      document.getElementById("txtCustomerNo").value =
        filteredCustomerDetails[0].CustomerNo;
      document.getElementById("txtFirstName").value =
        filteredCustomerDetails[0].CustomerName;
      document.getElementById("txtLastName").value =
        filteredCustomerDetails[0].CustomerSurname;
      document.getElementById("txtTCNo").value = filteredCustomerDetails[0].TC;
      document.getElementById("txtEMail").value =
        filteredCustomerDetails[0].EMail;
      document.getElementById("cmbGender").value =
        filteredCustomerDetails[0].GenderID;
      document.getElementById("dtpBirthDate").value = formatDate(
        filteredCustomerDetails[0].BirthDate
      );

      document.getElementById("txtPhone").value =
        filteredCustomerDetails[0].GSM;
      document.getElementById("txtAddress").value =
        filteredCustomerDetails[0].Address;
      document.getElementById("cmbCity").value =
        filteredCustomerDetails[0].CityID;
      document.getElementById("cmbIncomeStatus").value =
        filteredCustomerDetails[0].IncomeTypeID;

      setName(document.getElementById("txtFirstName").value);
      setSurname(document.getElementById("txtLastName").value);
      setCustomerNo(document.getElementById("txtCustomerNo").value);
      setTcNo(document.getElementById("txtTCNo").value);
      setEmail(document.getElementById("txtEMail").value);
      setGenderID(document.getElementById("cmbGender").value);
      setBirthDate(document.getElementById("dtpBirthDate").value);
      setPhone(document.getElementById("txtPhone").value);
      setAddress(document.getElementById("txtAddress").value);
      setCityID(document.getElementById("cmbCity").value);
      setIncomeTypeID(document.getElementById("cmbIncomeStatus").value);
    }
  }, [customerList, incomeTypeList]);

  const Guncelle = async () => {
    const requestBody = {
      CustomerID: searchParam.get("id"),
      CustomerName: name,
      CustomerSurname: surname,
      GSM: phone,
      TC: tcNo,
      BirthDate: birthDate,
      EMail: email,
      Address: address,
      GenderID: genderID,
      CityID: cityID,
      CustomerNo: customerNo,
      IncomeTypeID: incomeTypeID,
    };

    const response = await axios.put(SiteAddress + "/putCustomer", requestBody);
    // const response = await axios.put(
    //   "http://localhost:8080/putCustomer",
    //   requestBody
    // );
    if (response.config.status == 200 || 201) {
      window.alert("Müşteri Bilgileri Güncellenmiştir.");
      console.log(requestBody);
    } else {
      window.alert("Hata Oluştu!");
    }
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        {/* BEGIN SAMPLE FORM PORTLET*/}
        <div className="portlet light">
          <div className="portlet-title">
            <div className="caption">
              <i className="fa fa-cogs font-green-sharp" />
              <span className="caption-subject font-green-sharp bold uppercase">
                MÜŞTERİ BİLGİLERİ GÜNCELLE
              </span>
            </div>
          </div>
          <div className="portlet-body form">
            <form role="form" name="form1">
              <div className="form-body">
                <div className="form-group">
                  <label>Müşteri No *</label>
                  <input
                    type="number"
                    id="txtCustomerNo"
                    name="txtCustomerNo"
                    className="form-control"
                    required
                    onChange={(e) => setCustomerNo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Ad *</label>
                  <input
                    type="text"
                    id="txtFirstName"
                    name="txtFirstName"
                    autoComplete="off"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Soyad *</label>
                  <input
                    type="text"
                    id="txtLastName"
                    name="txtLastName"
                    autoComplete="off"
                    className="form-control"
                    onChange={(e) => setSurname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>TC No *</label>
                  <input
                    type="text"
                    id="txtTCNo"
                    name="txtTCNo"
                    autoComplete="off"
                    className="form-control"
                    onChange={(e) => setTcNo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Adresi</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope" />
                    </span>
                    <input
                      type="email"
                      id="txtEMail"
                      name="txtEMail"
                      autoComplete="off"
                      className="form-control"
                      placeholder="Email Adresi"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Doğum Tarihi *</label>
                  <input
                    id="dtpBirthDate"
                    name="dtpBirthDate"
                    autoComplete="off"
                    className="form-control form-control-inline input-medium date-picker"
                    size={16}
                    type="date"
                    onChange={(e) => setBirthDate(e.target.value)}
                    defaultValue
                    required
                  />
                  <span className="help-block">Tarih Seçiniz </span>
                </div>

                {/* END SAMPLE FORM PORTLET*/}
                <GetGenderList setGenderID={setGenderID} />
                <div className="form-group">
                  <label>Telefon</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-phone" />
                    </span>
                    <input
                      type="tel"
                      id="txtPhone"
                      name="txtPhone"
                      className="form-control"
                      autoComplete="off"
                      placeholder="(5xx)-xxx-xx-xx"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Adres *</label>
                  <textarea
                    id="txtAddress"
                    name="txtAddress"
                    className="form-control"
                    required
                    autoComplete="off"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <GetCityList setCityID={setCityID} />
                <GetIncomeTypeList setIncomeTypeID={setIncomeTypeID} />
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
      </div>
    </div>
  );
}

export default GuncelleMusteri;
