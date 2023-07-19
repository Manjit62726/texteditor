     // JavaScript to toggle dark mode
    $(".theme-switch").on("click", () => {
      $("body").toggleClass("light-theme");
    });



    /*.................................*/

    let isBold = false;
    let isItalic = false;
    let isUnderline = false;

    function copyText() {
      const convertedText = document.getElementById('converted-text').textContent;
      navigator.clipboard.writeText(convertedText).then(function() {
        alert('Text copied to clipboard!');
      }, function(err) {
        console.error('Failed to copy text: ', err);
      });
    }

    function updateConvertedText() {
      const userText = document.getElementById('user-text').value;
      const fontSelect = document.getElementById('font-select');
      const selectedFont = fontSelect.options[fontSelect.selectedIndex].value;
      const convertedText = document.getElementById('converted-text');

      let formattedText = userText;
      if (isBold) {
        formattedText = '<b>' + formattedText + '</b>';
      }
      if (isItalic) {
        formattedText = '<i>' + formattedText + '</i>';
      }
      if (isUnderline) {
        formattedText = '<u>' + formattedText + '</u>';
      }

      // Additional functionality for checkboxes
      const removePunc = document.getElementById('flexSwitchCheck1').checked;
      const fullCaps = document.getElementById('flexSwitchCheck2').checked;
      const newLineRemover = document.getElementById('flexSwitchCheck3').checked;
      const extraSpaceRemover = document.getElementById('flexSwitchCheck4').checked;

      if (removePunc) {
        formattedText = formattedText.replace(/[^\w\s]/g, '');
      }
      if (fullCaps) {
        formattedText = formattedText.toUpperCase();
      }
      if (newLineRemover) {
        formattedText = formattedText.replace(/\n/g, '');
      }
      if (extraSpaceRemover) {
        formattedText = formattedText.replace(/\s+/g, ' ');
      }

      convertedText.innerHTML = formattedText;
      convertedText.style.fontFamily = selectedFont;
    }

    function toggleBold() {
      isBold = !isBold;
      updateConvertedText();
    }

    function toggleItalic() {
      isItalic = !isItalic;
      updateConvertedText();
    }

    function toggleUnderline() {
      isUnderline = !isUnderline;
      updateConvertedText();
    }

    document.getElementById('user-text').addEventListener('input', updateConvertedText);
    document.getElementById('font-select').addEventListener('change', updateConvertedText);
    document.getElementById('flexSwitchCheck1').addEventListener('change', updateConvertedText);
    document.getElementById('flexSwitchCheck2').addEventListener('change', updateConvertedText);
    document.getElementById('flexSwitchCheck3').addEventListener('change', updateConvertedText);
    document.getElementById('flexSwitchCheck4').addEventListener('change', updateConvertedText);
