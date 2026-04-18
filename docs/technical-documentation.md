# Technical Documentation

## Project Overview

This project is a personal portfolio website developed for Assignment 2. It is based on the Assignment 1 portfolio and enhanced with interactive features using JavaScript, CSS transitions, and improved user feedback.

The main goal of the project is to present personal information, skills, projects, and contact details in a clear and interactive way.

## Project Structure

The project follows a structured folder organization:

assignment-2/
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

## File Descriptions

### 1. index.html

This file contains the structure of the website. It includes:

* Navigation bar
* Hero section
* About section
* Skills section
* Projects section
* Contact section

It also includes interactive elements such as:

* Theme toggle button
* Project search input
* Contact form

### 2. css/styles.css

This file is responsible for the design and layout of the website. It includes:

* Color variables and theme styles
* Light and dark mode styling
* Layout and spacing
* Typography
* Buttons and cards
* Hover effects
* Responsive design
* Animations (reveal-on-scroll, transitions)
* Styles for success and error messages

### 3. js/script.js

This file handles all interactive and dynamic functionality.

Main features implemented:

* Reveal elements on scroll using IntersectionObserver
* Theme toggle (light/dark mode)
* Saving theme preference using localStorage
* Live filtering of projects based on user input
* Contact form validation
* Displaying success and error messages

## Dynamic Features

### 1. Theme Toggle

Users can switch between light mode and dark mode using a button.
The selected theme is saved using localStorage so it persists after refreshing the page.

### 2. Live Project Search

The Projects section includes a search input.
As the user types, JavaScript filters the project cards based on their title and tags.

This makes the page dynamic because content changes instantly based on user input.

### 3. Contact Form Validation

The contact form validates user input by checking:

* All fields are filled
* Email format is correct
* Message length is sufficient

If validation fails, an error message is displayed.
If validation succeeds, a success message is shown.

## Error Handling and User Feedback

The system provides clear feedback to the user:

* Error message for empty form fields
* Error message for invalid email
* Error message for short message
* Success message after valid form submission
* Empty-state message when no projects match the search

This improves usability and helps guide the user.

## Animation and Transitions

The project uses simple animations to improve user experience:

* Reveal-on-scroll animation for sections
* Hover effects on buttons and cards
* Smooth transitions for UI elements
* Animated feedback messages

These animations are lightweight and do not affect performance.

## Accessibility and Usability

Basic accessibility and usability improvements include:

* Clear labels for form inputs
* Readable typography and color contrast
* Responsive design for different screen sizes
* aria-live attribute for status messages
* Buttons and links are easy to interact with

## How to Run the Project

1. Open the project folder
2. Open `index.html` in a browser

Optional:
Use Live Server in VS Code for better development experience.

## Assignment 3 Additions

### 1. Personalized Welcome Feature
A new input field allows users to enter their name.  
The name is stored in localStorage and displayed dynamically as a welcome message.

### 2. Project Sorting Feature
A dropdown menu allows users to sort projects:
- Default order
- Alphabetical (A–Z)
- Reverse alphabetical (Z–A)

This is implemented using JavaScript array sorting and DOM updates.

### 3. GitHub API Integration
The portfolio fetches repositories from GitHub using:

https://api.github.com/users/ShahadAlmatrudi/repos

The data is displayed dynamically as project cards.

### 4. Dynamic UI Rendering
GitHub repositories are converted into styled cards using JavaScript and inserted into the DOM.

### 5. Error Handling
If the API request fails:
- an error message is displayed
- the UI remains stable

### 6. UI Consistency
Dynamic GitHub cards reuse the same CSS classes as static project cards to maintain a consistent design.

## Future Improvements

- Connect contact form to backend
- Add project filtering by category
- Improve accessibility (ARIA roles)
- Deploy using GitHub Pages