const defaultNewsData = {
  announcement: '7月30日发布：鸿耀鑫最新喷涂线案例上线，支持批量定制与工艺优化咨询。',
  articles: [
    {
      id: 1,
      title: '双工位烫画机日常保养全方案',
      summary: '从温控校准到气缸润滑，打造稳定运行的保养清单。',
      image: 'images/news/Trade_Fair/微信图片_20260730173517_16_23.jpg',
      date: '2026-07-30',
      category: '设备保养',
      type: 'hot',
      link: 'contact.html'
    },
    {
      id: 2,
      title: '衣架自动喷涂生产线工厂实拍',
      summary: '展示从上料到烘干的整线作业流程，适合客户现场评估。',
      image: 'images/news/Trade_Fair/微信图片_20260730173518_17_23.jpg',
      date: '2026-07-30',
      category: '案例展示',
      type: 'hot',
      link: 'contact.html'
    },
    {
      id: 3,
      title: '多款烫画机配置参数对比',
      summary: '对比产能、功率与适配场景，帮助用户更高效选型。',
      image: 'images/news/Trade_Fair/微信图片_20260730173519_18_23.jpg',
      date: '2026-07-30',
      category: '选型指南',
      type: 'normal',
      link: 'contact.html'
    },
    {
      id: 4,
      title: '行业动态：智能工厂与节能改造',
      summary: '解读制衣设备智能升级趋势，助力生产线降本增效。',
      image: 'images/news/Trade_Fair/微信图片_20260730173520_19_23.jpg',
      date: '2026-07-29',
      category: '行业热点',
      type: 'normal',
      link: 'contact.html'
    }
  ]
};

function createNewsCard(item, locale) {
  const card = document.createElement('article');
  card.className = 'news-card';
  const buttonText = locale === 'en' ? 'View Details' : '查看详情';
  card.innerHTML = `
    <img src="${item.image}" alt="${item.title}" />
    <div class="card-body">
      <div class="card-meta">
        <span>${item.date}</span>
        <span class="tag">${item.category}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <a class="btn" href="${item.link}">${buttonText}</a>
    </div>
  `;
  return card;
}

function renderNews(data, locale) {
  const announcementText = document.getElementById('announcementText');
  const hotNewsContainer = document.getElementById('hotNews');
  const newsListContainer = document.getElementById('newsList');

  if (announcementText) {
    announcementText.textContent = data.announcement || '';
  }

  if (hotNewsContainer) {
    const hotItems = (data.articles || []).filter((item) => item.type === 'hot').slice(0, 3);
    hotItems.forEach((item) => hotNewsContainer.appendChild(createNewsCard(item, locale)));
  }

  if (newsListContainer) {
    const otherItems = (data.articles || []).filter((item) => item.type !== 'hot');
    otherItems.forEach((item) => newsListContainer.appendChild(createNewsCard(item, locale)));
  }
}

async function loadNewsData() {
  const lang = document.documentElement.lang || 'zh';
  const locale = lang.includes('en') ? 'en' : 'zh';
  const dataFile = locale === 'en' ? 'news-data-en.json' : 'news-data.json';

  try {
    const response = await fetch(dataFile, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load ${dataFile}: ${response.status}`);
    }
    const data = await response.json();
    renderNews(data, locale);
  } catch (error) {
    console.warn('news-data.js fallback to embedded data:', error);
    renderNews(defaultNewsData, locale);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNewsData);
} else {
  loadNewsData();
}
