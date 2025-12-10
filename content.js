// foodDatabase được load từ foodData.js

// Tạo reverse lookup để tìm theo tên đầy đủ
const foodByFullName = {};
Object.keys(foodDatabase).forEach(code => {
  const food = foodDatabase[code];
  foodByFullName[food.fullName.toLowerCase()] = food;
});

// Tạo UI Auto Fill nâng cao
function createEnhancedAutoFillUI() {
  const existingUI = document.querySelector('.auto-fill-enhanced');
  if (existingUI) existingUI.remove();

  const container = document.createElement('div');
  container.className = 'auto-fill-enhanced';
  container.innerHTML = `
    <div class="auto-fill-header">
      <div class="auto-fill-title">🍽️ Auto Fill Nhanh</div>
      <button class="auto-fill-close" title="Đóng">×</button>
    </div>
    
    <div class="auto-fill-body">
      <div class="input-group">
        <input 
          type="text" 
          class="food-code-input" 
          placeholder="Nhập mã (GẠO, TPT, TÔM...)"
          autocomplete="off"
        />
        <button class="search-btn" title="Tìm kiếm">🔍</button>
      </div>

      <div class="suggestions-list" style="display: none;">
        <div class="suggestions-header">Gợi ý mã:</div>
        <div class="suggestions-items"></div>
      </div>

      <div class="results-container" style="display: none;">
        <div class="results-header">
          <span class="results-title">Chọn món ăn:</span>
          <button class="select-all-btn">Chọn tất cả</button>
        </div>
        <div class="results-list"></div>
        <div class="results-footer">
          <button class="add-selected-btn">
            <span class="btn-icon">✓</span>
            <span class="btn-text">Thêm món đã chọn</span>
          </button>
        </div>
      </div>

      <div class="quick-codes">
        <div class="quick-codes-title">Mã thường dùng:</div>
        <div class="quick-codes-list"></div>
      </div>

      <div class="auto-add-all">
        <button class="add-all-btn">
          <span class="btn-icon">⚡</span>
          <span class="btn-text">ĐỒNG BỘ THỰC PHẨM</span>
          <span class="btn-count">(${Object.keys(foodDatabase).length} món)</span>
        </button>
        <div class="sync-info">Thêm mới / Cập nhật / Xóa tự động</div>
      </div>
    </div>
  `;

  document.body.appendChild(container);
  
  renderQuickCodes();
  setupEventListeners(container);
  
  return container;
}

function renderQuickCodes() {
  const quickCodesList = document.querySelector('.quick-codes-list');
  const codes = Object.keys(foodDatabase).slice(0, 12);
  
  quickCodesList.innerHTML = codes.map(code => 
    `<button class="quick-code-btn" data-code="${code}" title="${foodDatabase[code].fullName}">${code}</button>`
  ).join('');
}

function setupEventListeners(container) {
  const input = container.querySelector('.food-code-input');
  const searchBtn = container.querySelector('.search-btn');
  const closeBtn = container.querySelector('.auto-fill-close');
  const selectAllBtn = container.querySelector('.select-all-btn');
  const addSelectedBtn = container.querySelector('.add-selected-btn');
  const quickCodesList = container.querySelector('.quick-codes-list');

  input.addEventListener('input', (e) => {
    const value = e.target.value.toUpperCase().trim();
    showSuggestions(value);
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchFood();
    }
  });

  searchBtn.addEventListener('click', searchFood);
  closeBtn.addEventListener('click', () => {
    container.style.display = 'none';
  });
  selectAllBtn.addEventListener('click', toggleSelectAll);
  addSelectedBtn.addEventListener('click', addSelectedDishes);

  quickCodesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-code-btn')) {
      const code = e.target.dataset.code;
      input.value = code;
      searchFood();
    }
  });

  const addAllBtn = container.querySelector('.add-all-btn');
  addAllBtn.addEventListener('click', syncAllFoods);
}

function showSuggestions(value) {
  const suggestionsContainer = document.querySelector('.suggestions-list');
  const suggestionsItems = document.querySelector('.suggestions-items');
  
  if (!value || value.length < 2) {
    suggestionsContainer.style.display = 'none';
    return;
  }

  const matches = Object.keys(foodDatabase).filter(code => {
    const food = foodDatabase[code];
    return code.includes(value) || 
           food.fullName.toLowerCase().includes(value.toLowerCase());
  }).slice(0, 8);

  if (matches.length > 0) {
    suggestionsItems.innerHTML = matches.map(code => {
      const food = foodDatabase[code];
      return `<div class="suggestion-item" data-code="${code}" title="${food.fullName}">
        <strong>${code}</strong>
        <small>${food.fullName}</small>
      </div>`;
    }).join('');
    suggestionsContainer.style.display = 'block';

    suggestionsItems.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelector('.food-code-input').value = item.dataset.code;
        searchFood();
      });
    });
  } else {
    suggestionsContainer.style.display = 'none';
  }
}

