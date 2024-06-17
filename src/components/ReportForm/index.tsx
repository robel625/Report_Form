import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm2";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import './style.css'
import Dropzone from "../../common/Dropzone";
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { useState } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import { treeData } from "../../common/TreeData";
import ProgressBar from "@ramonak/react-progress-bar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';


const ReportForm = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit,  progress, msg, setFormState} = useForm(validate);

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof typeof errors];
    return ErrorMessage ? <Span style={{marginTop: 0, marginBottom:10}}>{ErrorMessage}</Span>:<span></span>
  };

  const [value, setValue] = useState<string>();

  const onChangeCSC = (newValue: string) => {
    setValue(newValue);

    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        ["CSC"]: newValue
      },
      errors: {
        ...prevState.errors,
        ["CSC"]: "",
      },
    }));

  };

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = (e) => {
    console.log('onPopupScroll', e);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        ["date"]: dateString
      },
      errors: {
        ...prevState.errors,
        ["date"]: "",
      },
    }));
    
  };

  return (
    <ContactContainer id={id}>
      <Row justify="space-between">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left" triggerOnce>
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right" triggerOnce>
             
            <FormGroup autoComplete="off" className="MainSection" onSubmit={handleSubmit}>
              <div  className="infohead">{t("Your Information")}</div>
              <Row justify="space-between" align="middle">
              {/* <Col span={12}> */}
               <Col lg={12} md={12} sm={12} xs={24}>
               <div className="inboxTitle">{t("Your Name (optional)")}</div>
                <Input
                  type="text"
                  name="yourName"
                  placeholder="Your Name"
                  value={values.yourName || ""}
                  onChange={handleChange}
                />
                <ValidationType type="yourName" />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
              <div className="inboxTitle">{t("Your phone")} <span style={{color: "red", fontSize: 25}}>*</span></div>
              
                <Input
                  type="text"
                  name="yourPhone"
                  placeholder="Your Phone Number"
                  value={values.yourPhone || ""}
                  onChange={handleChange}
                />
                <ValidationType type="yourPhone" />
              </Col>
              <Col span={12}>
              <div className="inboxTitle">{t("Your email (optional)")}</div>
                <Input
                  type="text"
                  name="yourEmail"
                  placeholder="Your Email"
                  value={values.yourEmail || ""}
                  onChange={handleChange}
                />
                <ValidationType type="yourEmail" />
              </Col>
              <Col span={12}>
              <div className="inboxTitle">{t("Your Address (optional)")}</div>
                <Input
                  type="text"
                  name="yourAddress"
                  placeholder="Your Address"
                  value={values.yourAddress || ""}
                  onChange={handleChange}
                />
                <ValidationType type="yourAddress" />
              </Col>
              </Row>
              <hr style={{marginTop: 10}}></hr>
              <div  className="infohead">{t("Incident Information")}</div>
              <Row justify="space-between" align="middle">
              <Col lg={12} md={12} sm={12} xs={24}>
              <div className="inboxTitle">{t("Incident happend date (optional)")}</div>
                 <DatePicker onChange={onChangeDate}  style={{ width: "80%", marginBottom: 10,}}/>
                <ValidationType type="date" />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
              <div className="inboxTitle">{t("Incident happend Location")}<span style={{color: "red", fontSize: 25}}>*</span></div>
                <Input
                  type="text"
                  name="location"
                  placeholder="Incident happend Location"
                  value={values.location || ""}
                  onChange={handleChange}
                />
                <ValidationType type="location" />
              </Col>
              <Col lg={12} md={12} sm={12} xs={24}>
                {/* <Input
                  type="text"
                  name="location"
                  placeholder="Incident happend Location"
                  value={values.email || ""}
                  onChange={handleChange}
                /> */}
                <div className="inboxTitle">{t("To which EEU (Region, District, CSC) to inform your suggestion (optional)")}</div>
                 <TreeSelect
                    showSearch
                    className="tree-select-class"
                    value={value}
                    dropdownStyle={{ maxHeight: 1000, overflow: 'auto' }}
                    placeholder="Please select"
                    // allowClear
                    // treeDefaultExpandAll
                    onChange={onChangeCSC}
                    treeData={treeData}
                    onPopupScroll={onPopupScroll}
                  />
                
              </Col>
              </Row>
              <Col span={24}>
              <div className="inboxTitle">{t("Details of your Report")}<span style={{color: "red", fontSize: 25}}>*</span></div>
                {/* <TextArea
                  placeholder="Details of your Report"
                  value={values.message || ""}
                  name="message"
                  onChange={handleChange}
                /> */}
                <textarea
                placeholder={t("Details of your Report")}
                id="report"
                name="report"
                onChange={handleChange}
                ></textarea>
                <ValidationType type="report" />
              </Col>
              <div style={{display: "block", marginTop: 15, marginBottom: 1 }}>{t('Submit supporting evidence for your report')}</div>
              <Dropzone className='p-10 mt-1 border-2 border-neutral-300 border-dashed' setFormState={setFormState}/>
              <hr></hr>
              <div  className="infohead">{t("Suspect's Information (optional)")}</div>
              <Row justify="space-between" align="middle">
              <Col span={12}>
                <Input
                  type="text"
                  name="suspectName"
                  placeholder="Suspect's Name"
                  value={values.suspectName || ""}
                  onChange={handleChange}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  name="suspectPostion"
                  placeholder="Suspect's Phone Number"
                  value={values.suspectPostion || ""}
                  onChange={handleChange}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  name="suspectPhone"
                  placeholder="Suspect's Position"
                  value={values.suspectPhone || ""}
                  onChange={handleChange}
                />
                <ValidationType type="email" />
              </Col>
              </Row>
              <ButtonContainer>
                <Button name="submit">{t("Submit")}</Button>
              </ButtonContainer>
              {/* <div style={{marginTop: 20, backgroundColor: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center'}}> */}
              <div style={{marginTop: 20}}>
              {progress.started &&<ProgressBar completed={progress.pc}></ProgressBar>}
            {/* {progress.started && <progress max="100" value={progress.pc}></progress>} */}
               {msg && <div>{msg}</div>}
            </div>
            </FormGroup>
            

          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default withTranslation()(ReportForm);
