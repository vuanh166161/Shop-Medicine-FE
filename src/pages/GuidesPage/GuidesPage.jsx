import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import { Image, ImageContainer, ContentWrapper, List, ListItem, Paragraph, Title, WrapperDoctorList, WrapperDoctor, Avatar, DoctorName, CenteredText, Wrapper, Text, TextGuaranteeCommitment } from "./style";

const GuidesPage = () => {
    return (
        <div>
            <div style={{ padding: '0 120px' }}>
                <SliderComponent arrSlider={[slider1, slider2, slider3]} />
            </div>
            <div>
                <ContentWrapper style={{ marginTop: '20px' }}>
                    <Title>User Guide</Title>
                    <Paragraph>Welcome to our user guide page! Below are the basic instructions to help you easily shop on our website.</Paragraph>
                    <Paragraph style={{ fontWeight: 'bold', fontSize: '16px' }}>Shopping</Paragraph>
                    <List>
                        <ListItem>1. Search for Products</ListItem>
                        <ListItem>🔵 Use the search bar on the homepage or product categories to find the products you want to buy.</ListItem>
                        <ListItem>🔵 You can also browse through the list of categories to explore different products.</ListItem>
                        <ListItem>2. View Product Details</ListItem>
                        <ListItem>🔵 When you find a product you're interested in, click on it to view detailed information.</ListItem>
                        <ListItem>🔵 On the product detail page, you can see the description, price, images, and other information about the product.</ListItem>
                        <ListItem>3. Add to Cart</ListItem>
                        <ListItem>🔵 If you want to purchase a product, click on the "Add to Cart" button.</ListItem>
                        <ListItem>🔵 The quantity of the product in your cart will be displayed, and you can view your cart at any time by clicking on the cart icon in the top right corner of the website.</ListItem>
                    </List>
                    <Paragraph> We take pride in being a reliable destination for purchasing medicines and dietary supplements. Our services and commitments aim to bring the best to our users. Quick and convenient services. Doorstep delivery in a short time. Easy-to-use online ordering system, saving you time. Diverse and quality products. We offer a variety of medicines and dietary supplements, from vitamins to medicinal drugs. All products are tested and meet safety standards. Safety is always our top priority. Come to us to experience the convenience and reliability of purchasing medicines and dietary supplements!</Paragraph>
                </ContentWrapper>
                <ContentWrapper style={{ backgroundColor: '#fff' }}>
                    <Paragraph style={{ fontWeight: 'bold', fontSize: '16px' }}>For Registered Users</Paragraph>
                    <List>
                        <ListItem>1. Log In</ListItem>
                        <ListItem>🔵 If you already have an account, log in by clicking on the "Log In" button at the top right of the website.</ListItem>
                        <ListItem>🔵 Enter your email and password to log in to your account.</ListItem>
                        <ListItem>2. Manage Personal Information</ListItem>
                        <ListItem>🔵 Once logged in, you can manage your personal information such as shipping address, payment information, and order history.</ListItem>
                    </List>
                    <Paragraph style={{ fontWeight: 'bold'}}>For New Users</Paragraph>
                    <List>
                        <ListItem>1. Register for a New Account</ListItem>
                        <ListItem>🔵 If you don't have an account yet, you can register for a new account by clicking on the "Register" button at the top right of the website.</ListItem>
                        <ListItem>🔵 Fill in your personal information in the registration form and click on the "Register" button.</ListItem>
                    </List>
                </ContentWrapper>
            </div>

            <Wrapper>

            </Wrapper>

            <FooterComponent />
        </div>
    );
};

export default GuidesPage;
