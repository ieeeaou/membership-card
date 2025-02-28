function generateQRCode(membershipID) {
  const qrCodeContainer = document.getElementById('qrCodeContainer');
  qrCodeContainer.innerHTML = '';

  return new Promise((resolve, reject) => {
      if (membershipID) {
          const today = new Date();
          const nextYear = today.getFullYear() + 1;
          const expiryDate = new Date(nextYear, today.getMonth(), today.getDate());

          const formattedExpiryDate = `${expiryDate.getDate()}/${expiryDate.getMonth() + 1}/${expiryDate.getFullYear()}`;

          document.getElementById('cardExpiryDateBack').textContent = formattedExpiryDate;

          new QRCode(qrCodeContainer, {
              text: membershipID,
              width: 100,
              height: 100,
              colorDark: "#000000",
              colorLight: "#ffffff",
              correctLevel: QRCode.CorrectLevel.H
          });
          resolve();
      } else {
          qrCodeContainer.textContent = 'No QR Code';
          reject(new Error("No Membership ID provided"));
      }
  });
}

  
  document.getElementById('membershipForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const id = document.getElementById('id').value.trim();
    const dob = document.getElementById('dob').value.trim();
    const placeOfBirth = document.getElementById('placeOfBirth').value.trim();
    const student = document.getElementById('student').value.trim();
    const nationality = document.getElementById('nationality').value.trim();
    const address = document.getElementById('address').value.trim();
    const status = document.getElementById('status').value.trim();
    const bloodType = document.getElementById('bloodType').value.trim();
  
    document.getElementById('cardNameFront').textContent = name || '-';
    document.getElementById('cardIDFront').textContent = id || '-';
    document.getElementById('cardEmailFront').textContent = email || '-';
    document.getElementById('cardPhoneFront').textContent = phone || '-';
    document.getElementById('cardDobFront').textContent = dob || '-';
    document.getElementById('cardPlaceOfBirthFront').textContent = placeOfBirth || '-';
  
    document.getElementById('cardStudentBack').textContent = student || '-';
    document.getElementById('cardNationalityBack').textContent = nationality || '-';
    document.getElementById('cardAddressBack').textContent = address || '-';
    document.getElementById('cardStatusBack').textContent = status || '-';
    document.getElementById('cardBloodTypeBack').textContent = bloodType || '-';
  
    generateQRCode(id).then(() => {
      console.log("QR Code generated successfully.");
    }).catch((error) => {
      console.error("Error generating QR Code:", error);
    });
  });


  document.getElementById('downloadButton').addEventListener('click', function () {
    const membershipID = document.getElementById('id').value.trim();
    const memberName = document.getElementById('name').value.trim(); // Get the member's name
  
    generateQRCode(membershipID).then(() => {
      console.log("QR Code updated successfully.");
  
      // Use html2canvas to capture the card frame
      html2canvas(document.querySelector("#membershipCard"), {
        scale: 2, // Increase resolution for better quality
        logging: true, // Enable logging for debugging
        useCORS: true, // Handle cross-origin images if any
        allowTaint: false // Prevent tainted canvas errors
      }).then(canvas => {
        console.log("Canvas captured successfully.");
  
        const imgData = canvas.toDataURL('image/png');
  
        const link = document.createElement('a');
        link.href = imgData;
  
        const fileName = memberName ? `${memberName.replace(/\s+/g, '_')}.png` : 'membership_card.png';
        link.download = fileName; // Use the member's name as the filename
  
        link.click(); // Trigger the download
      }).catch((error) => {
        console.error("Error capturing canvas with html2canvas:", error);
      });
    }).catch((error) => {
      console.error("Error during download:", error);
    });
  });


// Check if the user is logged in
if (sessionStorage.getItem('loggedIn') !== 'true') {
  // If not logged in, redirect back to login page
  window.location.href = 'index.html';
}

// Optional: Clear the session on page unload (optional if you want to force re-login every time)
window.addEventListener('beforeunload', function() {
  sessionStorage.removeItem('loggedIn');
});

// Back button to clear session and go back
const backButton = document.createElement('button');
backButton.textContent = 'Back to Login';
backButton.onclick = function() {
  sessionStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
};
document.body.appendChild(backButton);


document.getElementById('refreshButton').addEventListener('click', function() {
  // Clear the form
  document.getElementById('membershipForm').reset();

  // Clear the card content
  const fields = [
      'cardNameFront', 'cardIDFront', 'cardEmailFront', 'cardPhoneFront',
      'cardDobFront', 'cardPlaceOfBirthFront', 'cardStudentBack',
      'cardNationalityBack', 'cardAddressBack', 'cardStatusBack',
      'cardBloodTypeBack', 'cardExpiryDateBack'
  ];

  fields.forEach(function(field) {
      document.getElementById(field).textContent = '-';
  });

  // Clear QR code (if any)
  const qrCodeContainer = document.getElementById('qrCodeContainer');
  qrCodeContainer.innerHTML = '';
});
