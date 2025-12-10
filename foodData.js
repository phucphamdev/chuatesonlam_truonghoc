// ═══════════════════════════════════════════════════════════
//  DATABASE THỰC PHẨM - CẬP NHẬT DATA Ở ĐÂY
// ═══════════════════════════════════════════════════════════
// Mỗi menu khác nhau, chỉ cần thay đổi data bên dưới
// Format: 'MÃ': { fullName: 'Tên', defaultGram: số, price: giá, code: 'MÃ' }
// ═══════════════════════════════════════════════════════════

const foodDatabase = {
  'GAOTE': { fullName: 'Gạo thơm', defaultGram: 87.5, price: 21000, code: 'GAOTE' },
  'DAUTHUCVAT': { fullName: 'Dầu thực vật', defaultGram: 5, price: 57000, code: 'DAUTHUCVAT' },
  'DUONG': { fullName: 'Đường', defaultGram: 12.5, price: 33000, code: 'DUONG' },
  'MUOI': { fullName: 'Muối', defaultGram: 2.08, price: 14800, code: 'MUOI' },
  'NUOCMAM': { fullName: 'Nước mắm', defaultGram: 2.08, price: 31000, code: 'NUOCMAM' },
  'HANHLA': { fullName: 'Hành lá', defaultGram: 3.48, price: 68000, code: 'HANHLA' },
  'RAUNGO': { fullName: 'Rau ngò', defaultGram: 3.7, price: 83000, code: 'RAUNGO' },
  'DAUCAKIDDY': { fullName: 'Dầu cá', defaultGram: 8.33, price: 105000, code: 'DAUCAKIDDY' },
  'TANO': { fullName: 'Tần ô (Cải cúc)', defaultGram: 37.5, price: 47000, code: 'TANO' },
  'THITLONNAC_VDD': { fullName: 'Thịt nạc đùi', defaultGram: 12.25, price: 156000, code: 'THITLONNAC_VDD' },
  'TOMDONG': { fullName: 'Tôm bạc trung', defaultGram: 13.75, price: 177000, code: 'TOMDONG' },
  'THITNACDAM': { fullName: 'Thịt nạc dăm', defaultGram: 25, price: 164000, code: 'THITNACDAM' },
  'BAPNON': { fullName: 'Bắp non', defaultGram: 12.5, price: 68000, code: 'BAPNON' },
  'BONGCAI': { fullName: 'Bông cải (súp lơ)', defaultGram: 12.5, price: 79000, code: 'BONGCAI' },
  'DAUCOVE': { fullName: 'Đậu cô ve', defaultGram: 15, price: 45000, code: 'DAUCOVE' },
  'ECH': { fullName: 'Ếch', defaultGram: 22.46, price: 198000, code: 'ECH' },
  'CAROT': { fullName: 'Cà rốt', defaultGram: 10.62, price: 36000, code: 'CAROT' },
  'NAMROM': { fullName: 'Nấm rơm', defaultGram: 11.25, price: 135000, code: 'NAMROM' },
  'RAUTHOM_VDD': { fullName: 'Rau thơm', defaultGram: 3.26, price: 79000, code: 'RAUTHOM_VDD' },
  'HANHCUTUOI': { fullName: 'Hành củ tươi', defaultGram: 3.3, price: 89000, code: 'HANHCUTUOI' },
  'TOI': { fullName: 'Tỏi', defaultGram: 4.35, price: 100000, code: 'TOI' }
};

// ═══════════════════════════════════════════════════════════
//  HƯỚNG DẪN THÊM DATA MỚI:
// ═══════════════════════════════════════════════════════════
// 1. Copy dòng cuối cùng (trước dấu };)
// 2. Paste xuống dòng mới
// 3. Thay đổi: MÃ, Tên, defaultGram, price (giá tiền)
// 4. Lưu file
// 5. Reload extension (chrome://extensions/)
// 6. Click nút "THÊM TẤT CẢ THỰC PHẨM" để tự động thêm!
// ═══════════════════════════════════════════════════════════

// Export để sử dụng trong content.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = foodDatabase;
}
