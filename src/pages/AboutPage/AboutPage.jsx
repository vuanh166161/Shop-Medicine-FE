import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { Image, ImageContainer, ContentWrapper, List, ListItem, Paragraph, Title, WrapperDoctorList, WrapperDoctor, Avatar, DoctorName, CenteredText, Wrapper, Text, TextGuaranteeCommitment } from "./AboutPage";

const AboutPage = () => {
    return (
        <div>
            <div style={{ padding: '0 120px' }}>
                <SliderComponent arrSlider={[slider1, slider2, slider3]} />
            </div>
            <div style={{ marginTop: '20px'}}>
                <ContentWrapper>
                    <Title>Welcome to Shop Medice</Title>
                    <Paragraph>We are a team of specialized doctors, a dedicated team committed to providing the best health and service to our customers. With a team formed from passion and deep knowledge in the medical and nutrition field, we pride ourselves as your trusted partner in maintaining and enhancing health.</Paragraph>
                    <Paragraph style={{fontWeight:'bold'}}>Our Mission</Paragraph>
                    <Paragraph> Our mission is to provide everyone with high-quality, safe, and effective products to support the maintenance and improvement of health. We are committed to prioritizing customer satisfaction and health by offering meticulously researched and quality-assured products.</Paragraph>
                    <Paragraph style={{fontWeight:'bold'}}>Our Team</Paragraph>
                    <Paragraph>We take pride in our passionate and experienced team. From healthcare experts to nutrition enthusiasts, each member contributes to our common mission - bringing health to the community.</Paragraph>
                    <Paragraph style={{fontWeight:'bold'}}>Our Values</Paragraph>
                    <List>
                        <ListItem>🔵 Quality: We only provide the highest quality products, certified and quality-assured.</ListItem>
                        <ListItem>🔵 Dedication: Customer satisfaction is our top priority. We are committed to providing the best service and customer care.</ListItem>
                        <ListItem>🔵 Reliability: With an experienced and knowledgeable team, we are your reliable partner in personal health care.</ListItem>
                    </List>
                    <Paragraph style={{fontWeight:'bold'}}>Contact Us</Paragraph>
                    <Paragraph>We are delighted to listen to and support you. Please feel free to contact us if you have any questions or feedback. Our team is always ready to assist you. Join us on the journey of health care and personal development. Thank you for your trust and choosing us.</Paragraph>
                    <Paragraph>If you want to learn more about our products and services, or have any inquiries, don't hesitate to reach out to us through our contact information below. We look forward to hearing from you and serving your health and wellness needs.</Paragraph>
                    <Paragraph>Stay connected with us on social media for the latest updates, health tips, and special offers!</Paragraph>
                    <List>
                        <ListItem>Hotline: (+84) 31419341</ListItem>
                        <ListItem>Email: anhnvgcc200163@fpt.edu.vn</ListItem>
                        <ListItem>Address: Malappuram Dt Kerala</ListItem>
                        <ListItem>Connect us with: <span style={{ color: 'blue', textDecoration: 'underline', fontStyle: 'italic', cursor:'pointer' }}>Facebook</span></ListItem>
                    </List>
                </ContentWrapper>
            </div>
            <FooterComponent />
        </div>
    );
};

export default AboutPage;
