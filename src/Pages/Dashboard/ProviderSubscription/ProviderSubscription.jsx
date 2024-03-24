import React, { useState, useEffect } from "react";
import styles from "./ProviderSubscription.module.css";
import { baseURL } from "../../../Config";
import { FaCheck } from "react-icons/fa6";
import EditPackageModal from "../../../Components/Modal/EditPackageModal";


function ProviderSubscription() {
  const [packages, setPackages] = useState([]);
  const [packeageUpdateModel, setPackeageUpdateModel] = useState(false);
  const [packageData, setPackageData] = useState()
  const [refresh, setRefresh] = useState('')
  

  if(refresh){
    setTimeout(()=>{
      setRefresh("")
    }, [1500])
  }
  useEffect(()=>{
    async function getAPi(){
      const response = await baseURL.get(`show-package`,{
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      });
      setPackages(response?.data?.data);
    }
    getAPi();
  }, [refresh !== ""]);

  const handleGetValue=(value)=>{
    setPackageData(value);
    setPackeageUpdateModel(!packeageUpdateModel);
  }
  return (
    <div >
      <h2 style={{color: "white"}}>Packages</h2>
      <div className={styles.packagesContainer} >

        {
          packages?.map((item, index)=>
            <div style={{height: "405px"}} key={index} className={styles.packageCard} >
              <div >
                <h3 style={{color: "white"}}>{item?.package_name}</h3>
              </div>

              <div className={styles.packageDetails}>
                <div className={styles.packageOptionContainer}>
                  <div className={styles.packageOption}>
                    <div>Purchase for</div>
                    <div>Package Validity</div>
                  </div>
                  <div className={styles.packageOption}>
                    <div>$ {item?.price}</div>
                    <div>{item?.package_duration} Months</div>
                  </div>
                </div>
                <hr style={{ color: "#535770" }} />
                <div>
                  {
                   item?.package_features?.map((item, index)=> 
                      <div key={index} className={styles.packageFeatures}>
                        <FaCheck size={24} color="white" />
                        <span>{item}</span>
                    </div>
                    
                    )
                  }
                  <div>
                    <button
                      onClick={() => ( localStorage.setItem('package', JSON.stringify(item)), handleGetValue(item))}
                      className={styles.editBtn}
                    >
                      Edit Package
                    </button>
                  </div>
                </div>

                
              </div>
            </div>
          
          )
        }
 
      </div>

      {
        packeageUpdateModel && <EditPackageModal packageData={packageData} setRefresh={setRefresh} packeageUpdateModel={packeageUpdateModel} setPackeageUpdateModel= {setPackeageUpdateModel} />
      }
    </div>
  );
}

export default ProviderSubscription;
