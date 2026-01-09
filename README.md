# 🧪 Unit Test Exam (Vitest)

![Coverage](https://github.com/kietlt2/unit-test-exam/actions/workflows/coverage.yml/badge.svg)

## 📌 Overview

This project demonstrates **unit testing best practices** using:

- **Vitest**
- **coverage-v8**
- **GitHub Actions CI**
- **GitHub Pages for coverage report**

It is designed as a reference for:
- Writing meaningful unit tests
- Handling edge cases & branches
- Automating test & coverage pipelines

---

## 🧰 Tech Stack

- Node.js `>=18`
- TypeScript
- Vitest
- @vitest/coverage-v8

---

## 🚀 Scripts

```bash
npm run test           # run tests
npm run test:coverage  # run tests with coverage

## Tiêu chí để đánh giá

- [x] Danh sách các checklist (test cases) trước khi viết unit test.
- [x] Độ bao phủ (Code Coverage).
- [x] Coverage đầy đủ line, condition, branch.
- [x] Tuân thủ best pratice, clean code.
- [x] Có khả năng verify kết quả unit test.

### Lưu ý khi làm bài

- Viết unit test cho các hàm trong folder services.
- Có Sử dụng mock, stub và spy
- Fix và Refactor code để đạt chuẩn theo nguyên tắc SOLID là một lợi thế.

## Cách nộp bài

1. Sử dụng gist hoặc repo public để submit kết quả
2. Kết quả submit sẽ gồm các file về unit testing sau khi làm là đủ (có thể submit luôn source code nếu muốn - optional)
3. Evidence kết quả coverage cũng được submit vào gist hoặc repo public trên.
  - Nếu dùng gist: Thì capture screen đủ số hình để hiển thị kết quả coverage.
  - Nếu dùng repo: Thì có thể push cả file report coverage lên.
4. Sau khi làm xong, lấy link của gist hoặc repo public thì submit link vào Google Form.
