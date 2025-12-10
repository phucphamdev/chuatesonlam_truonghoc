// Xử lý cập nhật database từ Excel
document.getElementById('updateBtn').addEventListener('click', () => {
  const excelData = document.getElementById('excelData').value.trim();
  const successMsg = document.getElementById('successMsg');
  
  if (!excelData) {
    alert('Vui lòng paste data từ Excel!');
    return;
  }

  // Convert Excel data thành foodDatabase
  const lines = excelData.split('\n');
  const newDatabase = {};

  lines.forEach(line => {
    const parts = line.split('\t');
    
    // Format: Mã | Tên | Gram | Hệ số thải bỏ | Giá tiền
    if (parts.length >= 5) {
      const code = parts[0].trim();
      const name = parts[1].trim();
      const gram = parseFloat(parts[2].trim());
      const price = parseInt(parts[4].trim());

      if (code && name && !isNaN(gram) && !isNaN(price)) {
        newDatabase[code] = {
          fullName: name,
          defaultGram: gram,
          price: price,
          code: code
        };
      }
    }
  });

  if (Object.keys(newDatabase).length === 0) {
    alert('Không thể convert data! Vui lòng kiểm tra format.');
    return;
  }

  console.log('📊 Database mới:', newDatabase);
  console.log(`✓ Đã convert ${Object.keys(newDatabase).length} món ăn`);

  // Gửi database mới xuống content script
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'update_database',
      database: newDatabase
    }, (response) => {
      if (chrome.runtime.lastError) {
        alert('Lỗi: Vui lòng mở trang School Center và thử lại!');
      } else {
        // Hiển thị thông báo thành công
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 3000);
        
        console.log('✓ Đã cập nhật database thành công!');
      }
    });
  });
});
