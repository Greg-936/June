/*
  ============================================================
  TUTOR NOTE — JavaScript File Structure
  ============================================================
  We split the JS into clear sections:
    1. Mobile Navigation — hamburger menu toggle
    2. Project Filtering — show/hide cards by category
    3. Contact Form — validation + localStorage save
    4. Dashboard — read from localStorage + render table
    5. Utilities — small helper functions

  Each section runs only when its target elements exist on the page,
  so this single file can be safely loaded on all pages.
  ============================================================
*/


/* ============================================================
   1. MOBILE NAVIGATION
   ============================================================ */

/*
  TUTOR NOTE — DOMContentLoaded
  We wrap everything in this event so the JS runs only after the HTML
  has been fully parsed. Without it, getElementById might return null.
*/
document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile nav toggle --- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      /*
        TUTOR NOTE — Toggling Classes
        classList.toggle('open') adds 'open' if it's absent, removes it if present.
        CSS then uses .open to show/hide the menu and animate the hamburger icon.
      */
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });

    /* Close the menu when a nav link is clicked (good UX on mobile) */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }


  /* ============================================================
     2. PROJECT FILTERING
     ============================================================ */

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('#projectsGrid .card');

  if (filterButtons.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {

        /* Remove .active from all buttons, then add to clicked one */
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        /*
          TUTOR NOTE — data-* Attributes
          dataset.filter reads the data-filter="all" attribute.
          We compare it against each card's data-category attribute.
          This keeps logic out of HTML — the data is in the markup,
          the behaviour is in JavaScript.
        */
        const filter = btn.dataset.filter;

        projectCards.forEach(function (card) {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }


  /* ============================================================
     3. CONTACT FORM — Validation + LocalStorage Save
     ============================================================ */

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      /*
        TUTOR NOTE — Preventing Default Behaviour
        Forms normally reload the page on submit.
        event.preventDefault() stops that so we can handle it ourselves.
      */
      event.preventDefault();

      /* Collect field values */
      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      /* Run validation — stop if any field is invalid */
      const isValid = validateForm(name, email, subject, message);
      if (!isValid) return;

      /* Build a submission object */
      const submission = {
        id:        Date.now(),         // unique ID from timestamp
        name,
        email,
        subject,
        message,
        date:      new Date().toLocaleString(),
        unread:    true,
      };

      /* Save to localStorage */
      saveSubmission(submission);

      /* Reset the form and show a success message */
      contactForm.reset();
      clearFieldErrors();
      const successEl = document.getElementById('formSuccess');
      if (successEl) {
        successEl.hidden = false;
        /* Auto-hide the success banner after 5 seconds */
        setTimeout(() => { successEl.hidden = true; }, 5000);
      }
    });
  }


  /* ============================================================
     4. DASHBOARD — Read from LocalStorage + Render Table
     ============================================================ */

  const tableWrapper   = document.getElementById('tableWrapper');
  const emptyState     = document.getElementById('emptyState');
  const submissionsBody = document.getElementById('submissionsBody');

  /* Only run dashboard logic if we're on the dashboard page */
  if (submissionsBody) {
    renderDashboard();

    /* "Add Sample Data" button */
    const addSampleBtn = document.getElementById('addSampleBtn');
    if (addSampleBtn) {
      addSampleBtn.addEventListener('click', function () {
        addSampleData();
        renderDashboard();
      });
    }

    /* "Clear All" button */
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', function () {
        if (confirm('Delete all submissions? This cannot be undone.')) {
          localStorage.removeItem('portfolioSubmissions');
          renderDashboard();
        }
      });
    }
  }

}); /* end DOMContentLoaded */


/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

/*
  TUTOR NOTE — Why Separate Functions?
  Moving logic into named functions makes code:
    • Easier to read (functions describe intent in plain English)
    • Easier to test (you can call each function independently)
    • Easier to reuse (renderDashboard can be called from multiple places)
*/

/* ----- Form Validation ----- */
function validateForm(name, email, subject, message) {
  /*
    TUTOR NOTE — Simple Validation Strategy
    We validate each field in turn, show an error message under the
    offending input, and return false to stop form submission.
    We use a flag (isValid) to show ALL errors at once — better UX
    than stopping at the first error.
  */
  let isValid = true;

  /* Name: must not be empty */
  if (!name) {
    showFieldError('name', 'nameError', 'Please enter your full name.');
    isValid = false;
  } else if (name.length < 2) {
    showFieldError('name', 'nameError', 'Name must be at least 2 characters.');
    isValid = false;
  } else {
    clearFieldError('name', 'nameError');
  }

  /* Email: basic regex check */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    showFieldError('email', 'emailError', 'Please enter your email address.');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showFieldError('email', 'emailError', 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearFieldError('email', 'emailError');
  }

  /* Subject: must not be empty */
  if (!subject) {
    showFieldError('subject', 'subjectError', 'Please enter a subject.');
    isValid = false;
  } else {
    clearFieldError('subject', 'subjectError');
  }

  /* Message: at least 20 characters */
  if (!message) {
    showFieldError('message', 'messageError', 'Please enter your message.');
    isValid = false;
  } else if (message.length < 20) {
    showFieldError('message', 'messageError', 'Message must be at least 20 characters.');
    isValid = false;
  } else {
    clearFieldError('message', 'messageError');
  }

  return isValid;
}

/* Show an error message under a field */
function showFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add('error');
  if (error) error.textContent = message;
}

/* Remove the error state from a field */
function clearFieldError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.remove('error');
  if (error) error.textContent = '';
}

