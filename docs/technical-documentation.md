# Technical Documentation

## Project Overview

This project is a personal portfolio web application created as the final assignment for the Web Engineering course. The purpose of the application is to present my background, technical skills, projects, and contact information in a professional and interactive way.

## Main Sections

The website includes the following sections:

- Hero section with introduction and call-to-action buttons
- About Me section
- Skills section
- Projects section
- Live GitHub Repositories section
- Contact section

## Core Features

### 1. Theme Toggle
The user can switch between light mode and dark mode. The selected theme is saved in localStorage so it remains available when the page is reopened.

### 2. Reveal-on-Scroll Animation
Sections become visible with a smooth animation when they enter the viewport using IntersectionObserver.

### 3. Personalized Welcome
The visitor can type a name and receive a personalized greeting. The name is stored in localStorage and reused later.

### 4. Project Search and Sorting
The user can filter projects by typing keywords and sort them alphabetically using the provided controls.

### 5. GitHub API Integration
The application fetches repository information dynamically from GitHub using the GitHub API and displays repository cards.

### 6. Contact Form Validation
The contact form checks whether the user entered a valid name, email, and message before showing a success message.

### 7. Back to Top Button
A floating button appears after scrolling down and allows the user to return smoothly to the top of the page.

## File Organization

- `index.html`: main structure of the website
- `css/styles.css`: styling, layout, responsiveness, and animations
- `js/script.js`: interactive functionality and dynamic behavior
- `assets/images/`: project images and visual assets
- `docs/`: project documentation
- `presentation/`: presentation slides and video

## Design Decisions

The design focuses on:
- clean layout
- soft colors
- readable typography
- responsive structure
- modern project cards
- professional presentation

## Challenges

Some challenging parts of the project included:
- organizing interactive features clearly in JavaScript
- making the layout responsive across screen sizes
- improving the site visually without making it too crowded
- integrating the GitHub API in a clean way

## Future Improvements

Possible future improvements include:
- adding a real backend for the contact form
- adding project category filters
- improving accessibility further
- including more portfolio projects
- adding downloadable CV support