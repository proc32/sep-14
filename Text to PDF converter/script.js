document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convert');
    const textInput = document.getElementById('text-input');

    convertBtn.addEventListener('click', function() {
        const text = textInput.value;

        if (!text.trim()) {
            alert("Please enter text or fill out this field.");
            return;
        }

        generatePDF(text);
    });
});

function generatePDF(text) {
    try {
        const doc = new window.jspdf.jsPDF();
        doc.text(text, 10, 10);
        doc.save('document.pdf');
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("There was an error generating the PDF. Please check the console for details.");
    }
}