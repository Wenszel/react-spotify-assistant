import React from 'react'
const DownloadList = ({name, list})=>{
  const createDownloadList = ()=>{
    let formatedList="";
    list.forEach((item, index)=>{
      formatedList+=`${index+1}. ${item.name}\n`;
    });
    return(formatedList);
  }
  const file = new Blob([createDownloadList()], {type: 'text/plain;charset=utf-8'}); 
 
  return(
    <a className="download-button" download={name+".txt"}
    href={URL.createObjectURL(file)}>Download list!</a>
  )
}
export default DownloadList;