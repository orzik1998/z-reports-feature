const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Generate PDF from Z Report HTML
 * @param {string} reportId - The ID of the Z report
 * @param {string} sellerId - The ID of the seller
 * @param {string} dateRange - The date range for the report
 * @returns {Promise<string>} - Path to the generated PDF file
 */
async function generateZReportPDF(reportId, sellerId, dateRange) {
    try {
        // Create output directory if it doesn't exist
        const outputDir = path.join(__dirname, 'pdf_reports');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Launch browser
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set viewport to A4 size
        await page.setViewport({
            width: 1240,
            height: 1754,
            deviceScaleFactor: 1
        });

        // Load the HTML template
        const htmlPath = path.join(__dirname, 'z_report_detail.html');
        await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

        // Customize the report with specific data if needed
        await page.evaluate((reportId, sellerId, dateRange) => {
            // Update report ID
            document.querySelector('h3.mb-0').textContent = `Z Report: ${reportId}`;
            
            // Update breadcrumb
            const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
            if (breadcrumbItems.length >= 3) {
                breadcrumbItems[2].textContent = reportId;
            }
            
            // Update seller info if needed
            const sellerInfo = document.querySelector('.report-info-item:first-child');
            if (sellerInfo && sellerId) {
                const sellerName = sellerId === '411' ? 'Orzik' : 'orzik2';
                sellerInfo.innerHTML = `<strong>Seller:</strong> ${sellerName} (ID: ${sellerId})`;
            }
            
            // Update date range if needed
            if (dateRange) {
                const dateRangeElement = document.querySelector('.report-info-item:nth-child(2)');
                if (dateRangeElement) {
                    dateRangeElement.innerHTML = `<strong>Date Range:</strong> ${dateRange}`;
                }
            }
            
            // Update footer
            const footerElements = document.querySelectorAll('.footer-section p');
            if (footerElements.length >= 1) {
                footerElements[0].textContent = `Report ID: ${reportId}`;
            }
            
        }, reportId, sellerId, dateRange);

        // Generate PDF
        const pdfPath = path.join(outputDir, `${reportId}.pdf`);
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            },
            displayHeaderFooter: true,
            headerTemplate: `
                <div style="width: 100%; font-size: 10px; padding: 5px 20px; text-align: center; border-bottom: 1px solid #ddd;">
                    <span>Edalem Z Report</span>
                </div>
            `,
            footerTemplate: `
                <div style="width: 100%; font-size: 10px; padding: 5px 20px; text-align: center; border-top: 1px solid #ddd;">
                    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
                </div>
            `
        });

        await browser.close();
        
        console.log(`PDF generated successfully: ${pdfPath}`);
        return pdfPath;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

/**
 * Generate batch of Z Reports PDFs
 * @param {Array} reports - Array of report objects with id, sellerId, and dateRange
 * @returns {Promise<Array>} - Array of paths to generated PDF files
 */
async function generateBatchZReportsPDFs(reports) {
    const results = [];
    
    for (const report of reports) {
        try {
            const pdfPath = await generateZReportPDF(
                report.id,
                report.sellerId,
                report.dateRange
            );
            results.push({
                id: report.id,
                path: pdfPath,
                success: true
            });
        } catch (error) {
            results.push({
                id: report.id,
                error: error.message,
                success: false
            });
        }
    }
    
    return results;
}

// Example usage
if (require.main === module) {
    // Sample reports data
    const sampleReports = [
        {
            id: 'ZR-001',
            sellerId: '411',
            dateRange: '01/04/2025 - 01/04/2025'
        },
        {
            id: 'ZR-002',
            sellerId: '412',
            dateRange: '01/04/2025 - 01/04/2025'
        }
    ];
    
    // Generate PDFs for sample reports
    generateBatchZReportsPDFs(sampleReports)
        .then(results => {
            console.log('Batch PDF generation completed:');
            console.log(JSON.stringify(results, null, 2));
        })
        .catch(error => {
            console.error('Batch PDF generation failed:', error);
        });
}

module.exports = {
    generateZReportPDF,
    generateBatchZReportsPDFs
};
