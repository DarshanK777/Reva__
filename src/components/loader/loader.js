import React from "react";
import './loader.css'
import SyncLoader from "react-spinners/SyncLoader";
import ClipLoader from "react-spinners/ClipLoader";


 
export const  SyncLoading = (props) =>{
    return(
        <SyncLoader
          size={12}
          color={"grey"}
          loading={true}
        />
    )
}

export const ClipLoading = () =>{
    return(
        <ClipLoader
            size={80}
            color={"grey"}
            loading={true}
      />
    )
}