<template>
  <div class="video-detail-page grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
    <!-- Video Player -->
    <div class="col-span-2 bg-white rounded-xl shadow p-4 flex flex-col">
      <div v-if="video" class="video-player-wrapper mb-4">
        <video
          ref="plyrVideo"
          v-if="video.video"
          :poster="getImageUrl(video.img)"
          controls
          crossorigin
          playsinline
          class="video-contain"
        >
          <source :src="getVideoUrl(video.video)" type="video/mp4" label="HD" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>
      <div v-if="video">
        <h1 class="text-2xl font-bold mb-2">{{ video.title }}</h1>

        <!-- Video Stats -->
        <div class="flex items-center justify-between mb-4">
          <div class="text-gray-600">{{ video.view_count }} lượt xem</div>
          <div class="flex items-center gap-4">
            <!-- Like/Dislike Buttons -->
            <div class="flex items-center gap-2">
              <button
                @click="handleLike('like')"
                :class="[
                  'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  video.user_action === 'like'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ]"
                :disabled="isLoading"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                  />
                </svg>
                <span>{{ video.like_count }}</span>
              </button>
              <button
                @click="handleLike('dislike')"
                :class="[
                  'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors',
                  video.user_action === 'dislike'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ]"
                :disabled="isLoading"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z"
                  />
                </svg>
                <span>{{ video.dislike_count }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Hashtags -->
        <div v-if="video.hashtags && video.hashtags.length > 0" class="mb-4">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in video.hashtags"
              :key="tag"
              class="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
              @click="searchByHashtag(tag)"
            >
              #{{ tag }}
            </span>
          </div>
        </div>

        <div class="text-gray-700 mb-4" v-html="video.description"></div>
      </div>
      <div v-else class="text-center py-10 text-gray-400">
        Đang tải video...
      </div>
      <div v-if="video" class="col-span-2 bg-white rounded-xl shadow p-4">
        <h3 class="text-xl font-bold mb-4">
          Bình luận ({{ comments.length }})
        </h3>

        <!-- Add Comment -->
        <div class="mb-6">
          <div class="flex gap-3">
            <div class="flex-shrink-0">
              <div
                class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
              >
                <span class="text-gray-600 font-medium">U</span>
              </div>
            </div>
            <div class="flex-1">
              <textarea
                v-model="newComment"
                placeholder="Viết bình luận..."
                class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              ></textarea>
              <div class="flex justify-end mt-2">
                <button
                  @click="addComment"
                  :disabled="!newComment.trim() || isCommentLoading"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isCommentLoading ? "Đang gửi..." : "Gửi bình luận" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Comments List -->
        <div class="space-y-4">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div class="flex gap-3">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
                >
                  <span class="text-gray-600 font-medium">{{
                    comment.user_name.charAt(0)
                  }}</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-medium">{{ comment.user_name }}</span>
                  <span class="text-gray-500 text-sm">{{
                    formatDate(comment.ts_create)
                  }}</span>
                  <span
                    v-if="comment.user_role === 'admin'"
                    class="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs"
                  >
                    Admin
                  </span>
                </div>
                <p class="text-gray-700 mb-2">{{ comment.content }}</p>

                <!-- Comment Actions -->
                <div class="flex items-center gap-4 text-sm">
                  <button
                    @click="likeComment(comment.id)"
                    :class="[
                      'flex items-center gap-1 transition-colors',
                      comment.user_liked
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-blue-600',
                    ]"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                      />
                    </svg>
                    <span>{{ comment.like_count }}</span>
                  </button>
                  <button
                    @click="showReplyInput(comment.id)"
                    class="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    Trả lời
                  </button>
                  <button
                    v-if="canDeleteComment(comment)"
                    @click="deleteComment(comment.id)"
                    class="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Xóa
                  </button>
                </div>

                <!-- Reply Input -->
                <div v-if="replyingTo === comment.id" class="mt-3">
                  <div class="flex gap-2">
                    <textarea
                      v-model="replyContent"
                      placeholder="Viết trả lời..."
                      class="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                    ></textarea>
                    <div class="flex flex-col gap-1">
                      <button
                        @click="submitReply(comment.id)"
                        :disabled="!replyContent.trim() || isCommentLoading"
                        class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Gửi
                      </button>
                      <button
                        @click="cancelReply"
                        class="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Replies -->
                <div
                  v-if="comment.replies && comment.replies.length > 0"
                  class="mt-3 ml-6 space-y-3"
                >
                  <div
                    v-for="reply in comment.replies"
                    :key="reply.id"
                    class="border-l-2 border-gray-200 pl-4"
                  >
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-medium text-sm">{{
                        reply.user_name
                      }}</span>
                      <span class="text-gray-500 text-xs">{{
                        formatDate(reply.ts_create)
                      }}</span>
                    </div>
                    <p class="text-gray-700 text-sm mb-1">
                      {{ reply.content }}
                    </p>
                    <div class="flex items-center gap-3 text-xs">
                      <button
                        @click="likeComment(reply.id)"
                        :class="[
                          'flex items-center gap-1 transition-colors',
                          reply.user_liked
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-blue-600',
                        ]"
                      >
                        <svg
                          class="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                          />
                        </svg>
                        <span>{{ reply.like_count }}</span>
                      </button>
                      <button
                        v-if="canDeleteComment(reply)"
                        @click="deleteComment(reply.id)"
                        class="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More Comments -->
          <div v-if="hasMoreComments" class="text-center">
            <button
              @click="loadMoreComments"
              :disabled="isLoading"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              {{ isLoading ? "Đang tải..." : "Tải thêm bình luận" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Videos -->
    <div class="col-span-1 space-y-4">
      <h3 class="text-xl font-bold mb-4">Video nổi bật</h3>
      <div v-if="relatedVideos.length > 0" class="space-y-4">
        <div
          v-for="video in relatedVideos"
          :key="video.id"
          class="flex gap-3 bg-white rounded-xl shadow p-3 hover:shadow-md transition-shadow cursor-pointer"
          @click="router.push(`/video/${video.id}-${slugify(video.title)}`)"
        >
          <div class="relative w-40 h-24 flex-shrink-0">
            <img
              :src="getImageUrl(video.img)"
              :alt="video.title"
              class="w-full h-full object-cover rounded-lg"
            />
            <span
              class="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded"
            >
              {{ formatDuration(video.duration) }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-sm line-clamp-2 mb-1">
              {{ video.title }}
            </h4>
            <div class="text-xs text-gray-500">
              {{ video.view_count }} lượt xem
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4 text-gray-500">
        Không có video liên quan
      </div>
    </div>

    <!-- Comments Section -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVideoLifeLaw } from "~/composables/useVideoLifeLaw";
import { useAuth } from "~/composables/useAuth";
import { useNotification } from "~/composables/useNotification";
import { useSeo } from "~/composables/useSeo";
import VideoList from "~/components/VideoList.vue";
import { slugify } from "~/utils/slugify";

const route = useRoute();
const router = useRouter();
const {
  getVideoLifeLawById,
  getVideoLifeLaw,
  likeVideo,
  getComments,
  addComment: addCommentApi,
  likeComment: likeCommentApi,
  deleteComment: deleteCommentApi,
} = useVideoLifeLaw();
const { user, isAuthenticated } = useAuth();
const { handleApiError, handleApiSuccess } = useNotification();

const video = ref<any>(null);
const relatedVideos = ref<any[]>([]);
const comments = ref<any[]>([]);
const plyrVideo = ref<HTMLVideoElement | null>(null);
const isLoading = ref(false);
const isCommentLoading = ref(false);
const newComment = ref("");
const replyContent = ref("");
const replyingTo = ref<number | null>(null);
const currentPage = ref(1);
const hasMoreComments = ref(true);

import { getImageUrl, getVideoUrl } from "~/utils/config";

let plyrInstance: any = null;

const formatDuration = (seconds: number) => {
  if (!seconds) return "";
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, "0")}` + " phút";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Vừa xong";
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} ngày trước`;
  return date.toLocaleDateString("vi-VN");
};

