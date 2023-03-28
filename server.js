const request = require("request");
const sharp = require("sharp");
const Tesseract = require("tesseract.js");

const captchaUrl = "https://i.ibb.co/jTKYQqP/Captcha-United.png";

// Download the captcha image
request(captchaUrl, { encoding: null }, (err, res, body) => {
  if (err) {
    console.error("Error downloading captcha image:", err);
    return;
  }

  // Preprocess the captcha image using the sharp library
  sharp(body)
    .resize(300) // Resize the image to a reasonable size
    .grayscale() // Convert the image to grayscale
    .normalize() // Enhance the contrast
    .toBuffer((err, processedImage) => {
      if (err) {
        console.error("Error preprocessing captcha image:", err);
        return;
      }

      // Use Tesseract to recognize the characters in the captcha image
      Tesseract.recognize(processedImage)
        .then(({ data: { text } }) => {
          // Return the recognized captcha characters
          console.log("Captcha:", text.trim());
        })
        .catch((err) => {
          console.error("Error recognizing captcha:", err);
        });
    });
});
