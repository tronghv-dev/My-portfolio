<!-- Phiên bản tiếng Việt — tạo bởi AI để giúp agent nhanh làm việc trong repo này. -->

# Hướng dẫn cho Copilot / AI agent — portfolio frontend

Mục đích: giúp các tác nhân AI nhanh chóng trở nên hữu dụng trong kho mã này (một trang portfolio tĩnh).

- **Loại dự án:** Trang tĩnh HTML/CSS (không có hệ thống build, không dùng framework JS). Tập tin chính: `index.html` ở thư mục gốc `portfolio/`.
- **Cấu trúc thư mục chính:**
  - `portfolio/index.html` — điểm vào của site.
  - `portfolio/css/` — chứa toàn bộ stylesheet. Các file quan trọng: `css/main.css`, `css/theme.css`, `css/reponsive.css` (chú ý chính tả hiện tại).
  - `portfolio/css/sections/` — CSS cho từng phần (ví dụ: `about--me.css`, `header.css`, `footer.css`).
  - `portfolio/assets/` — ảnh, icon và tài nguyên tĩnh.

Tóm tắt nhanh các quy ước và vấn đề đã phát hiện

- Đây là một portfolio viết tay, một trang (HTML + CSS). Hầu hết thay đổi sẽ là sửa `index.html` và file CSS trong `css/`.
- `css/main.css` tập trung `@import` các file `theme.css` và các file trong `css/sections/` — nếu thêm phần mới, hãy thêm file CSS mới vào `css/sections/` và `@import` vào `main.css`.
- Có một vài bất nhất về đường dẫn/chuỗi trong markup (xem ví dụ bên dưới) — kiểm tra kỹ khi sửa đường dẫn assets hoặc tham chiếu file.

Ví dụ cụ thể để làm việc nhanh

- Trong `index.html` hiện có lỗi favicon: `href` chứa dấu nháy thừa — `'./assets/rocket-icon.ico`. Sửa thành `./assets/rocket-icon.ico`.
- `index.html` đang tham chiếu `./css/reponsive.css` (chính tả là `reponsive.css`). Khi đổi tên file (ví dụ đổi thành `responsive.css`), cập nhật mọi tham chiếu cùng lúc.
- Khi thêm phần mới, giữ cấu trúc: tạo `css/sections/<phan-moi>.css` và thêm `@import` vào `css/main.css`.

Quy trình phát triển (những điều agent có thể giả định)

- Không có lệnh build hoặc test tự động. Xem trước bằng cách mở `portfolio/index.html` trong trình duyệt sau khi sửa → refresh để kiểm tra.
- Nếu bạn thêm công cụ (formatter, linter), đồng thời cập nhật `README.md` và thêm cấu hình ở gốc repo.

Quy ước code và phong cách

- Giữ styles liên quan đến layout/section trong `css/sections/`; để biến, token và quy tắc toàn cục trong `css/theme.css`.
- Tên class có phong cách BEM-like (ví dụ `header__container`, `header__column--left`) — tiếp tục theo phong cách này khi tạo class mới.

Điểm tích hợp và phụ thuộc ngoài

- Hai font được load từ Google Fonts (`fonts.googleapis.com`) trong `index.html`. Không thấy dependency khác (không có `package.json`, build tool, v.v.).

Khi không chắc chắn

- Nếu sửa thay đổi ảnh hưởng nhiều file (HTML + nhiều `@import` CSS), kiểm tra thủ công trên trình duyệt và ghi lại ngắn gọn thay đổi vào file này.

Những thứ không thể phát hiện tự động

- Repo không có `README.md` mô tả quy ước dev hoặc quyết định thiết kế. Nếu bạn muốn quy định rõ (quy tắc đặt tên, token màu, breakpoint responsive), hãy thêm vào đây.

Tôi có thể làm tiếp nếu bạn muốn:

- Sửa ngay `favicon` và tham chiếu `reponsive.css` để khắc phục lỗi nhanh.
- Tạo một `README.md` ngắn hướng dẫn cách xem trước site cục bộ.

Vui lòng kiểm tra và cho biết bạn muốn tôi thực hiện bước nào tiếp theo.