const setupPlyr = async () => {
  if (typeof window === "undefined") return;
  if (plyrInstance) {
    plyrInstance.destroy();
    plyrInstance = null;
  }
  if (plyrVideo.value) {
    const Plyr = (await import("plyr")).default;
    await import("plyr/dist/plyr.css");
    plyrInstance = new Plyr(plyrVideo.value, {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "settings",
        "fullscreen",
      ],
      settings: ["quality", "speed", "loop"],
      i18n: { qualityLabel: "Chất lượng" },
      ratio: "16:9",
    });
  }
};

const fetchVideo = async (id: number) => {
  try {
    const res = await getVideoLifeLawById(id);
    video.value = res.data;
    await nextTick();
    setupPlyr();

    // Set SEO for video
    if (video.value) {
      const { setVideoSeo } = useSeo();
      setVideoSeo({
        title: video.value.title,
        description: video.value.description,
        thumbnail: video.value.img,
        duration: video.value.duration,
        publishedTime: video.value.ts_update,
        tags: video.value.hashtags,
      });
    }
  } catch (error) {
    handleApiError(error, "Không thể tải video");
  }
};

const fetchRelatedVideos = async (currentId: number) => {
  try {
    const res = await getVideoLifeLaw({ limit: 8 });
    relatedVideos.value = (res.data || []).filter(
      (v: any) => v.id !== currentId
    );
  } catch (error) {
    handleApiError(error, "Không thể tải video liên quan");
  }
};

