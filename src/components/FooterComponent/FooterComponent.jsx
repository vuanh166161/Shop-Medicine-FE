import React from "react";
import { WrapperFooter, WrapperTextFooter } from "./style";

const FooterComponent = () => {
    return (
        <div>
            {/* Add a placeholder to push content up */}
            <div style={{ marginBottom: "80px" }}>
                {/* Your main content here */}
            </div>
            <WrapperFooter>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <WrapperTextFooter>
                        Our Company
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop:'5px' }}>
                            <span style={{ fontSize: '12px' }}>How It Works</span>
                            <span style={{ fontSize: '12px'  }}>About Us</span>
                            <span style={{ fontSize: '12px' }}>Team</span>
                        </div>
                    </WrapperTextFooter>
                    <WrapperTextFooter>
                        Navigate
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop:'5px' }}>
                            <span style={{ fontSize: '12px' }}>Home</span>
                            <span style={{ fontSize: '12px'  }}>Product</span>
                            <span style={{ fontSize: '12px' }}>Profile</span>
                        </div>
                    </WrapperTextFooter>
                    <WrapperTextFooter>
                        Help Support
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop:'5px' }}>
                            <span style={{ fontSize: '12px' }}>Terms & Conditions</span>
                            <span style={{ fontSize: '12px'  }}>Support Policy</span>
                            <span style={{ fontSize: '12px' }}>FAQs</span>
                        </div>
                    </WrapperTextFooter>
                    <WrapperTextFooter>
                        Contact Us
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop:'5px' }}>
                            <span style={{ fontSize: '12px' }}>Address: Malappuram Dt Kerala</span>
                            <span style={{ fontSize: '12px'  }}>anhnvgcc200163@fpt.edu.vn</span>
                            <span style={{ fontSize: '12px' }}>Hotline: 031419341</span>
                        </div>
                    </WrapperTextFooter>
                </div>
            </WrapperFooter>
        </div>
    );
};

export default FooterComponent;
