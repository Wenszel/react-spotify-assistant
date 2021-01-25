import React from 'react'
const DownloadList = (props)=>{
        const createDownloadList = ()=>{
            let list="";
            props.list.forEach((item, index)=>{
              list+=`${index+1}. ${item.name}\n`;
            })
            return(list);
          }
        const file = new Blob([createDownloadList()], {type: 'text/plain;charset=utf-8'}); 
    return(
        <a className="download-button" download={props.name+".txt"}
        href={URL.createObjectURL(file)}>Download list!</a>
    )
}
export default DownloadList;