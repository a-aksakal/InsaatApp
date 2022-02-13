import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

function FormSehir({ paramSetOpenAdd }) {
  const [cityName, setCityName] = useState();

  const Ekle = async () => {
    const requestBody = {
      CityName: cityName,
    };

    // const response = await axios.post(
    //   "http://localhost:8080/postCity",
    //   requestBody
    // );
    const response = await axios.post(
      "https://private-de332a-insaatapi6.apiary-mock.com/postCity",
      requestBody
    );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Şehir Bilgisi Eklenmiştir.");
      console.log(requestBody);
    } else {
      window.alert("Hata Oluştu!");
    }
  };

  return (
    <div className="row">
      <div className="col-xl-12 ">
        {/* BEGIN SAMPLE FORM PORTLET*/}
        <div className="portlet light">
          <div className="portlet-title">
            <div className="caption">
              <i className="fa fa-cogs font-green-sharp" />
              <span className="caption-subject font-green-sharp bold uppercase">
                ŞEHİR BİLGİSİ EKLE
              </span>
            </div>
          </div>
          <div className="portlet-body form">
            <form role="form">
              <div className="form-body">
                <div className="form-group">
                  <label>Şehir Adı *</label>
                  <input
                    type="text"
                    id="txtCityName"
                    name="txtCityName"
                    className="form-control"
                    autoComplete="off"
                    required
                    onChange={(e) => setCityName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-actions right">
                <button
                  type="button"
                  className="btn default"
                  id="btnCancel"
                  name="btnCancel"
                  onClick={() => paramSetOpenAdd(false)}
                >
                  Vazgeç
                </button>
                <input
                  className="btn green"
                  id="btnSave"
                  name="btnSave"
                  type="button"
                  value="Ekle"
                  onClick={() => Ekle()}
                />
              </div>
            </form>
          </div>
        </div>
        {/* END SAMPLE FORM PORTLET*/}
      </div>
    </div>
  );
}

export default FormSehir;
