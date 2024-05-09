import styled from "styled-components";

export const SliderContainer = styled.div`
  padding: 0 120px; /* Khoảng cách 2 bên */
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 600px; /* Chiều cao cố định */
//   margin: 0 10px; /* Khoảng cách giữa các hình ảnh */
`;
export const ContentWrapper = styled.div`
  padding: 20px 120px; /* Khoảng cách 2 bên và khoảng cách từ trên xuống */
  color: #333; /* Màu chữ */
  background-color: #ccc;
`;

export const Title = styled.h1`
color: black;
  font-size: 24px; /* Kích thước chữ */
  font-weight: bold; /* Độ đậm của chữ */
  margin-bottom: 10px; /* Khoảng cách từ tiêu đề xuống đoạn văn */
`;

export const Paragraph = styled.p`
  font-size: 16px; /* Kích thước chữ */
  line-height: 1.5; /* Khoảng cách giữa các dòng */
  margin-bottom: 20px; /* Khoảng cách từ đoạn văn xuống danh sách */
`;

export const List = styled.ul`
  list-style-type: disc; /* Kiểu dấu đầu dòng */
  padding-left: 40px; /* Khoảng cách từ trái sang phải */
`;

export const ListItem = styled.li`
  font-size: 16px; /* Kích thước chữ */
  line-height: 1.5; /* Khoảng cách giữa các dòng */
  margin-bottom: 10px; /* Khoảng cách giữa các mục */
  list-style-type: none;
`;
// export const ImageContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 0 120px;
// `;

// export const Image = styled.img`
//   width: 20%; /* Kích thước hình ảnh */
//   height: auto;
// `;

export const WrapperDoctorList = styled.div`
  padding: 30px 120px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;


export const WrapperDoctor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  width: calc(25% - 10px); /* Sử dụng calc() để tính toán chiều rộng chính xác cho mỗi phần tử */
  margin-bottom: 20px; /* Thêm khoảng cách dưới cho mỗi phần tử */

  @media screen and (max-width: 768px) {
    margin-bottom: 10px; /* Điều chỉnh khoảng cách dưới khi màn hình thu nhỏ */
  }
`;

export const Avatar = styled.img`
  width: 150px; /* Tăng kích thước của avatar */
  height: 150px;
  border-radius: 40%;
`;

export const DoctorName = styled.div`
  margin-top: 10px;
  text-align: center;
  width: 100%; /* Đảm bảo tên bác sĩ căn giữa trong phần tử */
`;

export const CenteredText = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px; /* Khoảng cách dưới */
  font-weight: bold;
  font-size: 24px;
`;

export const Wrapper = styled.div`
  padding: 30px 120px; /* Padding on top and bottom, adjust as needed */
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const Image = styled.img`
  width: 200px; /* Initial width, adjust as needed */
  height: auto; /* Maintain aspect ratio */
`;

export const Text = styled.div`
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px; /* Adjust as needed */
`;

export const TextGuaranteeCommitment = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px; /* Adjust as needed */
`;