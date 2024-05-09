
// styles.js
const styles = `
  /* CSS styles */
  /* Reset */
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, dl, dt, dd, ol, nav ul, nav li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after, q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Typography */
  a {
    text-decoration: none;
  }

  h1 {
    font-size: 3em;
    text-align: center;
    color: #fff; /* Đổi màu chữ thành màu đen */
    font-weight: 100;
    text-transform: capitalize;
    letter-spacing: 4px;
    font-family: 'Roboto', sans-serif;
  }

  /* Main */
  .main-w3layouts {
    padding: 3em 0 1em;
    background-color: #76b852; /* Đổi màu nền */
    height: 90.8vh; /* Chiếm toàn bộ chiều cao của màn hình */
  }

  .main-agileinfo {
    width: 35%;
    margin: 3em auto;
    background: rgba(0, 0, 0, 0.18);
    background-size: cover;
  }

  .agileits-top {
    padding: 3em;
  }

  input[type="text"], input[type="email"], input[type="password"] {
    font-size: 0.9em;
    color: #333; /* Đổi màu chữ thành màu đen */
    font-weight: 100;
    width: 94.5%;
    display: block;
    border: none;
    padding: 0.8em;
    border: solid 1px rgba(255, 255, 255, 0.37);
    transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, #fff 4%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #fff 4%);
    background-position: -800px 0;
    background-size: 100%;
    background-repeat: no-repeat;
    color: #333; /* Đổi màu chữ thành màu đen */
    font-family: 'Roboto', sans-serif;
  }

  input[type="submit"] {
    font-size: .9em;
    color: #fff;
    background: #76b852;
    outline: none;
    border: 1px solid #76b852;
    cursor: pointer;
    padding: 0.9em;
    appearance: none;
    width: 100%;
    margin: 2em 0;
    letter-spacing: 4px;
  }

  input[type="submit"]:hover {
    transition: .5s all;
    background: #8DC26F;
  }

  .agileits-top p {
    font-size: 1em;
    color: #333; /* Đổi màu chữ thành màu đen */
    text-align: center;
    letter-spacing: 1px;
    font-weight: 300;
  }

  .agileits-top p a {
    color: #333; /* Đổi màu chữ thành màu đen */
    transition: .5s all;
    font-weight: 400;
  }

  .agileits-top p a:hover {
    color: #fff;
  }

  /* Checkbox */
  .wthree-text label {
    font-size: 0.9em;
    color: #333; /* Đổi màu chữ thành màu đen */
    font-weight: 200;
    cursor: pointer;
    position: relative;
  }

  input.checkbox {
    background: #8DC26F;
    cursor: pointer;
    width: 1.2em;
    height: 1.2em;
  }

  input.checkbox:before {
    content: "";
    position: absolute;
    width: 1.2em;
    height: 1.2em;
    background: inherit;
    cursor: pointer;
  }

  input.checkbox:after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    z-index: 1;
    width: 1.2em;
    height: 1.2em;
    border: 1px solid #fff;
    transition: .4s ease-in-out;
    -webkit-transition: .4s ease-in-out;
    -moz-transition: .4s ease-in-out;
    -o-transition: .4s ease-in-out;
  }

  input[type=checkbox]:checked:checked:after {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    height: .5em;
    border-color: #fff;
    border-top-color: transparent;
    border-right-color: transparent;
  }

  /* // Checkbox */
  .colorlibcopy-agile {
    margin-top: 2em;
    text-align: center;
  }

  .colorlibcopy-agile p {
    font-size: .9em;
    color: #fff; /* Đổi màu chữ thành màu trắng */
    line-height: 1.8em;
    letter-spacing: 1px;
    font-weight: 100;
  }

  .colorlibcopy-agile p a {
    color: #fff; /* Đổi màu chữ thành màu trắng */
    text-decoration: none;
    transition: .5s all;
    font-weight: 400;
  }


  /* //typography */
  /* Button */
  button {
    background: #76b852;
    color: #FFF; /* Đổi màu chữ thành màu trắng */
    border: none;
    padding: 10px 20px;
    font-size: 0.9em;
    font-weight: 100;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    -ms-transition: 0.5s all;
  }

  button:hover {
    background: #8DC26F;
    color: #FFF; /* Đổi màu chữ thành màu trắng */
  }

  /* //Button */
  /* agileits */
  .agile {
    font-size: 0.9em;
    color: #fff; /* Đổi màu chữ thành màu trắng */
    background: #333;
    padding: 1em 0;
    text-align: center;
  }

  .agile p {
    font-size: 1em;
    color: #fff; /* Đổi màu chữ thành màu trắng */
    letter-spacing: 1px;
    font-weight: 400;
  }

  .agile p a {
    color: #CAE6C0;
    transition: .5s all;
    font-weight: 600;
  }

  .agile p a:hover {
    color: #8DC26F; /* Đổi màu chữ thành màu trắng */
  }

  @keyframes square {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-700px) rotate(600deg);
    }
  }

  @-webkit-keyframes square {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-700px) rotate(600deg);
    }
  }

  @-moz-keyframes square {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-700px) rotate(600deg);
    }
  }

  @-o-keyframes square {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-700px) rotate(600deg);
    }
  }

  @-ms-keyframes square {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-700px) rotate(600deg);
    }
  }

  .colorlib-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    animation: square 20s infinite;
    transition-timing-function: linear;
    border-radius: 50%;
  }

  .colorlib-bubbles li:nth-child(1) {
    left: 10%;
  }
  
  .error-message {
    color: red;
    font-size: 0.8em;
    margin-top: 5px;
    display: none; /* Mặc định ẩn đi */
}

.error-message.show {
    display: block; /* Hiển thị nếu có lỗi */
}
  /* Add more styles as needed */
`;

// Create style element and append to head
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);
