$(document).ready(function() {
    $('#generate').click(async function() {
        var text = $('#qr-text').val();

        if (text) {
            try {
                let response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&format=svg`);
                if (response.ok) {
                    let svgData = await response.text();
                    $('#qrcode').html(svgData);

                    // Apply gradient to SVG
                    $('#qrcode svg path').attr('fill', 'url(#gradient)');
                    $('#qrcode svg').prepend(`
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:red" />
                                <stop offset="25%" style="stop-color:orange" />
                                <stop offset="50%" style="stop-color:yellow" />
                                <stop offset="75%" style="stop-color:green" />
                                <stop offset="100%" style="stop-color:blue" />
                            </linearGradient>
                        </defs>
                    `);
                } else {
                    alert("Failed to generate QR code");
                }
            } catch (error) {
                alert("Error occurred: " + error.message);
            }
        } else {
            alert("Please enter some text!");
        }
    });
});