/* Clear all field errors at once */
function clearFieldErrors() {
  ['name', 'email', 'subject', 'message'].forEach(function (id) {
    clearFieldError(id, id + 'Error');
  });
}


/* ----- LocalStorage Helpers ----- */

/* Read all submissions from localStorage */
function getSubmissions() {
  /*
    TUTOR NOTE — localStorage
    localStorage stores strings only. We use JSON.parse and JSON.stringify
    to convert between JavaScript objects and the stored string format.
    If the key doesn't exist yet, we return an empty array as a safe default.
  */
  const raw = localStorage.getItem('portfolioSubmissions');
  return raw ? JSON.parse(raw) : [];
}

/* Save a new submission to localStorage */
function saveSubmission(submission) {
  const all = getSubmissions();
  all.unshift(submission); /* unshift adds to the front — newest first */
  localStorage.setItem('portfolioSubmissions', JSON.stringify(all));
}

/* Delete one submission by its id */
function deleteSubmission(id) {
  const filtered = getSubmissions().filter(s => s.id !== id);
  localStorage.setItem('portfolioSubmissions', JSON.stringify(filtered));
}

/* Mark all submissions as read */
function markAllRead() {
  const all = getSubmissions().map(s => ({ ...s, unread: false }));
  localStorage.setItem('portfolioSubmissions', JSON.stringify(all));
}


/* ----- Dashboard Rendering ----- */

function renderDashboard() {
  const tableWrapper    = document.getElementById('tableWrapper');
  const emptyState      = document.getElementById('emptyState');
  const submissionsBody = document.getElementById('submissionsBody');

  if (!submissionsBody) return;

  const submissions = getSubmissions();

  /* Update stat cards */
  const today = new Date().toLocaleDateString();
  const todayCount  = submissions.filter(s => s.date.startsWith(today)).length;
  const unreadCount = submissions.filter(s => s.unread).length;

  setTextContent('statTotal',  submissions.length);
  setTextContent('statToday',  todayCount);
  setTextContent('statUnread', unreadCount);

  if (submissions.length === 0) {
    /* Show empty state, hide table */
    if (emptyState)    emptyState.hidden = false;
    if (tableWrapper)  tableWrapper.hidden = true;
    return;
  }

  /* Hide empty state, show table */
  if (emptyState)    emptyState.hidden = true;
  if (tableWrapper)  tableWrapper.hidden = false;

  /* Build table rows */
  submissionsBody.innerHTML = ''; /* Clear existing rows first */

  submissions.forEach(function (s, index) {
    /*
      TUTOR NOTE — Creating Elements Programmatically
      Instead of string concatenation (fragile, XSS-risky),
      we use document.createElement and set textContent.
      textContent escapes HTML characters, so user input can't inject scripts.
    */
    const tr = document.createElement('tr');
    if (s.unread) tr.classList.add('row-unread');

    tr.appendChild(makeCell(index + 1));
    tr.appendChild(makeCell(s.name));
    tr.appendChild(makeCell(s.email));
    tr.appendChild(makeCell(s.subject));

    /* Message cell: truncated with a title tooltip showing the full text */
    const msgTd = makeCell(s.message);
    msgTd.classList.add('msg-cell');
    msgTd.title = s.message;
    tr.appendChild(msgTd);

    tr.appendChild(makeCell(s.date));

    /* Delete button cell */
    const actionTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function () {
      deleteSubmission(s.id);
      renderDashboard();
    });
    actionTd.appendChild(deleteBtn);
    tr.appendChild(actionTd);

    submissionsBody.appendChild(tr);
  });

  /* Mark everything as read now that the user has seen the dashboard */
  markAllRead();
}

/* Create a <td> with text content */
function makeCell(text) {
  const td = document.createElement('td');
  td.textContent = text;
  return td;
}

/* Safely set text content of an element */
function setTextContent(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}


/* ----- Sample Data for the Dashboard ----- */

function addSampleData() {
  /*
    TUTOR NOTE — Sample Data
    This lets you see the dashboard populated without filling out
    the contact form. It saves three realistic fake submissions.
  */
  const samples = [
    {
      id:      Date.now() - 3000,
      name:    'Sarah Chen',
      email:   'sarah.chen@example.com',
      subject: 'Freelance project inquiry',
      message: 'Hi Alex, I found your portfolio and I am really impressed with your work on Task Manager Pro. We are looking for a frontend developer to help redesign our internal dashboard. Would love to chat!',
      date:    new Date().toLocaleString(),
      unread:  true,
    },
    {
      id:      Date.now() - 2000,
      name:    'Marcus Williams',
      email:   'marcus@creativestudio.io',
      subject: 'Full-time role at Creative Studio',
      message: 'Hello! We are a growing design studio hiring a frontend developer. Your portfolio really stood out — especially the Sierra Design Studio project. Would you be open to a quick call this week?',
      date:    new Date(Date.now() - 86400000).toLocaleString(),
      unread:  true,
    },
    {
      id:      Date.now() - 1000,
      name:    'Priya Nair',
      email:   'priya.nair@startup.co',
      subject: 'Question about your CSS Gradient Generator',
      message: 'Hi! I came across your CSS Gradient Generator tool and it saved me so much time today. I noticed a small bug when using radial gradients on Safari — would you be open to a PR? Thanks for building it!',
      date:    new Date(Date.now() - 172800000).toLocaleString(),
      unread:  false,
    },
  ];

  const existing = getSubmissions();
  const merged   = [...samples, ...existing];
  localStorage.setItem('portfolioSubmissions', JSON.stringify(merged));
}
