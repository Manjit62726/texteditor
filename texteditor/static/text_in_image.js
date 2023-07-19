var textX = 20;
    var textY = 50;
    var isDragging = false;
    var initialOffset = { x: 0, y: 0 };
    var initialTextPosition = { x: 0, y: 0 };
    var originalImage = null;
    var modifiedImage = null;
    var textsArray = [];

    function handleImageUpload(event) {
      var file = event.target.files[0];
      var reader = new FileReader();

      reader.onload = function (event) {
        var img = document.createElement("img");
        img.src = event.target.result;

        img.onload = function () {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          var width = 1000;
          var height = 500;
          var aspectRatio = img.width / img.height;

          if (aspectRatio > width / height) {
            canvas.width = width;
            canvas.height = width / aspectRatio;
          } else {
            canvas.width = height * aspectRatio;
            canvas.height = height;
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          originalImage = img;

          var preview = document.getElementById("preview");
          preview.innerHTML = "";
          preview.appendChild(canvas);
        };
      };

      reader.readAsDataURL(file);
    }

     function addTextToImage() {
      var text = document.getElementById("text-input").value;
      var font = document.getElementById("font-select").value;
      var fontSize = parseInt(document.getElementById("font-size-input").value, 10);
      var textColor = document.getElementById("text-color-input").value;
      var isBold = document.getElementById("bold-checkbox").checked;
      var isItalic = document.getElementById("italic-checkbox").checked;
      var isUnderline = document.getElementById("underline-checkbox").checked;

      var fontStyle = "";
      if (isBold) fontStyle += "bold ";
      if (isItalic) fontStyle += "italic";

      var textDecoration = "";
      if (isUnderline) textDecoration = "underline";

      textsArray.push({
        text: text,
        x: textX,
        y: textY,
        font: font,
        fontSize: fontSize,
        textColor: textColor,
        fontStyle: fontStyle,
        textDecoration: textDecoration
      });

      redrawCanvas();
    }

    function redrawCanvas() {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var width = 1000;
      var height = 500;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(originalImage, 0, 0, width, height);

      ctx.fillStyle = "#ffffff";

       for (var i = 0; i < textsArray.length; i++) {
    var textData = textsArray[i];
    ctx.font = textData.fontStyle + " " + textData.fontSize + "px " + textData.font;
    ctx.fillStyle = textData.textColor;
    ctx.fillText(textData.text, textData.x, textData.y);

    if (textData.textDecoration === "underline") {
      var textWidth = ctx.measureText(textData.text).width;
      var startX = textData.x;
      var endX = textData.x + textWidth;
      var y = textData.y + textData.fontSize * 0.1; // Adjust the underline position based on font size
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.strokeStyle = textData.textColor;
      ctx.stroke();
    }
  }
      var preview = document.getElementById("preview");
      preview.innerHTML = "";
      preview.appendChild(canvas);
    }

    function removeTextFromImage() {
      if (textsArray.length > 0) {
        textsArray.splice(0, 1);
        redrawCanvas();
      }
    }

    function handleMouseDown(event) {
      isDragging = true;
      initialOffset.x = event.offsetX;
      initialOffset.y = event.offsetY;

      // Find the text index that was clicked on (if any)
      var preview = document.getElementById("preview");
      var canvas = preview.querySelector("canvas");
      var rect = canvas.getBoundingClientRect();
      var mouseX = event.clientX - rect.left;
      var mouseY = event.clientY - rect.top;

      for (var i = 0; i < textsArray.length; i++) {
        var textData = textsArray[i];
        var textWidth = canvas.getContext("2d").measureText(textData.text).width;
        var textHeight = textData.fontSize; // Use fontSize instead of assuming text height equals font size

        if (
          mouseX >= textData.x &&
          mouseX <= textData.x + textWidth &&
          mouseY >= textData.y - textHeight &&
          mouseY <= textData.y
        ) {
          // The user clicked on this text
          initialTextPosition.x = textData.x;
          initialTextPosition.y = textData.y;
          draggingTextIndex = i;
          break;
        }
      }
    }

    function handleMouseMove(event) {
      if (!isDragging || draggingTextIndex === null) return;

      var preview = document.getElementById("preview");
      var canvas = preview.querySelector("canvas");
      var rect = canvas.getBoundingClientRect();
      var mouseX = event.clientX - rect.left;
      var mouseY = event.clientY - rect.top;

      var deltaX = mouseX - initialOffset.x;
      var deltaY = mouseY - initialOffset.y;

      var maxTextX = canvas.width - canvas.getContext("2d").measureText(textsArray[draggingTextIndex].text).width;
      var maxTextY = canvas.height - textsArray[draggingTextIndex].fontSize; // Use fontSize instead of assuming text height equals font size

      textX = Math.max(Math.min(initialTextPosition.x + deltaX, maxTextX), 0);
      textY = Math.max(Math.min(initialTextPosition.y + deltaY, maxTextY), textsArray[draggingTextIndex].fontSize);

      textsArray[draggingTextIndex].x = textX;
      textsArray[draggingTextIndex].y = textY;

      redrawCanvas();
    }

    function handleMouseUp() {
      isDragging = false;
      draggingTextIndex = null;
    }


     function downloadImage() {
      var preview = document.getElementById("preview");
      var canvas = preview.querySelector("canvas");
      var link = document.createElement("a");
      link.download = "image_with_text.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }

var draggingTextIndex = null;
    var container = document.getElementById("preview-container");
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);