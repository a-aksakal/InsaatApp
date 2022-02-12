import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import GetCityList from "./MockServices/GetCityList";
import GetProjectStatusList from "./MockServices/GetProjectStatusList";
import { useSearchParams } from "react-router-dom";
import GetGenderList from "./MockServices/GetGenderList";
import ListeProje from "./ListeProje";
import GetFlatType from "./MockServices/GetFlatType";

function GuncelleDaireTipi({ paramSetOpen }) {
  const [flatTypeName, setFlatTypeName] = useState();
  const [flatType, setFlatType] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  GetFlatType({ paramSetFlatType: setFlatType });

  useEffect(() => {
    document.getElementById("txtFlatTypeName").value = flatType
      .filter((repofilter) => repofilter.FlatTypeID == searchParam.get("id"))
      .map((repo) => repo.FlatTypeName);

    setFlatTypeName(document.getElementById("txtFlatTypeName").value);
  }, [flatType]);

  const Guncelle = async () => {
    const requestBody = {
      FlatTypeID: searchParam.get("id"),
      FlatTypeName: flatTypeName,
    };

    const response = await axios.put(
      "https://private-de332a-insaatapi6.apiary-mock.com/putFlatType",
      requestBody
    );
    // const response = await axios.put(
    //   "http://localhost:8080/putFlatType",
    //   requestBody
    // );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Daire Tipi Bilgileri Güncellenmiştir.");
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
                DAİRE TİPİ BİLGİLERİ GÜNCELLE
              </span>
            </div>
          </div>
          <div className="portlet-body form">
            <form role="form">
              <div className="form-body">
                <div className="form-group">
                  <label>Daire Tipi Adı*</label>
                  <input
                    type="text"
                    id="txtFlatTypeName"
                    name="txtFlatTypeName"
                    className="form-control"
                    autoComplete="off"
                    required
                    onChange={(e) => setFlatTypeName(e.target.value)}
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
                  value="Güncelle"
                  onClick={() => Guncelle()}
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

export default GuncelleDaireTipi;
