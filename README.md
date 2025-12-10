# School Center Auto Fill Enhanced - Extension Chrome

## 🎯 Tính năng chính

Extension này giúp bạn thêm món ăn vào thực đơn nhanh chóng bằng cách:

1. **Nhập mã viết tắt** (GẠO, TPT, TÔM, NUI, SỮA...)
2. **Hiển thị danh sách món ăn** có chứa thực phẩm đó
3. **Chọn nhiều món** bằng checkbox (có tích đỏ)
4. **Điền số lượng gram** cho mỗi món
5. **Auto fill nhanh** vào thực đơn

## 📦 Cài đặt

### Bước 1: Tải Extension
1. Tải toàn bộ thư mục này về máy
2. Hoặc clone repository: `git clone [url]`

### Bước 2: Cài đặt vào Chrome
1. Mở Chrome và truy cập: `chrome://extensions/`
2. Bật **Developer mode** (góc trên bên phải)
3. Click **Load unpacked**
4. Chọn thư mục chứa extension này
5. Extension sẽ xuất hiện trong danh sách

### Bước 3: Sử dụng
1. Truy cập trang thực đơn trên www.sc.edu.vn
2. Extension sẽ tự động hiển thị ở góc dưới bên trái
3. Nhập mã viết tắt và bắt đầu sử dụng!

## 🎨 Giao diện

Extension có giao diện hiện đại với:
- **Gradient màu tím** đẹp mắt
- **Checkbox có tích đỏ** khi chọn món
- **Ô nhập gram** cho mỗi món
- **Nút "Chọn tất cả"** tiện lợi
- **Mã nhanh** ở dưới cùng
- **Thông báo thành công** khi thêm món

## 📝 Danh sách mã viết tắt

| Mã | Món ăn |
|----|--------|
| GẠO | Cơm trắng, Cháo gạo, Xôi gạo nếp |
| TPT | Thịt heo rim, Thịt heo luộc, Thịt heo xào |
| TÔM | Tôm rim thịt, Canh tôm, Tôm luộc |
| NUI | Nui rau củ thịt heo, Nui xào |
| SỮA | Sữa chua Probi, Sữa tươi |
| MƯỚP | Canh mướp, nấm tôm, thịt |
| SÚP | Súp óc heo |

## 🔧 Tùy chỉnh

### Thêm mã mới
Mở file `content.js` và thêm vào object `foodDatabase`:

```javascript
const foodDatabase = {
  // ... các mã hiện có
  'MÃ_MỚI': [
    { name: 'Tên món 1', defaultGram: 100 },
    { name: 'Tên món 2', defaultGram: 150 }
  ]
};
```

### Thay đổi màu sắc
Mở file `style.css` và tìm các dòng gradient:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## 🚀 Tính năng nâng cao

1. **Gợi ý mã**: Khi gõ, extension sẽ gợi ý các mã phù hợp
2. **Mã nhanh**: Click vào các nút mã ở dưới để tìm kiếm nhanh
3. **Chọn tất cả**: Nút để chọn/bỏ chọn tất cả món cùng lúc
4. **Số lượng gram tùy chỉnh**: Mỗi món có ô nhập riêng
5. **Thông báo đẹp**: Hiển thị thông báo khi thêm món thành công

## 📱 Responsive

Extension hoạt động tốt trên:
- Desktop (màn hình lớn)
- Laptop (màn hình vừa)
- Tablet (tự động thu nhỏ)

## 🐛 Xử lý lỗi

Nếu gặp vấn đề:
1. Kiểm tra Console (F12) để xem lỗi
2. Đảm bảo đang ở đúng trang thực đơn
3. Thử tải lại trang (F5)
4. Kiểm tra extension đã được bật

## 📄 Cấu trúc file

```
school-center-autofill/
├── manifest.json       # Cấu hình extension
├── content.js          # Logic chính
├── style.css          # Giao diện
├── icon16.png         # Icon 16x16
├── icon48.png         # Icon 48x48
├── icon128.png        # Icon 128x128
└── README.md          # Hướng dẫn này
```

## 🎯 Workflow sử dụng

1. **Nhập mã** → Gõ "GẠO" vào ô input
2. **Tìm kiếm** → Click nút 🔍 hoặc Enter
3. **Chọn món** → Tick vào các món muốn thêm
4. **Điền gram** → Nhập số lượng gram cho mỗi món
5. **Thêm vào menu** → Click "Thêm món đã chọn"
6. **Hoàn tất** → Món được thêm vào thực đơn!

## 💡 Tips

- Dùng phím **Enter** để tìm kiếm nhanh
- Click vào **mã nhanh** ở dưới để không phải gõ
- Dùng **Chọn tất cả** khi muốn thêm hết món
- Số gram mặc định đã được set sẵn, chỉ cần sửa nếu cần

## 🔄 Cập nhật

Để cập nhật extension:
1. Tải phiên bản mới
2. Vào `chrome://extensions/`
3. Click nút **Reload** ở extension này

## 📞 Hỗ trợ

Nếu cần hỗ trợ:
- Kiểm tra file README này
- Xem code trong `content.js` để hiểu logic
- Sửa `foodDatabase` để thêm món mới

## ⚡ Performance

Extension được tối ưu:
- Chỉ chạy trên trang thực đơn
- Không ảnh hưởng đến tốc độ trang
- Sử dụng animation mượt mà
- Code gọn nhẹ, dễ maintain

## 🎨 Customization

Bạn có thể tùy chỉnh:
- Màu sắc gradient
- Vị trí hiển thị (bottom-left mặc định)
- Kích thước panel
- Danh sách món ăn
- Số gram mặc định

Chúc bạn sử dụng hiệu quả! 🎉
