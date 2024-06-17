import { useState } from "react";
import { notification } from "antd";
import axios  from "axios";
import { start } from "repl";

interface IValues {
  yourName: string;
  yourPhone: string;
  yourEmail: string;
  yourAddress: string;
  message: string;

  date: string;
  CSC: string;
  location: string;
  
}

interface ProgressState {
  started: boolean;
  pc: number; // Percentage (0-100)
}

const initialValues: IValues = {
  yourName: "",
  yourPhone: "",
  yourEmail: "",
  yourAddress: "",
  message: "",
  date: "",
  CSC: "",
  location:  "",
};

export const useForm = (validate: { (values: IValues): IValues }) => {
  const [formState, setFormState] = useState<{
    values: IValues;
    errors: IValues;
  }>({
    values: { ...initialValues },
    errors: { ...initialValues },
  });

  // const [progress, setProgress] = useState({ started: false, pc:0})
  // const [msg, setMsg] = useState('')
  const [progress, setProgress] = useState<ProgressState>({ started: false, pc: 0 });
  const [msg, setMsg] = useState<string>('');

  console.log('msg', msg)

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = formState.values;
    const errors = validate(values);
    setFormState((prevState) => ({ ...prevState, errors }));




    const url: string = "http://192.168.0.5:8000/api/mail/webcreatemail/"; // Fill in your API URL here

    try {
      if (Object.values(errors).every((error) => error === "")) {
        const formdata: FormData = new FormData();
        formdata.append('full_name', '')
        formdata.append("email", '')
        formdata.append("phone_number", '0910118088')
        formdata.append("address", '')
    
        // formdata.append("location", locationInfo.CSC ? locationInfo.CSC : locationInfo.District ? locationInfo.District
        //   : locationInfo.Region ? locationInfo.Region : "" )
        formdata.append("location", "addis ababa" )
        // formdata.append("incident_happend_Date", locationInfo.incident_date ? locationInfo.incident_date: "")
        // formdata.append("incident_happend_Date", locationInfo.incident_date ? locationInfo.incident_date: "")
        formdata.append("eeu_office", 'locationInfo.location')
        formdata.append("report_detail", "subjectBody.body")
    
        formdata.append("suspicious_name", "subjectBody.name")
        formdata.append("suspicious_position", "subjectBody.position")
        formdata.append("suspicious_phone", "subjectBody.phone")
     
        setMsg("Uploading...")
        setProgress(prevState => {
          return {...prevState, started: true}
        })
        axios.post<any>(url,formdata,{
          // onUploadProgress: (progressEvent) => { setProgress(prevState => {
          //   return {...prevState, pc: progressEvent.progress *100}
          // })},
          onUploadProgress: (progressEvent) => {
            // Handle potential undefined progress
            const progress = progressEvent.loaded ? Math.round(progressEvent.loaded * 100 / (progressEvent.total || 1)) : 0;
            setProgress((prevState) => ({ ...prevState, pc: progress }));
          },
          headers: {
            "Custom-Header": "value",
                   }
        })
        .then(res => {
          setMsg("Upload succcessful")
          console.log(res.data)})
        .catch(err => {
          setMsg("upload failed")
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    values: formState.values,
    errors: formState.errors,
  };
};
