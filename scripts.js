// Update the scripts.js file to add direct PDF links
document.addEventListener('DOMContentLoaded', function() {
    // Handle print buttons to open PDF template in new window
    const printButtons = document.querySelectorAll('.print-btn, button:contains("Print")');
    printButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Get payment ID or use default
            let paymentId = 'PAY-001';
            if (this.hasAttribute('data-payment-id')) {
                paymentId = this.getAttribute('data-payment-id');
            }
            
            // Open PDF template in new window
            window.open('z_report_pdf.html?id=' + paymentId, '_blank');
        });
    });
    
    // Add direct PDF links to all print buttons
    const addPdfLinks = function() {
        const actionCells = document.querySelectorAll('td:last-child');
        actionCells.forEach(cell => {
            const printBtn = cell.querySelector('button:nth-child(1)');
            if (printBtn) {
                printBtn.classList.add('print-btn');
                printBtn.setAttribute('title', 'Print Z Report (PDF)');
            }
        });
    };
    
    // Call function to add PDF links
    addPdfLinks();
    
    // Handle "Print Selected" button
    const printSelectedBtn = document.getElementById('printSelectedBtn');
    if (printSelectedBtn) {
        printSelectedBtn.addEventListener('click', function() {
            const selectedRows = document.querySelectorAll('input[type="checkbox"]:checked');
            if (selectedRows.length > 0) {
                window.open('z_report_pdf.html', '_blank');
            } else {
                alert('Please select at least one row to print');
            }
        });
    }
});
