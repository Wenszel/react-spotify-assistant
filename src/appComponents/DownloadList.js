import React from 'react'
const DownloadList = (props)=>{
    const file = new Blob([props.list], {type: 'text/plain;charset=utf-8'}); 
    return(
        <a download={"myFile.txt"}
        href={URL.createObjectURL(file)}>Download list!</a>
    )
}
export default DownloadList;