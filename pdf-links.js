// Add direct links to PDF template from all Z report pages
document.addEventListener('DOMContentLoaded', function() {
    // Update all print buttons to link directly to PDF template
    const updatePrintButtons = function() {
        // Print buttons in sellers page
        const printButtons = document.querySelectorAll('.btn-outline-primary, .btn-outline-secondary');
        printButtons.forEach(button => {
            if (button.innerHTML.includes('printer') || button.innerHTML.includes('Print')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.open('z_report_pdf.html', '_blank');
                });
            }
        });
        
        // Print Selected button
        const printSelectedBtn = document.querySelector('button[id="printSelectedBtn"], button:contains("Print Selected")');
        if (printSelectedBtn) {
            printSelectedBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.open('z_report_pdf.html', '_blank');
            });
        }
        
        // Mark as Paid button - should show PDF before marking as paid
        const markAsPaidBtn = document.querySelector('button:contains("Mark as Paid")');
        if (markAsPaidBtn) {
            markAsPaidBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const selectedRows = document.querySelectorAll('input[type="checkbox"]:checked');
                if (selectedRows.length > 0) {
                    window.open('z_report_pdf.html', '_blank');
                    setTimeout(() => {
                        alert('Payment marked as completed. The report has been moved to Paid Reports.');
                    }, 1000);
                } else {
                    alert('Please select at least one row to mark as paid');
                }
            });
        }
    };
    
    // Call function to update print buttons
    updatePrintButtons();
});
