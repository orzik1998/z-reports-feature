# Z Reports Implementation Guide

## Overview

This guide provides instructions for integrating the Z reports functionality into the edalem.net CMS. The implementation includes web-based Z reports and PDF generation capabilities for sellers.

## Files Structure

```
/z_reports_implementation/
├── z_reports_list.html      # List view of all Z reports
├── z_report_detail.html     # Detailed view of a specific Z report
├── pdf_generator.js         # PDF generation functionality using Puppeteer
├── server.js                # Express server with API endpoints
└── package.json             # Project dependencies
```

## Installation Instructions

1. Copy the implementation files to your project directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

## Integration Points

### 1. Navigation Menu

Add a new "Reports" menu item in the main navigation alongside Calendar, Suppliers, Price, Users, and Setup.

```html
<li class="nav-item">
    <a class="nav-link" href="/reports">
        <i class="bi bi-file-earmark-text"></i> Reports
    </a>
</li>
```

### 2. API Endpoints

The implementation provides the following API endpoints:

- `GET /` - Z reports list page
- `GET /report/:reportId` - Z report detail page
- `GET /api/reports/pdf/:reportId` - Generate PDF for a specific Z report
- `POST /api/reports/pdf/batch` - Generate PDFs for multiple Z reports

### 3. Database Integration

Connect the implementation to your existing database by modifying the server.js file to fetch real data instead of the sample data.

## Customization Options

### 1. Styling

The implementation uses Bootstrap CSS framework. You can customize the appearance by modifying the CSS styles in the HTML files.

### 2. Data Sources

Update the JavaScript code in both HTML files to fetch real data from your API endpoints instead of using the sample data.

### 3. PDF Template

Modify the PDF generation template in pdf_generator.js to match your branding requirements.

## Testing

1. Access the Z reports list page at http://localhost:3000/
2. Click on "View" to see the detailed Z report
3. Click on "PDF" to generate and download a PDF version of the report

## Troubleshooting

- If PDF generation fails, ensure Puppeteer is properly installed and configured
- If charts don't display, check that Chart.js is properly loaded
- For server errors, check the console logs for detailed error messages

## Support

For additional support or customization, please contact the development team.
