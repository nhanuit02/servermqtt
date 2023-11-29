
const headings = document.querySelectorAll('h3');
const select = document.getElementById('lang');
const sendButton = document.getElementById('sendButton');
const messageChangeName = document.getElementById('messageChangeName');

headings.forEach((heading) => {
const option = document.createElement('option');
option.value = heading.textContent;
option.textContent = heading.textContent;
select.appendChild(option);
});


function changeName() {
const selectedOption = select.options[select.selectedIndex];
const input = document.getElementById('messageChangeName');
const newName = input.value;


const selectedHeading = Array.from(headings).find((heading) => heading.textContent === selectedOption.value);
if (selectedHeading) {
    selectedHeading.textContent = newName;
    selectedOption.textContent = newName; 
    messageChangeName.value = '';
}
}


function restoreOriginalNames() {
const options = Array.from(select.options);
options.forEach((option) => {
    const originalName = option.value;
    const correspondingHeading = Array.from(headings).find((heading) => heading.textContent === originalName);
    if (correspondingHeading) {
    option.textContent = originalName; 
    correspondingHeading.textContent = originalName; 
    }
});

}