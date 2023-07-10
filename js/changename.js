// Lấy danh sách các thẻ h3 trong tệp HTML
const headings = document.querySelectorAll('h3');
const select = document.getElementById('lang');
const sendButton = document.getElementById('sendButton');
const messageChangeName = document.getElementById('messageChangeName');

// Đặt nội dung của các option dựa trên nội dung của các thẻ h3
headings.forEach((heading) => {
const option = document.createElement('option');
option.value = heading.textContent;
option.textContent = heading.textContent;
select.appendChild(option);
});


// Hàm thay đổi tên của thẻ h3 đã chọn và cập nhật tên trong danh sách option
function changeName() {
const selectedOption = select.options[select.selectedIndex];
const input = document.getElementById('messageChangeName');
const newName = input.value;

// Cập nhật tên của thẻ h3 đã chọn
const selectedHeading = Array.from(headings).find((heading) => heading.textContent === selectedOption.value);
if (selectedHeading) {
    selectedHeading.textContent = newName;
    selectedOption.textContent = newName; // Cập nhật tên trong danh sách option
    messageChangeName.value = '';
}
}

// Hàm khôi phục tên ban đầu của tất cả các tùy chọn
function restoreOriginalNames() {
const options = Array.from(select.options);
options.forEach((option) => {
    const originalName = option.value;
    const correspondingHeading = Array.from(headings).find((heading) => heading.textContent === originalName);
    if (correspondingHeading) {
    option.textContent = originalName; // Khôi phục tên trong danh sách option
    correspondingHeading.textContent = originalName; // Khôi phục tên của thẻ h3
    }
});
}