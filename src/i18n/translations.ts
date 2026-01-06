export const translations = {
  ru: {
    // Navigation
    nav: {
      home: 'Главная',
      works: 'Мои работы',
      contacts: 'Контакты'
    },
    
    // Header
    header: {
      cta: 'Заказать дизайн'
    },
    
    // Hero Section
    hero: {
      title1: 'Дизайн,',
      title2: 'который работает'
    },
    
    // About Section
    about: {
      greeting: 'Привет! Меня зовут Луиза и я',
      title: 'графический\nи UX/UI-дизайнер',
      location: 'г. Санкт-Петербург',
      experience: 'Опыт: 4 года'
    },
    
    // Works Section
    works: {
      title: 'Cоздаю',
      categories: {
        identity: 'Айдентику',
        packaging: 'Дизайн упаковок',
        social: 'Дизайн для соц.сетей',
        presentations: 'Презентации',
        landing: 'Лендинг и сайты',
        mobile: 'Мобильные приложения'
      },
      viewAll: 'Посмотреть все проекты'
    },
    
    // Experience Section
    experience: {
      title: 'Опыт работы',
      jobs: [
        {
          title: 'Middle Graphic Designer',
          company: 'Компании "Терра Пласт", "Финслер пак" / Фрилапс',
          period: '2023 г. — настоящее время',
          tasks: [
            'Разработка айдентики, графических элементов и дизайн-материалов для веба и социальных сетей',
            'POS-материалы (разработка с нуля до подготовки к печати), создание визуальных концепций и работа с уже имеющимся стилем бренда',
            'Создание продуктовой фотографии под стиль бренда и создание мерча',
            'Создание с нуля дизайна упаковок для косметики, бытовой продукции и товаров для животных',
            'Разработка презентаций и веб-материалов для компаний, а также участие в создании лендинга для косметического бренда и сайта для бизнеса'
          ]
        },
        {
          title: 'Junior Graphic Designer',
          company: 'Компания "Хелон" / Фриланс',
          period: '2022 — 2023 гг.',
          tasks: [
            'Разработка визуального контента для маркетплейсов (Озон, ВБ, Яндекс маркет), создание фото/видео-материалов',
            'Создание с нуля дизайна упаковок для автопродукции'
          ]
        }
      ]
    },
    
    // Education Section
    education: {
      title: 'Образование',
      titleTools: 'Инструменты',
      items: [
        {
          years: '2018 — 2022 гг.',
          institution: 'Казанский государственный архитектурно-строительный университет',
          degree: 'Факультет Графического дизайна'
        },
        {
          years: '2023 — 2025 гг.',
          institution: 'Образовательная платформа Product Star',
          degree: 'курс UX/UI- дизайнер'
        }
      ]
    },
    
    // Contacts Section
    contacts: {
      title: 'Контакты',
      nextTitle: 'Что будет дальше?',
      nextSteps: [
        'я отвечу в течение 24 часов',
        'задам несколько вопросов',
        'предложу формат и сроки',
        'без обязательств и навязывания'
      ]
    },
    
    // Footer
    footer: {
      copyright: 'Мышиные права защищены'
    },
    
    // Language
    language: {
      current: 'РУ',
      switch: 'Switch to English'
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      works: 'My Works',
      contacts: 'Contacts'
    },
    
    // Header
    header: {
      cta: 'Order Design'
    },
    
    // Hero Section
    hero: {
      title1: 'Design',
      title2: 'that works'
    },
    
    // About Section
    about: {
      greeting: 'Hi! My name is Luiza and I am',
      title: 'graphic\nand UX/UI designer',
      location: 'Saint Petersburg',
      experience: 'Experience: 4 years'
    },
    
    // Works Section
    works: {
      title: 'I create',
      categories: {
        identity: 'Brand Identity',
        packaging: 'Packaging Design',
        social: 'Social Media Design',
        presentations: 'Presentations',
        landing: 'Landing Pages & Websites',
        mobile: 'Mobile Applications'
      },
      viewAll: 'View All Projects'
    },
    
    // Experience Section
    experience: {
      title: 'Work Experience',
      jobs: [
        {
          title: 'Middle Graphic Designer',
          company: 'Terra Plast, Finsler Pack / Freelance',
          period: '2023 — present',
          tasks: [
            'Development of brand identity, graphic elements and design materials for web and social media',
            'POS materials (from scratch to print preparation), creating visual concepts and working with existing brand style',
            'Creating product photography in brand style and merchandise design',
            'Creating packaging design from scratch for cosmetics, household products and pet supplies',
            'Developing presentations and web materials for companies, as well as participating in creating a landing page for a cosmetics brand and website for business'
          ]
        },
        {
          title: 'Junior Graphic Designer',
          company: 'Helon Company / Freelance',
          period: '2022 — 2023',
          tasks: [
            'Development of visual content for marketplaces (Ozon, WB, Yandex Market), creating photo/video materials',
            'Creating packaging design from scratch for automotive products'
          ]
        }
      ]
    },
    
    // Education Section
    education: {
      title: 'Education',
      titleTools: 'Tools',
      items: [
        {
          years: '2018 — 2022',
          institution: 'Kazan State University of Architecture and Engineering',
          degree: 'Graphic Design Faculty'
        },
        {
          years: '2023 — 2025',
          institution: 'Product Star Educational Platform',
          degree: 'UX/UI Designer Course'
        }
      ]
    },
    
    // Contacts Section
    contacts: {
      title: 'Contacts',
      nextTitle: "What's next?",
      nextSteps: [
        "I'll respond within 24 hours",
        "I'll ask a few questions",
        "I'll suggest format and timeline",
        'No obligations or pressure'
      ]
    },
    
    // Footer
    footer: {
      copyright: 'Mouse rights protected'
    },
    
    // Language
    language: {
      current: 'EN',
      switch: 'Переключить на русский'
    }
  }
};

export type Language = 'ru' | 'en';
export type Translations = typeof translations.ru;