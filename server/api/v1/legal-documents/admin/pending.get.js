export default defineEventHandler(async (event) => {
  try {
    // Kiểm tra quyền admin
    const user = await requireAuth(event);
    if (!user.isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage: "Không có quyền truy cập",
      });
    }

    const query = getQuery(event);
    const limit = parseInt(query.limit) || 10;
    const offset = parseInt(query.offset) || 0;

    // Lấy danh sách văn bản chờ duyệt
    const { data: documents, total } = await prisma.legalDocument.findMany({
      where: {
        is_approved: false,
      },
      include: {
        tags: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: limit,
      skip: offset,
    });

    // Đếm tổng số văn bản chờ duyệt
    const totalPending = await prisma.legalDocument.count({
      where: {
        is_approved: false,
      },
    });

    return {
      success: true,
      data: documents,
      total: totalPending,
      pagination: {
        limit,
        offset,
        total: totalPending,
      },
    };
  } catch (error) {
    console.error("Error fetching pending legal documents:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Lỗi khi lấy danh sách văn bản chờ duyệt",
    });
  }
});
