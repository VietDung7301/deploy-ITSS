## Installation
### Yêu cầu
Cài đặt nodeJs version v18+ (Nếu sử dụng node khác có thể xảy ra tình trạng không tương thích phiên bản)

Cài đặt MySQL-server
### Các bước tiến hành
#### 1. Cài đặt server
```shell
yarn install
```
#### 2. Tạo database
Tạo 1 database mysql mới. Database tên gì cũng được, nhưng phải trùng với `DB_NAME` trong file `.env`
#### 2. Init DB
Lệnh sau sẽ tạo ra các bảng trong database vừa tạo
```shell
yarn db
```
#### 3. Khởi động server
```shell
yarn run dev
```
 