# Shahad Almatrudi Portfolio - Assignment 3

This project is my personal portfolio website for Assignment 3. It builds on Assignment 2 by adding more dynamic features, API integration, and improved user interaction.

---

## Features

### From Assignment 2

* Responsive portfolio design
* Dark/light theme toggle (saved using localStorage)
* Live project search filtering
* Contact form validation with user feedback
* Reveal-on-scroll animations

### New in Assignment 3

* Personalized welcome message (user input + localStorage)
* Project sorting (Default, A–Z, Z–A)
* GitHub API integration (dynamic repository display)
* Improved UI consistency for dynamic content

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* localStorage API
* Fetch API (GitHub API)
* Google Fonts
* Devicon icons

---

## Folder Structure

assignment-3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore

---

## How to Run

1. Open the project folder
2. Open `index.html` in a browser
3. (Optional) Use Live Server in VS Code

---

## Dynamic Features Explanation

### 1. Personalized Welcome

Users can enter their name, which is saved in localStorage and displayed as a welcome message.

### 2. Project Sorting

Projects can be sorted using a dropdown menu:

* Default order
* Alphabetical (A–Z)
* Reverse alphabetical (Z–A)

### 3. GitHub API Integration

Repositories are fetched dynamically from GitHub using the Fetch API and displayed as styled project cards.

---

## Error Handling

* API error message if GitHub fails
* Empty state message for project search
* Form validation errors with user feedback

---

## Future Improvements

* Connect contact form to a real backend
* Add filtering by project category
* Improve accessibility (ARIA roles)
* Deploy using GitHub Pages

---

## Author

Shahad Almatrudi
Software Engineering Student
