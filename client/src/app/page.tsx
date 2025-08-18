'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 示例Prompt数据
const samplePrompts = [
  {
    id: 1,
    title: "赛博朋克城市夜景",
    description: "未来主义城市，霓虹灯闪烁，雨夜氛围，高质量渲染",
    image: "https://picsum.photos/300/400?random=1",
    model: "Midjourney",
    likes: 1234,
    copies: 567,
    prompt: "cyberpunk city at night, neon lights, rain, futuristic architecture --ar 16:9 --v 6"
  },
  {
    id: 2,
    title: "梦幻森林精灵",
    description: "魔法森林中的神秘精灵，发光蝴蝶环绕",
    image: "https://picsum.photos/300/500?random=2",
    model: "DALL·E",
    likes: 892,
    copies: 234,
    prompt: "magical forest fairy with glowing butterflies, ethereal lighting, fantasy art style"
  },
  {
    id: 3,
    title: "商业计划书助手",
    description: "帮助创业者制定详细的商业计划书模板",
    image: "https://picsum.photos/300/350?random=3",
    model: "ChatGPT",
    likes: 2156,
    copies: 1023,
    prompt: "Act as a business plan consultant. Help me create a comprehensive business plan for..."
  },
  {
    id: 4,
    title: "水彩风景画",
    description: "温柔的水彩风格山水画，宁静致远",
    image: "https://picsum.photos/300/450?random=4",
    model: "Stable Diffusion",
    likes: 756,
    copies: 189,
    prompt: "watercolor landscape painting, serene mountains, soft colors, traditional Chinese style"
  },
  {
    id: 5,
    title: "科技产品介绍",
    description: "专业的科技产品营销文案生成器",
    image: "https://picsum.photos/300/380?random=5",
    model: "Gemini",
    likes: 1445,
    copies: 678,
    prompt: "Create compelling product descriptions for tech gadgets, focusing on benefits and features..."
  },
  {
    id: 6,
    title: "抽象艺术创作",
    description: "现代抽象艺术风格，色彩丰富，构图独特",
    image: "https://picsum.photos/300/520?random=6",
    model: "Midjourney",
    likes: 634,
    copies: 145,
    prompt: "abstract modern art, vibrant colors, geometric shapes, contemporary style --ar 1:1"
  }
];

const filters = ['全部', 'Midjourney', 'DALL·E', 'Stable Diffusion', 'ChatGPT', 'Gemini', '文本生成', '图像生成', '视频生成'];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [prompts, setPrompts] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const duplicatedPrompts = [];
    const heights = [400, 500, 350, 450, 380, 520]; // 对应原始数据的高度
    for (let i = 0; i < 3; i++) {
      samplePrompts.forEach((prompt, index) => {
        duplicatedPrompts.push({
          ...prompt,
          id: `${prompt.id}-${i}`,
          image: `https://picsum.photos/300/${heights[index]}?random=${prompt.id + i * 10}`
        });
      });
    }
    setPrompts(duplicatedPrompts.sort(() => Math.random() - 0.5));
  }, []);
  const [activeFilter, setActiveFilter] = useState('全部');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt).then(() => {
      alert('Prompt已复制到剪贴板！');
    });
  };

  const likePrompt = (id: number) => {
    alert(`已点赞Prompt ${id}`);
  };

  const savePrompt = (id: number) => {
    alert(`已收藏Prompt ${id}`);
  };

  const openPromptDetail = (id: number) => {
    router.push(`/detail?id=${id}`);
  };

  const loadMorePrompts = () => {
    const timestamp = Date.now();
    const morePrompts = samplePrompts.map((prompt, index) => ({
      ...prompt,
      id: `${prompt.id}-${timestamp}-${index}`,
      image: `https://picsum.photos/300/${300 + Math.floor(Math.random() * 300)}?random=${timestamp + index}`
    }));
    setPrompts(prev => [...prev, ...morePrompts]);
  };

  return (
    <>
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="logo">PromptGallery</Link>
          <ul className="nav-links">
            <li><Link href="/">首页</Link></li>
            <li><Link href="/search">发现</Link></li>
            <li><Link href="/community">社区</Link></li>
            <li><Link href="/api">API</Link></li>
          </ul>
          <div className="user-actions">
            <Link href="/login" className="btn btn-outline">登录</Link>
            <Link href="/register" className="btn btn-primary">注册</Link>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="main-content">
        {/* 搜索区域 */}
        <section className="search-section">
          <h1 className="search-title">PromptGallery</h1>
          <p className="search-subtitle">跨AI模型的高质量Prompt库与社区生态</p>
          <div className="search-container">
            <input 
              type="text" 
              className="search-box" 
              placeholder="搜索Prompt、AI模型、风格标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-btn" onClick={handleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </section>

        {/* 筛选标签 */}
        <section className="filter-tags">
          {filters.map(filter => (
            <div 
              key={filter}
              className={`filter-tag ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </div>
          ))}
        </section>

        {/* 瀑布流画廊 */}
        <section className="gallery-container">
          <div className="gallery-grid">
            {!isClient ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                加载中...
              </div>
            ) : (
              prompts.map((prompt) => (
              <div key={prompt.id} className="prompt-card" onClick={() => openPromptDetail(prompt.id)}>
                <img src={prompt.image} alt={prompt.title} className="card-image" />
                <div className="card-content">
                  <h3 className="card-title">{prompt.title}</h3>
                  <p className="card-description">{prompt.description}</p>
                  <div className="card-meta">
                    <span className="ai-model-tag">{prompt.model}</span>
                    <div className="card-stats">
                      <span><i className="fas fa-heart"></i> {prompt.likes}</span>
                      <span><i className="fas fa-copy"></i> {prompt.copies}</span>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="action-btn" onClick={(e) => { e.stopPropagation(); likePrompt(prompt.id); }}>
                      <i className="fas fa-heart"></i>
                    </button>
                    <button className="action-btn" onClick={(e) => { e.stopPropagation(); savePrompt(prompt.id); }}>
                      <i className="fas fa-bookmark"></i>
                    </button>
                    <button className="action-btn copy-btn" onClick={(e) => { e.stopPropagation(); copyPrompt(prompt.prompt); }}>
                      <i className="fas fa-copy"></i> 复制
                    </button>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </section>

        {/* 加载更多 */}
        <section className="load-more">
          <button className="load-more-btn" onClick={loadMorePrompts}>
            <i className="fas fa-plus"></i> 加载更多
          </button>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="/about">关于我们</Link>
            <Link href="/terms">使用条款</Link>
            <Link href="/privacy">隐私政策</Link>
            <Link href="/api-docs">API文档</Link>
            <Link href="/help">帮助中心</Link>
            <Link href="/contact">联系我们</Link>
          </div>
          <div className="copyright">
            © 2025 PromptGallery. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
