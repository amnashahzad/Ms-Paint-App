const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const pencilButton = document.getElementById("pencil");
const brushButton = document.getElementById("brush");
const eraserButton = document.getElementById("eraser");
const colorPicker = document.getElementById("color-picker");
const brushSizeInput = document.getElementById("brush-size");
const brushCategorySelect = document.getElementById("brush-category");
const saveButton = document.getElementById("save");
const pageSizeSelect = document.getElementById("page-size");

let isDrawing = false;
let currentTool = "pencil";
let currentBrushCategory = "marker";
let currentPageSize = "medium";

setCanvasSize(currentPageSize);

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
pageSizeSelect.addEventListener("change", () => setCanvasSize(pageSizeSelect.value));

pencilButton.addEventListener("click", () => setTool("pencil"));
brushButton.addEventListener("click", () => setTool("brush"));
eraserButton.addEventListener("click", () => setTool("eraser"));
colorPicker.addEventListener("change", () => setColor(colorPicker.value));
brushSizeInput.addEventListener("input", () => setBrushSize(brushSizeInput.value));
brushCategorySelect.addEventListener("change", () => setBrushCategory(brushCategorySelect.value));
saveButton.addEventListener("click", saveCanvas);

function startDrawing(event) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function draw(event) {
  if (!isDrawing) return;
  context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  context.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

function setTool(tool) {
  currentTool = tool;
  if (tool === "eraser") {
    context.strokeStyle = "#fff";
  } else {
    context.strokeStyle = colorPicker.value;
  }
}

function setColor(color) {
  context.strokeStyle = color;
}

function setBrushSize(size) {
  context.lineWidth = size;
}

function setBrushCategory(category) {
  currentBrushCategory = category;
}

function setCanvasSize(size) {
  switch (size) {
    case "small":
      canvas.width = 400;
      canvas.height = 300;
      break;
    case "medium":
      canvas.width = 600;
      canvas.height = 400;
      break;
    case "large":
      canvas.width = 800;
      canvas.height = 600;
      break;
    default:
      canvas.width = 600;
      canvas.height = 400;
      break;
  }
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
}

function saveCanvas() {
  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "painting.png";
  link.click();
}
