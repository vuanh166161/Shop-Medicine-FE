import styled from "styled-components";
import ButtonCom from "../../components/Button/ButtonCom";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    font-size: 14px;
    margin-top: 10px;
`
export const WrapperButtonShowAll = styled(ButtonCom)`
&:hover {
    color: #fff;
    background: #76b852;
    span {
        color: #fff;
    }
}
width: 100%;
text-align: center;
cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`
export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;
`