function searchFood() {
  const input = document.querySelector('.food-code-input');
  const code = input.value.toUpperCase().trim();
  const resultsContainer = document.querySelector('.results-container');
  const resultsList = document.querySelector('.results-list');
  const suggestionsContainer = document.querySelector('.suggestions-list');

  suggestionsContainer.style.display = 'none';

  if (!code) {
    alert('Vui lòng nhập mã thực phẩm!');
    return;
  }

  const matchedFoods = Object.keys(foodDatabase).filter(key => 
    key.includes(code) || foodDatabase[key].fullName.toLowerCase().includes(code.toLowerCase())
  );

  if (matchedFoods.length === 0) {
    alert('Không tìm thấy mã "' + code + '"!\n\nVí dụ: GAOTE, MUOP, TOMDONG, THITNACDAM...');
    return;
  }

  resultsList.innerHTML = matchedFoods.map((key, index) => {
    const food = foodDatabase[key];
    return `
      <div class="result-item">
        <div class="result-checkbox">
          <input 
            type="checkbox" 
            id="dish-${index}" 
            class="dish-checkbox"
            data-food='${JSON.stringify(food)}'
            checked
          />
          <label for="dish-${index}" class="checkbox-label">
            <span class="checkmark">✓</span>
          </label>
        </div>
        <div class="result-info">
          <div class="result-name">
            <strong>${food.code}</strong> - ${food.fullName}
          </div>
          <div class="result-gram-input">
            <input 
              type="number" 
              class="gram-input" 
              value="${food.defaultGram}" 
              min="0.01"
              step="0.01"
              placeholder="Gram"
              data-index="${index}"
            />
            <span class="gram-unit">g</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  resultsContainer.style.display = 'block';

  setTimeout(() => {
    const firstGramInput = resultsList.querySelector('.gram-input');
    if (firstGramInput) {
      firstGramInput.select();
    }
  }, 100);
}

function toggleSelectAll() {
  const checkboxes = document.querySelectorAll('.dish-checkbox');
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  
  checkboxes.forEach(cb => {
    cb.checked = !allChecked;
  });

  const btn = document.querySelector('.select-all-btn');
  btn.textContent = allChecked ? 'Chọn tất cả' : 'Bỏ chọn tất cả';
}

function addSelectedDishes() {
  const checkboxes = document.querySelectorAll('.dish-checkbox:checked');
  
  if (checkboxes.length === 0) {
    alert('Vui lòng chọn ít nhất 1 thực phẩm!');
    return;
  }

  const selectedFoods = [];
  checkboxes.forEach(checkbox => {
    const food = JSON.parse(checkbox.dataset.food);
    const index = checkbox.id.replace('dish-', '');
    const gramInput = document.querySelector(`.gram-input[data-index="${index}"]`);
    const gram = parseFloat(gramInput.value) || food.defaultGram;
    
    selectedFoods.push({
      code: food.code,
      fullName: food.fullName,
      gram: gram
    });
  });

  console.log(`🚀 Bắt đầu thêm ${selectedFoods.length} thực phẩm...`);
  
  addFoodsToMenu(selectedFoods);
  
  document.querySelector('.results-container').style.display = 'none';
  document.querySelector('.food-code-input').value = '';
  
  showProgressNotification(`Đang thêm ${selectedFoods.length} thực phẩm...`);
}

function addFoodsToMenu(foods) {
  console.log('🍽️ Bắt đầu thêm thực phẩm:', foods);
  
  let currentIndex = 0;
  
  function closePopupIfExists() {
    const popupClose = document.querySelector('.ant-notification-close, .ant-modal-close, .swal2-close');
    if (popupClose) {
      console.log('🔴 Đóng popup...');
      popupClose.click();
    }
    
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true }));
  }
  
  function scrollToInput() {
    const foodInput = document.querySelector('.ant-select-auto-complete input[type="search"]');
    if (foodInput) {
      foodInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  function addSingleFood() {
    if (currentIndex >= foods.length) {
      console.log('✅ Hoàn thành thêm tất cả thực phẩm!');
      showSuccessNotification(`✓ Đã thêm ${foods.length} thực phẩm!`);
      return;
    }
    
    const food = foods[currentIndex];
    console.log(`\n📝 [${currentIndex + 1}/${foods.length}] Thêm: ${food.code} (${food.gram}g)`);
    
    closePopupIfExists();
    
    setTimeout(() => {
      const foodInput = document.querySelector('.ant-select-auto-complete input[type="search"]');
      
      if (!foodInput) {
        console.error('❌ Không tìm thấy input, thử lại...');
        setTimeout(addSingleFood, 500);
        return;
      }
      
      scrollToInput();
      
      foodInput.focus();
      foodInput.value = '';
      foodInput.dispatchEvent(new Event('input', { bubbles: true }));
      
      setTimeout(() => {
        foodInput.value = food.code;
        foodInput.dispatchEvent(new Event('input', { bubbles: true }));
        foodInput.dispatchEvent(new Event('change', { bubbles: true }));
        
        setTimeout(() => {
          const options = document.querySelectorAll('.ant-select-item-option');
          
          const matchedOption = Array.from(options).find(opt => {
            const hasRedBadge = opt.querySelector('.ant-tag-red, [style*="red"], .tpt-badge');
            const text = opt.textContent.toUpperCase();
            return hasRedBadge && text.includes(food.code.toUpperCase());
          });
          
          const fallbackOption = !matchedOption ? Array.from(options).find(opt => {
            const text = opt.textContent.toUpperCase();
            return text.includes(food.code.toUpperCase());
          }) : null;
          
          const selectedOption = matchedOption || fallbackOption;
          
          if (selectedOption) {
            console.log(`  → Chọn: ${selectedOption.textContent.trim()}`);
            selectedOption.click();
            
            setTimeout(() => {
              const allInputs = document.querySelectorAll('.food-list input[type="text"], .food-list input[type="number"]');
              if (allInputs.length > 0) {
                const lastInput = allInputs[allInputs.length - 1];
                lastInput.focus();
                lastInput.value = food.gram;
                lastInput.dispatchEvent(new Event('input', { bubbles: true }));
                lastInput.dispatchEvent(new Event('change', { bubbles: true }));
                lastInput.blur();
                
                console.log(`  ✓ Thành công!`);
                
                const progress = Math.round(((currentIndex + 1) / foods.length) * 100);
                showProgressNotification(`Đang thêm... ${progress}% (${currentIndex + 1}/${foods.length})`);
                
                currentIndex++;
                setTimeout(addSingleFood, 2500);
              } else {
                console.error(`  ❌ Không tìm thấy input gram`);
                currentIndex++;
                setTimeout(addSingleFood, 1000);
              }
            }, 500);
          } else {
            console.error(`  ❌ Không tìm thấy option: ${food.code}`);
            currentIndex++;
            setTimeout(addSingleFood, 1000);
          }
        }, 800);
      }, 300);
    }, 300);
  }
  
  addSingleFood();
}

function showProgressNotification(message) {
  let notification = document.querySelector('.progress-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'progress-notification';
    document.body.appendChild(notification);
  }
  
  notification.innerHTML = `
    <div class="notification-icon">⏳</div>
    <div class="notification-message">${message}</div>
  `;
  notification.classList.add('show');
}

function syncAllFoods() {
  console.log('🔄 Đồng bộ thực phẩm từ Handsontable');
  
  // Đọc bảng Handsontable
  const currentTable = scanHandsontable();
  console.log('📊 Bảng hiện tại:', currentTable);
  
  // So sánh với database
  const databaseCodes = Object.keys(foodDatabase);
  const currentCodes = currentTable.map(item => item.code);
  
  // Tìm món cần XÓA (có trong bảng nhưng KHÔNG có trong database)
  const toDelete = [];
  currentTable.forEach(item => {
    if (!databaseCodes.includes(item.code)) {
      toDelete.push(item);
    }
  });
  
  // Tìm món cần CẬP NHẬT "SL (g)"
  const toUpdate = [];
  currentTable.forEach(item => {
    if (databaseCodes.includes(item.code)) {
      const food = foodDatabase[item.code];
      if (item.gram !== food.defaultGram) {
        toUpdate.push({
          code: item.code,
          row: item.row,
          rowIndex: item.rowIndex,
          newGram: food.defaultGram,
          currentGram: item.gram
        });
      }
    }
  });
  
  // Tìm món cần THÊM MỚI (có trong database nhưng KHÔNG có trong bảng)
  const toAdd = [];
  databaseCodes.forEach(code => {
    if (!currentCodes.includes(code)) {
      const food = foodDatabase[code];
      toAdd.push({
        code: food.code,
        fullName: food.fullName,
        gram: food.defaultGram
      });
    }
  });
  
  console.log(`\n📋 Kế hoạch:`);
  console.log(`  ❌ Xóa: ${toDelete.length} món`);
  console.log(`  ✏️ Cập nhật SL (g): ${toUpdate.length} món`);
  console.log(`  ➕ Thêm mới: ${toAdd.length} món`);
  
  const container = document.querySelector('.auto-fill-enhanced');
  if (container) {
    container.style.display = 'none';
  }
  
  // Bước 1: XÓA món không cần
  if (toDelete.length > 0) {
    showProgressNotification(`Đang xóa ${toDelete.length} món...`);
    deleteHandsontableRows(toDelete, () => {
      // Bước 2: CẬP NHẬT SL (g)
      if (toUpdate.length > 0) {
        showProgressNotification(`Đang cập nhật ${toUpdate.length} món...`);
        updateHandsontableRows(toUpdate, () => {
          // Bước 3: THÊM món mới
          if (toAdd.length > 0) {
            showProgressNotification(`Đang thêm ${toAdd.length} món mới...`);
            addFoodsToMenu(toAdd);
          } else {
            showSuccessNotification('✓ Đồng bộ hoàn tất!');
          }
        });
      } else if (toAdd.length > 0) {
        showProgressNotification(`Đang thêm ${toAdd.length} món mới...`);
        addFoodsToMenu(toAdd);
      } else {
        showSuccessNotification('✓ Đồng bộ hoàn tất!');
      }
    });
  } else if (toUpdate.length > 0) {
    showProgressNotification(`Đang cập nhật ${toUpdate.length} món...`);
    updateHandsontableRows(toUpdate, () => {
      if (toAdd.length > 0) {
        showProgressNotification(`Đang thêm ${toAdd.length} món mới...`);
        addFoodsToMenu(toAdd);
      } else {
        showSuccessNotification('✓ Đồng bộ hoàn tất!');
      }
    });
  } else if (toAdd.length > 0) {
    showProgressNotification(`Đang thêm ${toAdd.length} món mới...`);
    addFoodsToMenu(toAdd);
  } else {
    showSuccessNotification('✓ Dữ liệu đã đồng bộ!');
  }
}

// Xóa các dòng trong Handsontable
function deleteHandsontableRows(items, callback) {
  console.log('\n❌ Xóa món không cần:');
  
  items.forEach(item => {
    console.log(`  ❌ ${item.code}`);
    
    // Tìm nút xóa (icon trash)
    const deleteBtn = item.row.querySelector('.glyphicon-trash');
    if (deleteBtn) {
      deleteBtn.click();
    }
  });
  
  console.log('✅ Xóa xong!');
  setTimeout(callback, 1000);
}

// Quét bảng Handsontable
function scanHandsontable() {
  const rows = document.querySelectorAll('#hot table.htCore tbody tr');
  const foods = [];
  
  rows.forEach((row, index) => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 4) {
      // Cột 1: Tên viết tắt (index 1)
      const codeCell = cells[1];
      const code = codeCell ? codeCell.textContent.trim().toUpperCase() : '';
      
      // Cột 3: SL (g) (index 3)
      const gramCell = cells[3];
      const gram = gramCell ? parseFloat(gramCell.textContent.trim()) : 0;
      
      if (code && code !== 'TÊN VIẾT TẮT') {
        foods.push({
          code: code,
          gram: gram,
          row: row,
          rowIndex: index
        });
      }
    }
  });
  
  return foods;
}

// Cập nhật "SL (g)" trong Handsontable
function updateHandsontableRows(items, callback) {
  console.log('\n✏️ Cập nhật SL (g):');
  
  items.forEach(item => {
    console.log(`  ${item.code}: ${item.currentGram} → ${item.newGram}`);
    
    // Tìm cell "SL (g)" (cột 3)
    const cells = item.row.querySelectorAll('td');
    if (cells.length >= 4) {
      const gramCell = cells[3];
      
      // Cập nhật giá trị
      gramCell.textContent = item.newGram;
      gramCell.classList.add('htNumeric', 'htRight');
      
      // Trigger event để Handsontable cập nhật
      const event = new Event('change', { bubbles: true });
      gramCell.dispatchEvent(event);
    }
  });
  
  console.log('✅ Cập nhật xong!');
  setTimeout(callback, 500);
}

function showSuccessNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <div class="notification-icon">✓</div>
    <div class="notification-message">${message}</div>
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Lắng nghe message từ popup để cập nhật database
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'update_database') {
    console.log('📥 Nhận database mới từ popup:', request.database);
    
    // Cập nhật foodDatabase
    Object.keys(foodDatabase).forEach(key => delete foodDatabase[key]);
    Object.assign(foodDatabase, request.database);
    
    console.log(`✓ Đã cập nhật database: ${Object.keys(foodDatabase).length} món`);
    
    // Cập nhật UI
    const container = document.querySelector('.auto-fill-enhanced');
    if (container) {
      container.remove();
    }
    createEnhancedAutoFillUI();
    
    sendResponse({ status: 'success', count: Object.keys(foodDatabase).length });
    return true;
  }
});

function init() {
  console.log('🔍 Extension đang chạy...');
  console.log('📍 URL hiện tại:', window.location.href);
  
  createEnhancedAutoFillUI();
  console.log('✓ Auto Fill Enhanced đã được kích hoạt!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(init, 500);
  }
}).observe(document, { subtree: true, childList: true });
