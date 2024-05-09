// HomePage.jsx
import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import img1 from "../../assets/images/doctor1.webp";
import img2 from "../../assets/images/doctor2.webp";
import img3 from "../../assets/images/doctor3.webp";
import img4 from "../../assets/images/doctor4.webp";
import guaranteecommitment1 from "../../assets/images/guarantee_commitment_1.webp";
import guaranteecommitment2 from "../../assets/images/guarantee_commitment_2.webp";
import guaranteecommitment3 from "../../assets/images/guarantee_commitment_3.webp";
import guaranteecommitment4 from "../../assets/images/guarantee_commitment_4.webp";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { Image, ImageContainer, ContentWrapper, List, ListItem, Paragraph, Title, WrapperDoctorList, WrapperDoctor, Avatar, DoctorName, CenteredText, Wrapper, Text, TextGuaranteeCommitment } from "./HomePageStyle";

const HomePage = () => {
    return (
        <div>
            <div style={{ padding: '0 120px' }}>
                <SliderComponent arrSlider={[slider1, slider2, slider3]} />
            </div>
            <WrapperDoctorList>
            <CenteredText>Professional team of doctors</CenteredText>
                <WrapperDoctor>
                    <Avatar src={img1} alt="Doctor 1" />
                    <DoctorName>Jennifer Davis</DoctorName>
                </WrapperDoctor>
                <WrapperDoctor>
                    <Avatar src={img2} alt="Doctor 2" />
                    <DoctorName>David Wilson</DoctorName>
                </WrapperDoctor>
                <WrapperDoctor>
                    <Avatar src={img3} alt="Doctor 3" />
                    <DoctorName>Michael Brown</DoctorName>
                </WrapperDoctor>
                <WrapperDoctor>
                    <Avatar src={img4} alt="Doctor 4" />
                    <DoctorName>John Smith</DoctorName>
                </WrapperDoctor>
            </WrapperDoctorList>


            <div>
                <ContentWrapper>
                    <Title>The Central City General Hospital Pharmacy</Title>
                    <Paragraph>We are committed to providing you with a convenient and fast shopping experience. With a diverse range of medicines and dietary supplements, you can find products that meet your health needs.</Paragraph>
                    <Paragraph style={{fontWeight:'bold'}}>Why Choose Us?</Paragraph>
                    <List>
                        <ListItem>🔵 Safety: We offer doorstep delivery, simple, and fast.</ListItem>
                        <ListItem>🔵 Convenience: We provide doorstep delivery, simple, and fast.</ListItem>
                        <ListItem>🔵 Reputation: We always ensure the quality and origin of our products.</ListItem>
                        <ListItem>🔵 Quality: Our products are tested and meet safety standards.</ListItem>
                    </List>
                    <Paragraph> We take pride in being a reliable destination for purchasing medicines and dietary supplements. Our services and commitments aim to bring the best to our users. Quick and convenient services. Doorstep delivery in a short time. Easy-to-use online ordering system, saving you time. Diverse and quality products. We offer a variety of medicines and dietary supplements, from vitamins to medicinal drugs. All products are tested and meet safety standards. Safety is always our top priority. Come to us to experience the convenience and reliability of purchasing medicines and dietary supplements!</Paragraph>
                </ContentWrapper>
            </div>

            <Wrapper>
            <TextGuaranteeCommitment>Guarantee commitment</TextGuaranteeCommitment>
            <ImageContainer>
                <div>
                <Image src={guaranteecommitment1} alt="Guarantee commitment 1" />
                <Text>Safe</Text>
                </div>
                <div><Image src={guaranteecommitment2} alt="Guarantee commitment 2" />
                 <Text>Reliability</Text></div>
                <div>  <Image src={guaranteecommitment3} alt="Guarantee commitment 3" />
                <Text>Quality</Text></div>
                <div><Image src={guaranteecommitment4} alt="Guarantee commitment 4" />
                <Text>Convenience and speed</Text></div>
                 
              
                
            </ImageContainer>
        </Wrapper>

            <FooterComponent />
        </div>
    );
};

export default HomePage;
