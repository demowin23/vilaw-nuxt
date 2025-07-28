const { Pool } = require("pg");

// Cấu hình database
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "vilaw_db",
  user: "postgres",
  password: "password",
});

async function addApprovalFields() {
  const client = await pool.connect();

  try {
    console.log("Bắt đầu thêm trường is_approved...");

    // Danh sách các bảng cần thêm trường is_approved
    const tables = [
      "legal_documents",
      "legal_news",
      "legal_knowledge",
      "video_life_law",
      "legal_fields",
      "category",
    ];

    for (const table of tables) {
      try {
        // Kiểm tra xem trường is_approved đã tồn tại chưa
        const checkQuery = `
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = $1 AND column_name = 'is_approved'
        `;

        const checkResult = await client.query(checkQuery, [table]);

        if (checkResult.rows.length === 0) {
          // Thêm trường is_approved nếu chưa tồn tại
          const addQuery = `
            ALTER TABLE ${table} 
            ADD COLUMN is_approved BOOLEAN DEFAULT false
          `;

          await client.query(addQuery);
          console.log(`✅ Đã thêm trường is_approved vào bảng ${table}`);

          // Cập nhật tất cả record hiện tại thành approved (để tương thích với dữ liệu cũ)
          const updateQuery = `
            UPDATE ${table} 
            SET is_approved = true 
            WHERE is_approved IS NULL OR is_approved = false
          `;

          await client.query(updateQuery);
          console.log(`✅ Đã cập nhật dữ liệu cũ trong bảng ${table}`);
        } else {
          console.log(`⚠️ Trường is_approved đã tồn tại trong bảng ${table}`);
        }
      } catch (error) {
        console.error(`❌ Lỗi khi xử lý bảng ${table}:`, error.message);
      }
    }

    console.log("✅ Hoàn thành thêm trường is_approved cho tất cả bảng!");
  } catch (error) {
    console.error("❌ Lỗi:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Chạy script
addApprovalFields().catch(console.error);
