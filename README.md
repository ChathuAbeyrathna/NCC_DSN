# NCC_DSN Project

## Overview  
A web app with a home page, navigation, and links to **Report Problem** and **User Manuals** pages.
**Admin Panel** for issue reporting management & support team management

## Features  

### Home Page  
- Navigation bar, footer, and links to other pages.  

### User Manuals Page  
- Buttons to **Open** and **Download** PDFs.  

### Report Problems Page  
- Issue reporting form with fields for user details, problem info & optional image upload (max 2MB).  
- Success message on submission.  
- Reports sent to configurable emails.

### Admin Panel 
- View reported problem list.  
- Navigate to report list table.  
- Filter reports by date.  
- Download report list as an Excel sheet.  
- Add, edit, and delete support team members.    

## Required Changes  
- **MongoDB**: Update connection in **app.module.ts**.  
- **Firebase**: Modify settings in **environment.ts** & folder in **post.component.ts**.  
- **Email**: Update sender & receiver emails in **post.service.ts**.  