const fetchComments = async (videoId: number, page = 1) => {
  try {
    const res = await getComments(videoId, { page, limit: 20 });
    if (page === 1) {
      comments.value = res.data;
    } else {
      comments.value.push(...res.data);
    }
    hasMoreComments.value = page < res.pagination.totalPages;
    currentPage.value = page;
  } catch (error) {
    handleApiError(error, "Không thể tải bình luận");
  }
};

const handleLike = async (action: "like" | "dislike") => {
  if (!isAuthenticated.value) {
    handleApiError(
      new Error("Vui lòng đăng nhập để thực hiện hành động này"),
      "Cần đăng nhập"
    );
    return;
  }

  try {
    const res = await likeVideo(video.value.id, action);
    // Cập nhật trạng thái like/dislike
    if (video.value.user_action === action) {
      video.value.user_action = null;
      if (action === "like") {
        video.value.like_count--;
      } else {
        video.value.dislike_count--;
      }
    } else {
      if (video.value.user_action === "like" && action === "dislike") {
        video.value.like_count--;
        video.value.dislike_count++;
      } else if (video.value.user_action === "dislike" && action === "like") {
        video.value.dislike_count--;
        video.value.like_count++;
      } else {
        if (action === "like") {
          video.value.like_count++;
        } else {
          video.value.dislike_count++;
        }
      }
      video.value.user_action = action;
    }
    handleApiSuccess(res, res.message);
  } catch (error) {
    handleApiError(error, "Không thể thực hiện hành động");
  }
};

const addComment = async () => {
  if (!isAuthenticated.value) {
    handleApiError(
      new Error("Vui lòng đăng nhập để bình luận"),
      "Cần đăng nhập"
    );
    return;
  }

  if (!newComment.value.trim()) return;

  try {
    isCommentLoading.value = true;
    const res = await addCommentApi(video.value.id, newComment.value.trim());
    comments.value.unshift(res.data);
    newComment.value = "";
    handleApiSuccess(res, "Bình luận đã được gửi");
  } catch (error) {
    handleApiError(error, "Không thể gửi bình luận");
  } finally {
    isCommentLoading.value = false;
  }
};

