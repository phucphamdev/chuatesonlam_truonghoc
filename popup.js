// Hàm gửi tin nhắn xuống trang web
function sendSelectRequest(value) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = "Đang xử lý...";
    statusDiv.style.color = "blue";

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        // Gửi lệnh xuống content.js
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "select_type",
            type: value
        }, (response) => {
            // Nhận kết quả trả về
            if (chrome.runtime.lastError) {
                statusDiv.textContent = "Lỗi: Hãy Refresh trang web!";
                statusDiv.style.color = "red";
            } else if (response) {
                statusDiv.textContent = response.msg;
                statusDiv.style.color = response.status === "Thành công" ? "green" : "red";
            }
        });
    });
}

// Xử lý khi bấm nút "Tìm & Chọn" (nhập tay)
document.getElementById('btnSelect').addEventListener('click', () => {
    const val = document.getElementById('typeInput').value;
    if(val) sendSelectRequest(val);
});

// Xử lý các nút bấm nhanh (Bữa sáng, trưa...)
document.querySelectorAll('.quick-select').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const val = e.target.getAttribute('data-value');
        sendSelectRequest(val);
    });
});