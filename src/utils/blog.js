function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: markdown };

  const frontmatterString = match[1];
  const content = match[2];

  const data = {};
  frontmatterString.split(/\r?\n/).forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  });

  return { data, content };
}

// Pobierz wszystkie pliki markdown z folderu blog
const mdFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', eager: true });

export function getAllPosts() {
  const posts = Object.entries(mdFiles).map(([path, file]) => {
    const rawContent = file.default || file;
    const { data, content } = parseFrontmatter(rawContent);

    return {
      title: data.title || 'Brak tytułu',
      description: data.description || '',
      date: data.date || '',
      slug: data.slug || path.replace('.md', '').split('/').pop(),
      content
    };
  });

  // Sortowanie po dacie od najnowszego
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
