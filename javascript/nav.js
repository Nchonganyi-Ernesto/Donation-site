window.addEventListener('scroll', function() {
  var h1 = document.getElementById('h1');
  var header2 = document.getElementById('header2');
  var spacer = document.getElementById('header2-spacer');
  if (!h1 || !header2 || !spacer) return;
  var h1Rect = h1.getBoundingClientRect();
  var header2Rect = header2.getBoundingClientRect();
  spacer.style.height = header2.offsetHeight + 'px';
  // If h1 is out of view and header2 reaches the top, make header2 sticky
  if (h1Rect.bottom <= 0 && header2Rect.top <= 0) {
    header2.classList.add('fixed-header2');
    spacer.style.display = 'block';
  } else {
    header2.classList.remove('fixed-header2');
    spacer.style.display = 'none';
  }
});
function hideSelectedOption(selectedElement) {
    const selectedOption = selectedElement.options[selectedElement.selectedIndex];
    const allOptions = selectedElement.querySelectorAll('option');
    allOptions.forEach(option => {
        option.style.display = 'block'; // Show all options first
    });
    selectedOption.style.display = 'none'; // Hide the selected option
}
