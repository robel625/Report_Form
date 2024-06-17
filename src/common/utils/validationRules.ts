import { validateProps } from "../../common/types";
import { notification } from "antd";

export default function validate(values: validateProps) {
  let errors = {} as validateProps;

  // if (!values.name) {
  //   errors.name = "Name is required";
  // }
  if (!values.yourPhone) {
    errors.yourPhone = "Your phone is required";
      notification["error"]({
            message: "",
            description:
              "Your phone is required",
          });
  }else if (!values.yourPhone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
      errors.yourPhone = "Please input a valid phone number";
      notification["error"]({
        message: "",
        description:
          "Please input a valid phone number",
      });
    }
  // if (!values.email) {
  //   errors.email = "Email address is required";
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email address is invalid";
  // }
  if(values.yourEmail.length != 0 && !/\S+@\S+\.\S+/.test(values.yourEmail)){
    errors.yourEmail = "Email address is invalid";
    notification["error"]({
      message: "",
      description:
        "Email address is invalid",
    });
  }
  if (!values.location) {
    errors.location = "Incident happend location is required";
    notification["error"]({
      message: "",
      description:
        "Incident happend location is required",
    });
  }
  if (!values.report) {
    errors.report = "Details of your Report is required";
    notification["error"]({
      message: "",
      description:
        "Details of your Report is required",
    });
  }else if (values.report.length < 1){
    errors.report = "write your Report in Detail";
    notification["error"]({
      message: "",
      description:
        "write your Report in Detail",
    });
  }
  return errors;
}




// if (!values.name) {
  //   errors.name = "Name is required";
  // }
  // if (!values.phone) {
  //   errors.phone = "phone is required";
  // }
  // if (!values.email) {
  //   errors.email = "Email address is required";
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email address is invalid";
  // }

  // if(values.email.length != 0 && !/\S+@\S+\.\S+/.test(values.email)){
  //   errors.email = "Email address is invalid";
  // }

  // if (!values.message) {
  //   errors.message = "Message is required";
  // }
  // return errors;