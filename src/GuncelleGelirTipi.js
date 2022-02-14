import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import GetIncomeTypeList from "./MockServices/GetIncomeTypeList";
import SiteAddress from "./SiteAddress";

function GuncelleGelirTipi({ paramSetOpen }) {
  const [incomeTypeName, setIncomeTypeName] = useState();
  const [incomeTypeList, setIncomeTypeList] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  GetIncomeTypeList({ paramSetIncomeTypeList: setIncomeTypeList });

  useEffect(() => {
    document.getElementById("txtIncomeTypeName").value = incomeTypeList
      .filter((repofilter) => repofilter.IncomeTypeID == searchParam.get("id"))
      .map((repo) => repo.IncomeTypeName);

    setIncomeTypeName(document.getElementById("txtIncomeTypeName").value);
  }, [incomeTypeList]);

  const Guncelle = async () => {
    const requestBody = {
      IncomeTypeID: searchParam.get("id"),
      IncomeTypeName: incomeTypeName,
    };

    const response = await axios.put(
      SiteAddress + "/putIncomeType",
      requestBody
    );
    // const response = await axios.put(
    //   "http://localhost:8080/putIncomeType",
    //   requestBody
    // );
    if (response.data.Result == "İşlem Başarılı!") {
      window.alert("Gelir Tipi Bilgileri Güncellenmiştir.");
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
                GELİR TİPİ BİLGİLERİ GÜNCELLE
              </span>
            </div>
          </div>
          <div className="portlet-body form">
            <form role="form">
              <div className="form-body">
                <div className="form-group">
                  <label>Gelir Tipi Adı *</label>
                  <input
                    type="text"
                    id="txtIncomeTypeName"
                    name="txtIncomeTypeName"
                    className="form-control"
                    autoComplete="off"
                    required
                    onChange={(e) => setIncomeTypeName(e.target.value)}
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

export default GuncelleGelirTipi;
