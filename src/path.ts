interface Path {
  home(): string;
  topicShow(topicSlug: string): string;
  postCreate(topicSlug: string): string;
  postShow(topicSlug: string, postId: string): string;
}

export const path: Path = {
  home() {
    return "/";
  },
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  postCreate(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  postShow(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  }
};
