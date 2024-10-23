export const ARTICLE_MEDIA = "Article";
export const BOOK_MEDIA = "Book";
export const COURSE_MEDIA = "Course";
export const LIVE_TALK_MEDIA = "Live Talk";
export const OTHER_MEDIA = "Other";
export const PODCAST_MEDIA = "Podcast";
export const TALK_MEDIA = "Talk";
export const VIDEO_MEDIA = "Video";

export const MEDIAS = [
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  COURSE_MEDIA,
  LIVE_TALK_MEDIA,
  OTHER_MEDIA,
  PODCAST_MEDIA,
  TALK_MEDIA,
  VIDEO_MEDIA,
] as const;

export const BUSINESS_CATEGORY = "Business";
export const DEVELOPMENT_CATEGORY = "Development";
export const DESIGN_CATEGORY = "Design";
export const PSYCHOLOGY_CATEGORY = "Psychology";
export const CHESS_CATEGORY = "Chess";
export const OTHER_CATEGORY = "Other";

export const CATEGORIES = [
  BUSINESS_CATEGORY,
  DEVELOPMENT_CATEGORY,
  DESIGN_CATEGORY,
  PSYCHOLOGY_CATEGORY,
  CHESS_CATEGORY,
  OTHER_CATEGORY,
] as const;

export const RUBY_TECHNOLOGY = "Ruby";
export const TYPESCRIPT_TECHNOLOGY = "TypeScript";
export const GIT_TECHNOLOGY = "Git";

export const TECHNOLOGIES = [RUBY_TECHNOLOGY, GIT_TECHNOLOGY, TYPESCRIPT_TECHNOLOGY] as const;