const submitReply = async (commentId: number) => {
  if (!isAuthenticated.value) {
    handleApiError(new Error("Vui lòng đăng nhập để trả lời"), "Cần đăng nhập");
    return;
  }

  if (!replyContent.value.trim()) return;

  try {
    isCommentLoading.value = true;
    const res = await addCommentApi(
      video.value.id,
      replyContent.value.trim(),
      commentId
    );

    // Tìm comment gốc và thêm reply
    const parentComment = comments.value.find((c) => c.id === commentId);
    if (parentComment) {
      if (!parentComment.replies) parentComment.replies = [];
      parentComment.replies.push(res.data);
      parentComment.reply_count++;
    }

    replyContent.value = "";
    replyingTo.value = null;
    handleApiSuccess(res, "Trả lời đã được gửi");
  } catch (error) {
    handleApiError(error, "Không thể gửi trả lời");
  } finally {
    isCommentLoading.value = false;
  }
};

const likeComment = async (commentId: number) => {
  if (!isAuthenticated.value) {
    handleApiError(
      new Error("Vui lòng đăng nhập để thích bình luận"),
      "Cần đăng nhập"
    );
    return;
  }

  try {
    await likeCommentApi(commentId);

    // Cập nhật trạng thái like trong comments
    const updateCommentLike = (commentList: any[]) => {
      for (const comment of commentList) {
        if (comment.id === commentId) {
          comment.user_liked = !comment.user_liked;
          comment.like_count += comment.user_liked ? 1 : -1;
          return true;
        }
        if (comment.replies && updateCommentLike(comment.replies)) {
          return true;
        }
      }
      return false;
    };

    updateCommentLike(comments.value);
  } catch (error) {
    handleApiError(error, "Không thể thích bình luận");
  }
};

const deleteComment = async (commentId: number) => {
  if (!confirm("Bạn có chắc muốn xóa bình luận này?")) return;

  try {
    await deleteCommentApi(commentId);

    // Xóa comment khỏi danh sách
    const removeComment = (commentList: any[]) => {
      const index = commentList.findIndex((c) => c.id === commentId);
      if (index !== -1) {
        commentList.splice(index, 1);
        return true;
      }
      for (const comment of commentList) {
        if (comment.replies && removeComment(comment.replies)) {
          return true;
        }
      }
      return false;
    };

    removeComment(comments.value);
    handleApiSuccess({ message: "Đã xóa bình luận" }, "Bình luận đã được xóa");
  } catch (error) {
    handleApiError(error, "Không thể xóa bình luận");
  }
};

const canDeleteComment = (comment: any) => {
  if (!isAuthenticated.value) return false;
  return user.value?.role === "admin" || comment.user_name === user.value?.name;
};

const showReplyInput = (commentId: number) => {
  if (!isAuthenticated.value) {
    handleApiError(new Error("Vui lòng đăng nhập để trả lời"), "Cần đăng nhập");
    return;
  }
  replyingTo.value = commentId;
  replyContent.value = "";
};

const cancelReply = () => {
  replyingTo.value = null;
  replyContent.value = "";
};

const loadMoreComments = async () => {
  if (isLoading.value || !hasMoreComments.value) return;
  await fetchComments(video.value.id, currentPage.value + 1);
};

const searchByHashtag = (hashtag: string) => {
  router.push(`/phap-luat-doi-song?hashtag=${hashtag}`);
};

onMounted(() => {
  if (typeof window === "undefined") return;
  const idParam = route.params.id as string;
  // Extract ID from URL like "123-title-slug" -> "123"
  const id = Number(idParam?.split("-")[0]);
  fetchVideo(id);
  fetchRelatedVideos(id);
  fetchComments(id);
});

watch(
  () => route.params.id,
  (newId) => {
    if (typeof window === "undefined") return;
    const idParam = newId as string;
    // Extract ID from URL like "123-title-slug" -> "123"
    const id = Number(idParam?.split("-")[0]);
    fetchVideo(id);
    fetchRelatedVideos(id);
    fetchComments(id);
    currentPage.value = 1;
    hasMoreComments.value = true;
  }
);

onBeforeUnmount(() => {
  if (plyrInstance) {
    plyrInstance.destroy();
    plyrInstance = null;
  }
});
</script>

<style scoped>
.video-player-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  background: #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}
.video-contain {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
}
.plyr {
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
}
</style>
