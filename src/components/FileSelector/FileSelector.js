import { FormCtx } from '../Form/Form';
import React,{ useState, useEffect, useContext } from 'react'; 

export const FileSelector = ({id, label, onFileUpload, ...props}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { fields, addField, errors, setFile } = useContext(
        FormCtx
    );
    const field = fields[id] || {};
    const fieldError = errors[id] || "";

    const onFileChange = event => { 
      const selectedFile = event.target.files[0];
      const formData = new FormData(); 
    
        // Update the formData object 
      formData.append( 
            "myFile", 
            selectedFile, 
            selectedFile.name 
      );
      field.value = formData;
      setFile(event, field)
    };
    useEffect(() => {
        addField({
          field: {id,...props},
          value: new FormData(),
        });
      }, []);
    
    return ( 
        <div>
            <input type="file" id="file" onChange={onFileChange} /> 
        <label for="file">Upload</label>
        </div>
        
     
    ); 

}

