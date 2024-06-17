import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";
import { Link } from "react-router-dom";
import RotatingCoin from "../logo_Animate/RotatingCoin";

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);

  const toggleButton = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    return (
      <>
        {/* <CustomNavLinkSmall onClick={() => scrollTo("about")}>
          <Span>{t("About")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("mission")}>
          <Span>{t("Mission")}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("product")}>
          <Span>{t("Product")}</Span>
        </CustomNavLinkSmall> */}
        <CustomNavLinkSmall
          style={{ width: "180px" }}
          onClick={() => scrollTo("report")}
        >
          {/* <Span>
            <Button>{t("Contact")}</Button>
          </Span> */}
          <Span>
            <Button>{t("Report")}</Button>
          </Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            {/* <SvgIcon src="logo.svg" width="101px" height="64px" /> */}
            {/* <img src={`/img/svg/logo.svg`} width="101px" height="64px"/> */}

            
              <RotatingCoin/>
              {/* <img
                  className="rounded-full w-12 h-12"
                  src={eeu_logo}
                  alt="picture"
              /> */}
              {/* <div style={{marginLeft: 10, fontSize: 18, fontFamily: 'Motiva Sans Bold'}}>
                <div>EEU</div> 
                <div>ANTI-CORRUPTION</div>
              </div> */}
              <div style={{marginLeft: 10, fontSize: 18, fontFamily: 'Motiva Sans Bold'}}>
              <div style={{
          //  fontFamily: FONTFAMILY.poppins_bold,
           fontSize: 18, color: "#F9A34C"}}>
            የኢትዮጵያ  ኤሌክትሪክ አገልግሎት 
        </div>
        <div style={{marginTop:-10,
          //  fontFamily: FONTFAMILY.poppins_bold,
           fontSize: 20, color: "#69BF70"}}>
            Ethiopian Electric Utility
        </div>
        </div>
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={toggleButton}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
