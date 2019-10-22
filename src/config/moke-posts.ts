export interface Post {
  title: string;
  excerpt: string;
  image: string;
}

export const posts: Post[] = [
  {
    title: "My first post",
    excerpt: "This is my first post with more content inside",
    image: "https://picsum.photos/200/300?random=1"
  },

  {
    title: "My second post",
    excerpt: "This is my second post with more content inside",
    image: "https://picsum.photos/200/300?random=2"
  },

  {
    title: "My third post",
    excerpt: "This is my third post with more content inside",
    image: "https://picsum.photos/200/300?random=3"
  },

  {
    title: "My fourth post",
    excerpt: "This is my fourth post with more content inside",
    image: "https://picsum.photos/200/300?random=4"
  },

  {
    title: "My fifth post",
    excerpt: "This is my fifth post with more content inside",
    image: "https://picsum.photos/200/300?random=5"
  },

  {
    title: "My sixth post",
    excerpt: "This is my sixth post with more content inside",
    image: "https://picsum.photos/200/300?random=6"
  }
]