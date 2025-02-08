const button = document.querySelector(".button");
const qrSize = document.querySelector("#qrSize");
let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
const dwnloadButtonContainer = document.getElementById("downloadBtncontainer");



qrText.addEventListener("input", function () {
  if (qrText.value.length > 0 ) {
    qrText.style.borderColor = "#494eea";
  } 
});


qrSize.addEventListener("input", function () {
  let newSize = qrSize.value;

  if (newSize > 500) {
    newSize = 500;
    qrSize.value = 500;
  }


  imgBox.style.width = `${newSize}px`;  
  
});




const qrBGColorSelector = document.getElementById("qrBgColorSelect");
let bgChosenColor =  "ffffff";

qrBGColorSelector.addEventListener("change", function () {
  const selectedColor = qrBGColorSelector.value;
  if (selectedColor === "Choose a color...") {
    qrBGColorSelector.style.borderColor = `#000`;
  } else {
    qrBGColorSelector.style.borderColor = `#${selectedColor}`;
    bgChosenColor = selectedColor;
    qrBGColorSelector.disabled = true;
  }
  
});




const downloadButton = document.getElementById("downloadBtn");

downloadButton.addEventListener("click", function() {
  const qrUrl = qrImg.src;  // Get the QR code URL

  fetch(qrUrl)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qr-code.png";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    })
    .catch(error => console.error("Error fetching image: ", error));
});


const resetButton = document.querySelector(".reset-button");


resetButton.addEventListener('click', function() {
  resetButton.classList.add("clicked");
  
  qrText.value = "";
  qrSize.value = "500";
  qrBGColorSelector.disabled = false;
  qrBGColorSelector.value = "Choose a color...";
  qrBGColorSelector.style.borderColor = "black";
  bgChosenColor = "ffffff";
  button.style.display = "block";
  qrImg.src = "";


  
  //HERE
  imgBox.style.transition = "none";
  imgBox.classList.remove("show-img");

  dwnloadButtonContainer.style.transition = "none";
  dwnloadButtonContainer.classList.remove("show-container");
  




  setTimeout(() => {
    resetButton.classList.remove("clicked");
  }, 400);

});







function generateQR() {
  if (qrText.value.length > 0) {
    let size = qrSize.value || 200;
     // Default to 200px if no size is set

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${qrText.value}&color=000&bgcolor=${bgChosenColor}`;

    imgBox.classList.add("show-img");
    imgBox.style.display = "block";
    dwnloadButtonContainer.classList.add("show-container");
    
    
    button.style.display = "none";
    resetButton.style.display = "block";
    qrBGColorSelector.disabled = true;


    //HERE
    imgBox.style.transition = "height 1s ease-in-out, width 2s ease-in-out, opacity 1s ease-in-out";
    dwnloadButtonContainer.style.transition = "opacity 3s";


    imgBox.classList.add("show-img");
    dwnloadButtonContainer.classList.add("show-container");



  } else {
    qrText.classList.add("error");
   
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);


    qrText.style.borderColor = "red";

  }
}


button.addEventListener("click", function () {
  generateQR();
});


