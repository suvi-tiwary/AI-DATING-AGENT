/**
 * DHUN'26 Event Registration & Pass Generator
 * Matches vsob.in/dhun-26 with Dummy/Non-Mandatory Payment & Instant Entry Card
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const form = document.getElementById('dhun-registration-form');
  const programSelect = document.getElementById('r-program');
  const branchContainer = document.getElementById('group-branch-container');
  const branchSelect = document.getElementById('r-branch');
  const orgContainer = document.getElementById('group-org-container');
  const orgInput = document.getElementById('r-org');
  const photoInput = document.getElementById('r-photo');
  const avatarPreview = document.getElementById('avatar-preview');
  
  const formCardContainer = document.getElementById('form-card-container');
  const successContainer = document.getElementById('success-card-container');
  const submitBtn = document.getElementById('btn-submit-reg');
  const submitText = document.getElementById('btn-submit-text');

  // Pass Card Fields
  const cardRegId = document.getElementById('card-reg-id');
  const cardName = document.getElementById('card-name');
  const cardFather = document.getElementById('card-father');
  const cardCollegeId = document.getElementById('card-college-id');
  const cardProgram = document.getElementById('card-program');
  const cardBranch = document.getElementById('card-branch');
  const cardMobile = document.getElementById('card-mobile');
  const cardSecurityHash = document.getElementById('card-security-hash');
  const qrContainer = document.getElementById('pass-qr-container');
  const welcomeMsg = document.getElementById('success-welcome-msg');

  // Buttons
  const btnDownload = document.getElementById('btn-download-pass');
  const btnPrint = document.getElementById('btn-print-pass');
  const btnGateView = document.getElementById('btn-gate-view');
  const btnRegisterAnother = document.getElementById('btn-register-another');

  // Gate Modal Elements
  const gateModal = document.getElementById('gate-modal');
  const gateModalClose = document.getElementById('gate-modal-close');
  const modalAttendeeName = document.getElementById('modal-attendee-name');
  const modalRegId = document.getElementById('modal-reg-id');
  const modalQrContainer = document.getElementById('modal-qr-container');

  // Lookup Elements
  const findForm = document.getElementById('find-registration-form');
  const findMobile = document.getElementById('f-mobile');
  const findEmail = document.getElementById('f-email');
  const findResultBox = document.getElementById('find-result-box');
  const findResultContent = document.getElementById('find-result-content');

  // Payment Mode Elements
  const modeRadios = document.querySelectorAll('input[name="paymentMode"]');
  const modeInstantLabel = document.getElementById('mode-instant-label');
  const modeDummyLabel = document.getElementById('mode-dummy-label');
  const dummyRefContainer = document.getElementById('dummy-ref-container');

  let uploadedPhotoData = null;
  let currentRegistration = null;

  // Storage key
  const STORAGE_KEY = 'vsob_dhun26_registrations';

  function getStoredRegistrations() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveRegistration(data) {
    const list = getStoredRegistrations();
    list.unshift(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  // Branch options mapping
  const branchMap = {
    'PGDM': ['Marketing & Sales', 'Finance & FinTech', 'HR & Talent Management', 'Operations & Supply Chain', 'Business Analytics'],
    'MBA': ['Marketing', 'Finance', 'Human Resources', 'International Business', 'Information Technology'],
    'BTECH_CSE': ['Computer Science & Engineering (Core)', 'Artificial Intelligence & Machine Learning', 'Data Science & Analytics', 'Cloud Computing & DevOps'],
    'BTECH_AIML': ['Artificial Intelligence & ML', 'Deep Learning & Robotics'],
    'BTECH_DS': ['Data Engineering', 'Big Data Systems'],
    'BTECH_MECH': ['Automotive Engineering', 'Thermal & Design', 'Industrial Robotics'],
    'BTECH_CIVIL': ['Structural Engineering', 'Infrastructure Systems'],
    'BCA': ['Software & Web Development', 'Cyber Security', 'Cloud Technology', 'General Shift'],
    'BBA': ['Marketing & E-Commerce', 'Financial Markets', 'General Management', 'Digital Media'],
    'BPHARMA': ['Pharmaceutics', 'Pharmacology', 'Pharmaceutical Chemistry', 'Clinical Practice'],
    'POLYTECHNIC': ['Mechanical Production', 'Electrical Engineering', 'Civil Engineering', 'Computer Science']
  };

  // Program selection change handler
  programSelect.addEventListener('change', () => {
    const val = programSelect.value;
    if (val === '__other') {
      branchContainer.style.display = 'none';
      orgContainer.style.display = 'block';
      orgInput.focus();
    } else {
      orgContainer.style.display = 'none';
      branchContainer.style.display = 'block';
      
      const branches = branchMap[val] || ['General'];
      branchSelect.innerHTML = '<option value="">Select Branch / Specialisation</option>' + 
        branches.map(b => `<option value="${b}">${b}</option>`).join('');
      
      if (branches.length > 0) {
        branchSelect.value = branches[0];
      }
    }
  });

  // Photo upload preview
  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        uploadedPhotoData = event.target.result;
        avatarPreview.innerHTML = `<img src="${uploadedPhotoData}" style="width:100%;height:100%;object-fit:cover;">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Payment mode toggle
  modeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'dummy') {
        modeDummyLabel.classList.add('active');
        modeInstantLabel.classList.remove('active');
        dummyRefContainer.style.display = 'block';
        submitText.textContent = 'Verify Payment & Register';
      } else {
        modeInstantLabel.classList.add('active');
        modeDummyLabel.classList.remove('active');
        dummyRefContainer.style.display = 'none';
        submitText.textContent = 'Pay ₹200 and register';
      }
    });
  });

  // Form Validation & Registration
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Helper to validate and toggle errors
    function validateField(id, groupId, condition) {
      const group = document.getElementById(groupId);
      if (!condition) {
        group.classList.add('has-error');
        isValid = false;
      } else {
        group.classList.remove('has-error');
      }
    }

    const name = document.getElementById('r-name').value.trim();
    const father = document.getElementById('r-father').value.trim();
    const mobile = document.getElementById('r-mobile').value.trim();
    const email = document.getElementById('r-email').value.trim();
    const collegeId = document.getElementById('r-college-id').value.trim().toUpperCase();
    const program = programSelect.value;
    const branch = (program === '__other') 
      ? (orgInput.value.trim() || 'Guest Attendee') 
      : (branchSelect.value || 'General');

    validateField('r-name', 'group-name', name.length >= 2);
    validateField('r-father', 'group-father', father.length >= 2);
    validateField('r-mobile', 'group-mobile', /^[6-9]\d{9}$/.test(mobile));
    validateField('r-email', 'group-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    validateField('r-college-id', 'group-college-id', collegeId.length >= 2);
    validateField('r-program', 'group-program', program !== '');

    if (!isValid) {
      const firstError = document.querySelector('.field-group.has-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Process submission: Show sleek 0.8s loading then generate card
    submitBtn.disabled = true;
    submitText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Confirming Pass & Generating Card...';

    setTimeout(() => {
      // Generate Unique Registration ID and Security Credentials
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const regId = `DHUN26-VSOB-${randomNum}`;
      const paymentRef = `pay_DHUN_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const securityHash = `AUTH-VSOB-${Math.floor(10000 + Math.random() * 90000)}`;
      const programLabel = programSelect.options[programSelect.selectedIndex]?.text.split('—')[0].trim() || program;

      const regData = {
        regId,
        name,
        father,
        mobile,
        email,
        collegeId,
        program: programLabel,
        branch,
        paymentRef,
        securityHash,
        amount: '₹200 (Paid / Confirmed)',
        photo: uploadedPhotoData,
        date: 'Saturday, 17 October 2026',
        timestamp: new Date().toISOString()
      };

      currentRegistration = regData;
      saveRegistration(regData);

      // Render Card
      renderCard(regData);

      // Trigger Confetti Celebration
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2451b3', '#a9c1ee', '#fbbf24', '#ffffff']
        });
      }

      // Transition to card view
      formCardContainer.style.display = 'none';
      successContainer.classList.add('active');
      successContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

      submitBtn.disabled = false;
      submitText.textContent = 'Pay ₹200 and register';
    }, 800);
  });

  // Render the Generated Event Card
  function renderCard(data) {
    cardRegId.textContent = data.regId;
    cardName.textContent = data.name.toUpperCase();
    cardFather.textContent = data.father;
    cardCollegeId.textContent = data.collegeId;
    cardProgram.textContent = data.program;
    cardBranch.textContent = data.branch;
    cardMobile.textContent = '+91 ' + data.mobile;
    cardSecurityHash.textContent = data.securityHash;

    welcomeMsg.textContent = `Thank you, ${data.name}! Your official verified entry card is issued below.`;

    // Render Scannable QR Code
    qrContainer.innerHTML = '';
    const verifyUrl = `https://vsob.in/dhun-26#verify?id=${data.regId}&name=${encodeURIComponent(data.name)}&college=${encodeURIComponent(data.collegeId)}`;
    
    if (typeof QRCode !== 'undefined') {
      new QRCode(qrContainer, {
        text: verifyUrl,
        width: 100,
        height: 100,
        colorDark: '#0a1630',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      // Fallback clean SVG QR placeholder
      qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(verifyUrl)}" alt="Pass QR Code" style="width:100px;height:100px;">`;
    }

    // Modal elements
    modalAttendeeName.textContent = data.name.toUpperCase();
    modalRegId.textContent = data.regId;
    modalQrContainer.innerHTML = '';
    if (typeof QRCode !== 'undefined') {
      new QRCode(modalQrContainer, {
        text: verifyUrl,
        width: 220,
        height: 220,
        colorDark: '#0a1630',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    } else {
      modalQrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(verifyUrl)}" alt="Pass QR Code" style="width:220px;height:220px;">`;
    }
  }

  // Action: Download Card as PNG
  btnDownload.addEventListener('click', async () => {
    const cardEl = document.getElementById('printable-pass-card');
    if (!cardEl) return;

    btnDownload.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating Image...';

    try {
      if (typeof html2canvas !== 'undefined') {
        const canvas = await html2canvas(cardEl, {
          scale: 3, // Crisp high-definition retina rendering
          backgroundColor: null,
          useCORS: true
        });

        const link = document.createElement('a');
        link.download = `DHUN26_PASS_${currentRegistration?.regId || 'CARD'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } else {
        window.print();
      }
    } catch (err) {
      console.error('Download error:', err);
      window.print();
    } finally {
      btnDownload.innerHTML = '<i class="fa-solid fa-download"></i> Download Pass (PNG)';
    }
  });

  // Action: Print Pass / Save as PDF
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // Action: Show at Gate Full Screen View
  btnGateView.addEventListener('click', () => {
    gateModal.classList.add('active');
  });

  gateModalClose.addEventListener('click', () => {
    gateModal.classList.remove('active');
  });

  gateModal.addEventListener('click', (e) => {
    if (e.target === gateModal) {
      gateModal.classList.remove('active');
    }
  });

  // Action: Register Another Person
  btnRegisterAnother.addEventListener('click', () => {
    form.reset();
    uploadedPhotoData = null;
    avatarPreview.innerHTML = '<i class="fa-solid fa-camera"></i>';
    orgContainer.style.display = 'none';
    branchContainer.style.display = 'block';
    
    // Clear error classes
    document.querySelectorAll('.field-group.has-error').forEach(el => el.classList.remove('has-error'));

    successContainer.classList.remove('active');
    formCardContainer.style.display = 'block';
    formCardContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // "Find my Registration ID" search
  findForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mobile = findMobile.value.trim();
    const email = findEmail.value.trim().toLowerCase();

    if (!mobile || !email) {
      alert('Please enter both your registered Mobile number and Email.');
      return;
    }

    const registrations = getStoredRegistrations();
    const match = registrations.find(r => 
      r.mobile.endsWith(mobile.slice(-10)) && 
      r.email.toLowerCase() === email
    );

    findResultBox.classList.add('active');

    if (match) {
      findResultContent.innerHTML = `
        <div>
          <div style="font-size: 0.75rem; font-weight: 800; color: #16a34a; letter-spacing: 0.05em; text-transform: uppercase;">
            <i class="fa-solid fa-circle-check"></i> Registration Found
          </div>
          <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-navy); margin-top: 0.2rem;">
            ${match.name}
          </div>
          <div style="font-family: var(--font-numeric); font-size: 1rem; font-weight: 700; color: var(--color-copper); margin-top: 0.15rem;">
            ID: ${match.regId}
          </div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.2rem;">
            College ID: ${match.collegeId} · ${match.program}
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <button type="button" id="btn-view-found-card" class="btn-primary" style="padding: 0.6rem 1.15rem; font-size: 0.85rem;">
            <i class="fa-solid fa-id-card"></i> View & Show Pass
          </button>
        </div>
      `;

      document.getElementById('btn-view-found-card').addEventListener('click', () => {
        currentRegistration = match;
        renderCard(match);
        formCardContainer.style.display = 'none';
        successContainer.classList.add('active');
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      findResultContent.innerHTML = `
        <div>
          <div style="font-size: 0.875rem; font-weight: 700; color: var(--color-error);">
            <i class="fa-solid fa-circle-exclamation"></i> No registration found
          </div>
          <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-top: 0.25rem;">
            We couldn't find a registration matching Mobile (+91 ${mobile}) and Email (${email}).
          </div>
        </div>
        <a href="#reg-form-anchor" class="btn-primary" style="padding: 0.6rem 1.15rem; font-size: 0.85rem; text-decoration: none;">
          Register Now
        </a>
      `;
    }
  });

});
