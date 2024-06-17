import { useEffect, useState } from "react";
import { notification } from "antd";
import axios  from "axios";
// import { start } from "repl";





const initialValues= {
  yourName: "",
  yourPhone: "",
  yourEmail: "",
  yourAddress: "",
  report: "",
  date: "",
  CSC: "",
  location:  "",

  suspectName: "",
  suspectPostion: "",
  suspectPhone: "",

  File: [],
  
};

export const useForm = (validate) => {
  const [formState, setFormState] = useState({
    values: { ...initialValues },
    errors: { ...initialValues },
  });


  console.log("formState  123", formState)

  // const [dragFiles, setDragFiles] = useState([])

  console.log('values AAAAAAAAAAAAAA', formState.values)

  // const [progress, setProgress] = useState({ started: false, pc:0})
  // const [msg, setMsg] = useState('')
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState('');

  // console.log('msg', msg)
  let file1 = ''

  // useEffect(() => {
  //   console.log('HHHHHHHHHHHHHHHHHHHHHHHHH')
  //   if (formState.values.File?.length){
  //     file1 = formState.values.File
  //   }

  // }, [formState.values.File])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = formState.values;
    console.log('values BBBBBBBBBBBBBBBBBBBBB', formState.values)
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));

    


    const url= "http://192.168.0.5:8000/api/mail/createmail/"; 
    
    // const url= "https://rvw170cv-8000.uks1.devtunnels.ms/api/mail/createmail/"; 

    try {
      if (Object.values(errors).every((error) => error === "")) {
        const formdata = new FormData();
        console.log("file1 GGGGGGGGGGGGGG", values )
        if (values.File?.length){
          values.File.forEach(file => formdata.append('attachments', file))
        }
        formdata.append('full_name', values.yourName)
        formdata.append("email", values.yourEmail)
        formdata.append("phone_number", values.yourPhone)
        formdata.append("address", values.yourAddress)
    
        // formdata.append("location", locationInfo.CSC ? locationInfo.CSC : locationInfo.District ? locationInfo.District
        //   : locationInfo.Region ? locationInfo.Region : "" )
        formdata.append("location", values.location )
        // formdata.append("incident_happend_Date", locationInfo.incident_date ? locationInfo.incident_date: "")
        values.date && formdata.append("incident_happend_Date", values.date)
        formdata.append("eeu_office", values.CSC)
        formdata.append("report_detail", values.report)
    
        formdata.append("suspicious_name", values.suspectName)
        formdata.append("suspicious_position", values.suspectPostion)
        formdata.append("suspicious_phone", values.suspectPhone)
     
        setMsg("Uploading...")
        setProgress(prevState => {
          return {...prevState, started: true}
        })
        axios.post(url,formdata,{
          onUploadProgress: (progressEvent) => { setProgress(prevState => {
            return {...prevState, pc: Math.floor(progressEvent.progress *100)}
          })},
          // onUploadProgress: (progressEvent) => {
          //   const progress = progressEvent.loaded ? Math.round(progressEvent.loaded * 100 / (progressEvent.total || 1)) : 0;
          //   setProgress((prevState) => ({ ...prevState, pc: progress }));
          // },
          headers: {
            "Content-Type": "multipart/form-data"
                   }
        })
        .then(res => {
          setMsg("Upload succcessful")
            event.target.reset();
          setFormState(() => ({
            values: { ...initialValues },
            errors: { ...initialValues },
          }));
          
          setProgress(prevState => {
            return {...prevState, pc: 100}
          })

          notification["success"]({
            message: "Success",
            description: "Your message has been sent!",
          });
          console.log(res.data)})
        .catch(err => {
          setMsg("upload failed")
          notification["error"]({
                message: "Error",
                description:
                  "There was an error sending your report, please try again later.",
              });
          console.error(err)})




        // const response = await fetch(url, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        //   body: JSON.stringify(values),
        // });

        // if (!response.ok) {
        //   notification["error"]({
        //     message: "Error",
        //     description:
        //       "There was an error sending your message, please try again later.",
        //   });
        // } else {
        //   event.target.reset();
        //   setFormState(() => ({
        //     values: { ...initialValues },
        //     errors: { ...initialValues },
        //   }));

        //   notification["success"]({
        //     message: "Success",
        //     description: "Your message has been sent!",
        //   });
      //}
      }
    } catch (error) {
      notification["error"]({
        message: "Error",
        description: "Failed to submit form. Please try again later.",
      });
    }
  };

  const handleChange = (
    event
  ) => {
    event.persist();
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  return {
    handleChange,
    handleSubmit,
    setFormState,
    values: formState.values,
    errors: formState.errors,
    progress,
    msg,
  };
};
