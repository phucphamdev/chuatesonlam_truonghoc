// Database mã viết tắt và món ăn
const foodDatabase = {
  'GẠO': [
    { name: 'Cơm trắng', defaultGram: 100 },
    { name: 'Cháo gạo', defaultGram: 150 },
    { name: 'Xôi gạo nếp', defaultGram: 80 }
  ],
  'TPT': [
    { name: 'Thịt heo rim', defaultGram: 50 },
    { name: 'Thịt heo luộc', defaultGram: 60 },
    { name: 'Thịt heo xào', defaultGram: 55 }
  ],
  'TÔM': [
    { name: 'Tôm rim thịt', defaultGram: 40 },
    { name: 'Canh tôm', defaultGram: 30 },
    { name: 'Tôm luộc', defaultGram: 35 }
  ],
  'NUI': [
    { name: 'Nui rau củ thịt heo', defaultGram: 120 },
    { name: 'Nui xào', defaultGram: 100 }
  ],
  'SỮA': [
    { name: 'Sữa chua Probi', defaultGram: 100 },
    { name: 'Sữa tươi', defaultGram: 200 }
  ],
  'MƯỚP': [
    { name: 'Canh mướp, nấm tôm, thịt', defaultGram: 150 }
  ],
  'SÚP': [
    { name: 'Súp óc heo', defaultGram: 150 }
  ]
};

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
    </div>
  `;

  document.body.appendChild(container);
  
  // Render quick codes
  renderQuickCodes();
  
  // Event listeners
  setupEventListeners(container);
  
  return container;
}

// Render các mã nhanh
function renderQuickCodes() {
  const quickCodesList = document.querySelector('.quick-codes-list');
  const codes = Object.keys(foodDatabase);
  
  quickCodesList.innerHTML = codes.map(code => 
    `<button class="quick-code-btn" data-code="${code}">${code}</button>`
  ).join('');
}

// Setup event listeners
function setupEventListeners(container) {
  const input = container.querySelector('.food-code-input');
  const searchBtn = container.querySelector('.search-btn');
  const closeBtn = container.querySelector('.auto-fill-close');
  const selectAllBtn = container.querySelector('.select-all-btn');
  const addSelectedBtn = container.querySelector('.add-selected-btn');
  const quickCodesList = container.querySelector('.quick-codes-list');

  // Input change - show suggestions
  input.addEventListener('input', (e) => {
    const value = e.target.value.toUpperCase().trim();
    showSuggestions(value);
  });

  // Enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchFood();
    }
  });

  // Search button
  searchBtn.addEventListener('click', searchFood);

  // Close button
  closeBtn.addEventListener('click', () => {
    container.style.display = 'none';
  });

  // Select all
  selectAllBtn.addEventListener('click', toggleSelectAll);

  // Add selected
  addSelectedBtn.addEventListener('click', addSelectedDishes);

  // Quick codes
  quickCodesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-code-btn')) {
      const code = e.target.dataset.code;
      input.value = code;
      searchFood();
    }
  });
}

// Show suggestions
function showSuggestions(value) {
  const suggestionsContainer = document.querySelector('.suggestions-list');
  const suggestionsItems = document.querySelector('.suggestions-items');
  
  if (!value) {
    suggestionsContainer.style.display = 'none';
    return;
  }

  const matches = Object.keys(foodDatabase).filter(code => 
    code.includes(value)
  );

  if (matches.length > 0) {
    suggestionsItems.innerHTML = matches.map(code => 
      `<div class="suggestion-item" data-code="${code}">${code}</div>`
    ).join('');
    suggestionsContainer.style.display = 'block';

    // Click suggestion
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

// Search food
function searchFood() {
  const input = document.querySelector('.food-code-input');
  const code = input.value.toUpperCase().trim();
  const resultsContainer = document.querySelector('.results-container');
  const resultsList = document.querySelector('.results-list');
  const suggestionsContainer = document.querySelector('.suggestions-list');

  suggestionsContainer.style.display = 'none';

  if (!code || !foodDatabase[code]) {
    alert('Không tìm thấy mã "' + code + '"!\n\nCác mã có sẵn: ' + Object.keys(foodDatabase).join(', '));
    return;
  }

  const dishes = foodDatabase[code];
  
  resultsList.innerHTML = dishes.map((dish, index) => `
    <div class="result-item">
      <div class="result-checkbox">
        <input 
          type="checkbox" 
          id="dish-${index}" 
          class="dish-checkbox"
          data-dish='${JSON.stringify(dish)}'
        />
        <label for="dish-${index}" class="checkbox-label">
          <span class="checkmark">✓</span>
        </label>
      </div>
      <div class="result-info">
        <div class="result-name">${dish.name}</div>
        <div class="result-gram-input">
          <input 
            type="number" 
            class="gram-input" 
            value="${dish.defaultGram}" 
            min="1"
            placeholder="Gram"
            data-index="${index}"
          />
          <span class="gram-unit">g</span>
        </div>
      </div>
    </div>
  `).join('');

  resultsContainer.style.display = 'block';

  // Auto focus first checkbox
  setTimeout(() => {
    const firstCheckbox = resultsList.querySelector('.dish-checkbox');
    if (firstCheckbox) firstCheckbox.focus();
  }, 100);
}

// Toggle select all
function toggleSelectAll() {
  const checkboxes = document.querySelectorAll('.dish-checkbox');
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  
  checkboxes.forEach(cb => {
    cb.checked = !allChecked;
  });

  const btn = document.querySelector('.select-all-btn');
  btn.textContent = allChecked ? 'Chọn tất cả' : 'Bỏ chọn tất cả';
}

// Add selected dishes
function addSelectedDishes() {
  const checkboxes = document.querySelectorAll('.dish-checkbox:checked');
  
  if (checkboxes.length === 0) {
    alert('Vui lòng chọn ít nhất 1 món!');
    return;
  }

  const selectedDishes = [];
  checkboxes.forEach(checkbox => {
    const dish = JSON.parse(checkbox.dataset.dish);
    const index = checkbox.id.replace('dish-', '');
    const gramInput = document.querySelector(`.gram-input[data-index="${index}"]`);
    const gram = parseInt(gramInput.value) || dish.defaultGram;
    
    selectedDishes.push({
      name: dish.name,
      gram: gram
    });
  });

  // Hiển thị thông báo
  const message = selectedDishes.map(d => `✓ ${d.name} (${d.gram}g)`).join('\n');
  
  if (confirm(`Thêm ${selectedDishes.length} món vào thực đơn?\n\n${message}`)) {
    // TODO: Tích hợp với hệ thống thực tế
    addDishesToMenu(selectedDishes);
    
    // Reset
    document.querySelector('.results-container').style.display = 'none';
    document.querySelector('.food-code-input').value = '';
    
    showSuccessNotification(`Đã thêm ${selectedDishes.length} món!`);
  }
}

// Add dishes to menu (tích hợp với hệ thống)
function addDishesToMenu(dishes) {
  // Tìm input thực phẩm trong trang
  const foodInput = document.querySelector('.ant-select-auto-complete input');
  
  dishes.forEach((dish, index) => {
    setTimeout(() => {
      if (foodInput) {
        // Simulate typing
        foodInput.value = dish.name;
        foodInput.dispatchEvent(new Event('input', { bubbles: true }));
        
        // Simulate selection after delay
        setTimeout(() => {
          // Tìm và click vào option
          const option = Array.from(document.querySelectorAll('.ant-select-item-option')).find(
            opt => opt.textContent.includes(dish.name)
          );
          if (option) {
            option.click();
            
            // Nhập số lượng gram
            setTimeout(() => {
              const gramInputs = document.querySelectorAll('input[type="text"]');
              const lastGramInput = gramInputs[gramInputs.length - 1];
              if (lastGramInput) {
                lastGramInput.value = dish.gram;
                lastGramInput.dispatchEvent(new Event('change', { bubbles: true }));
              }
            }, 300);
          }
        }, 500);
      }
    }, index * 1500); // Delay giữa các món
  });
}

// Show success notification
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

// Initialize
function init() {
  // Chỉ chạy trên trang thực đơn
  if (window.location.href.includes('foodkid') || window.location.href.includes('thucDon')) {
    createEnhancedAutoFillUI();
    console.log('✓ Auto Fill Enhanced đã được kích hoạt!');
  }
}

// Run when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Re-init on navigation (SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(init, 500);
  }
}).observe(document, { subtree: true, childList: true });
