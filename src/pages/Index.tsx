import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/5d86bdf0-caa1-415e-848e-18fef434f4ad/files/1e834251-c036-4cf5-8563-ba699058664c.jpg";

const CATEGORIES = [
  {
    id: 1,
    icon: "Layers",
    title: "Элеваторное оборудование",
    desc: "Нории, транспортёры, зерноочистительные машины, сепараторы",
    count: "120+ позиций",
    specs: ["Производительность: до 500 т/ч", "Высота подъёма: до 60 м", "Температурный режим: -40°C до +60°C"],
  },
  {
    id: 2,
    icon: "Settings",
    title: "Запчасти для с/х техники",
    desc: "Детали для комбайнов, тракторов, плугов и посевных комплексов",
    count: "800+ позиций",
    specs: ["Совместимость: John Deere, Claas, Case, New Holland", "Аналоги и оригинал", "Гарантия 12 месяцев"],
  },
  {
    id: 3,
    icon: "Zap",
    title: "Приводное оборудование",
    desc: "Редукторы, муфты, приводные ремни, звёздочки и цепи",
    count: "350+ позиций",
    specs: ["Мощность: 0.5 - 500 кВт", "Передаточные числа: 1.25 - 450", "Исполнение: IP44, IP55, IP65"],
  },
  {
    id: 4,
    icon: "Circle",
    title: "Подшипники",
    desc: "Шариковые, роликовые, сферические, конические подшипники",
    count: "2000+ позиций",
    specs: ["Бренды: SKF, FAG, NSK, SNR, NTN", "Диаметры от 10 до 1000 мм", "Корпусные и специальные"],
  },
  {
    id: 5,
    icon: "Cpu",
    title: "Электрооборудование",
    desc: "Электродвигатели, частотные преобразователи, автоматизация",
    count: "280+ позиций",
    specs: ["Напряжение: 220В / 380В / 660В", "IP54, IP55, IP56 защита", "Взрывозащищённые исполнения"],
  },
  {
    id: 6,
    icon: "Wrench",
    title: "Комплектующие",
    desc: "Крепёж, уплотнения, фильтры, манжеты, прокладки",
    count: "1500+ позиций",
    specs: ["Материалы: сталь, нержавейка, латунь", "Резьбы: метрическая, дюймовая", "Сертификаты качества"],
  },
];

const STATS = [
  { value: "15", unit: " лет", label: "на рынке" },
  { value: "5000+", unit: "", label: "позиций в наличии" },
  { value: "800+", unit: "", label: "клиентов по России" },
  { value: "24ч", unit: "", label: "среднее время доставки" },
];

const DELIVERY_ITEMS = [
  {
    icon: "Truck",
    title: "Транспортные компании",
    desc: "Доставка через СДЭК, Деловые Линии, ПЭК и другие ТК. Расчёт стоимости по тарифам перевозчика.",
  },
  {
    icon: "Package",
    title: "Самовывоз",
    desc: "Со склада в Краснодаре. Адрес и режим работы склада уточняйте у менеджера.",
  },
  {
    icon: "Clock",
    title: "Сроки отгрузки",
    desc: "Позиции в наличии — отгрузка в день заказа до 15:00. Позиции под заказ — от 3 рабочих дней.",
  },
  {
    icon: "Shield",
    title: "Гарантия на доставку",
    desc: "Все отправления застрахованы. Бережная упаковка и контроль качества перед отправкой.",
  },
];

const SECTIONS = ["Каталог", "О компании", "Доставка", "Контакты"];
type ActiveSection = "catalog" | "about" | "delivery" | "contacts";
const sectionKeys: ActiveSection[] = ["catalog", "about", "delivery", "contacts"];

export default function Index() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("catalog");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (section: ActiveSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <Icon name="Wheat" size={16} className="text-primary-foreground" />
              </div>
              <div>
                <div className="font-oswald text-lg font-bold tracking-wider text-foreground leading-none">
                  СЕЛЬХОЗМАРКЕТ
                </div>
                <div className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase leading-none mt-0.5">
                  агро-индустриальное оборудование
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {SECTIONS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => scrollTo(sectionKeys[i])}
                  className={`px-4 py-2 font-oswald text-sm tracking-wider uppercase transition-all ${
                    activeSection === sectionKeys[i]
                      ? "text-primary border-b border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="tel:+78001234567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Phone" size={14} />
                <span className="font-mono">8 800 123-45-67</span>
              </a>
              <button
                onClick={() => scrollTo("contacts")}
                className="px-4 py-2 bg-primary text-primary-foreground font-oswald text-sm tracking-wider uppercase hover:bg-amber-500 transition-colors"
              >
                Запрос КП
              </button>
            </div>

            <button
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            {SECTIONS.map((label, i) => (
              <button
                key={label}
                onClick={() => scrollTo(sectionKeys[i])}
                className="w-full text-left px-6 py-3 font-oswald text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground hover:bg-card border-b border-border/50 last:border-0"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-[85vh] min-h-[600px]">
          <img
            src={HERO_IMAGE}
            alt="Элеваторное оборудование"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/40 bg-primary/10 mb-6 animate-fade-in">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-primary tracking-widest uppercase">
                    Профессиональное оборудование для АПК
                  </span>
                </div>

                <h1 className="font-oswald text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4">
                  <span className="text-foreground">ЭЛЕВАТОРНОЕ</span>
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ОБОРУДОВАНИЕ
                  </span>
                  <br />
                  <span className="text-foreground text-4xl sm:text-5xl md:text-6xl">И ЗАПЧАСТИ</span>
                </h1>

                <p className="font-ibm text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                  Поставки оборудования для элеваторов, зернохранилищ и АПК.
                  Подшипники, электрооборудование, приводы и комплектующие — более 5000 позиций со склада.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => scrollTo("catalog")}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-oswald tracking-wider uppercase hover:bg-amber-500 transition-all hover:-translate-y-0.5 text-sm"
                  >
                    <Icon name="Search" size={16} />
                    Перейти в каталог
                  </button>
                  <button
                    onClick={() => scrollTo("contacts")}
                    className="flex items-center gap-2 px-6 py-3 border border-border text-foreground font-oswald tracking-wider uppercase hover:border-primary/60 transition-all hover:-translate-y-0.5 text-sm"
                  >
                    <Icon name="MessageSquare" size={16} />
                    Запросить КП
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {STATS.map((stat) => (
                <div key={stat.label} className="px-6 py-5 text-center">
                  <div className="font-oswald text-3xl font-bold text-primary leading-none">
                    {stat.value}<span className="text-lg">{stat.unit}</span>
                  </div>
                  <div className="font-ibm text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section
        id="catalog"
        className="py-20"
        style={{
          backgroundImage: "linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="font-mono text-xs text-primary tracking-widest uppercase">Ассортимент</span>
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold text-foreground uppercase">
              Каталог<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                оборудования
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-6">
            <button className="px-4 py-1.5 bg-primary text-primary-foreground font-mono text-xs tracking-wider uppercase">
              Все категории
            </button>
            {["В наличии", "Под заказ", "Новинки"].map((f) => (
              <button key={f} className="px-4 py-1.5 border border-border text-muted-foreground font-mono text-xs tracking-wider uppercase hover:border-primary/60 hover:text-foreground transition-colors">
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                className="border border-border bg-card cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
                style={{
                  boxShadow: activeCategory === cat.id ? "0 0 0 1px hsl(43 96% 56% / 0.3), 0 8px 32px rgba(0,0,0,0.3)" : undefined,
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 border border-primary/30 bg-primary/10 flex items-center justify-center">
                      <Icon name={cat.icon} size={20} className="text-primary" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-0.5">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="font-oswald text-lg font-semibold text-foreground uppercase tracking-wide mb-2">
                    {cat.title}
                  </h3>
                  <p className="font-ibm text-sm text-muted-foreground leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  {activeCategory === cat.id && (
                    <div className="border-t border-border pt-4 mt-4">
                      <div className="font-mono text-xs text-primary uppercase tracking-wider mb-3">
                        Технические параметры:
                      </div>
                      <ul className="space-y-2">
                        {cat.specs.map((spec, si) => (
                          <li key={si} className="flex items-start gap-2 text-xs font-ibm text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-primary font-mono text-xs mt-4">
                    <span>{activeCategory === cat.id ? "Скрыть" : "Подробнее"}</span>
                    <Icon name={activeCategory === cat.id ? "ChevronUp" : "ChevronDown"} size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-oswald text-lg font-bold text-foreground uppercase">Не нашли нужную позицию?</div>
              <div className="font-ibm text-sm text-muted-foreground mt-0.5">
                Отправьте запрос — подберём аналог или организуем поставку под заказ
              </div>
            </div>
            <button
              onClick={() => scrollTo("contacts")}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-oswald tracking-wider uppercase hover:bg-amber-500 transition-all text-sm"
            >
              <Icon name="Send" size={14} />
              Отправить запрос
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-primary" />
                <span className="font-mono text-xs text-primary tracking-widest uppercase">О нас</span>
              </div>
              <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase mb-6">
                Сельхозмаркет —<br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ваш надёжный
                </span><br />
                партнёр в АПК
              </h2>
              <div className="space-y-4 font-ibm text-muted-foreground leading-relaxed">
                <p>
                  Компания Сельхозмаркет работает на рынке поставок сельскохозяйственного и элеваторного
                  оборудования с 2009 года. За это время мы выстроили прямые отношения с ведущими
                  производителями и дистрибьюторами.
                </p>
                <p>
                  Наши клиенты — элеваторы, агрохолдинги, фермерские хозяйства и ремонтные предприятия
                  по всей России и СНГ. Мы понимаем специфику сезонных пиков и критичность сроков поставки.
                </p>
                <p>
                  Технические специалисты компании помогут подобрать оптимальное оборудование,
                  найти аналог или разработать техническое задание для нестандартной задачи.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Award", title: "Сертифицированные поставки", desc: "Работаем только с проверенными производителями. Документы на все позиции." },
                { icon: "Users", title: "Технические консультации", desc: "Инженеры с опытом подбора оборудования для элеваторов и АПК." },
                { icon: "BarChart2", title: "Склад в наличии", desc: "Более 5000 позиций на складе в Краснодаре для оперативной отгрузки." },
                { icon: "RefreshCw", title: "Гарантия и возврат", desc: "12 месяцев гарантии. Обмен и возврат брака в течение 30 дней." },
              ].map((item) => (
                <div key={item.title} className="border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40">
                  <div className="w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                    <Icon name={item.icon} size={16} className="text-primary" />
                  </div>
                  <h4 className="font-oswald text-sm font-semibold uppercase text-foreground mb-1 leading-tight">
                    {item.title}
                  </h4>
                  <p className="font-ibm text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section
        id="delivery"
        className="py-20 border-t border-border"
        style={{
          backgroundImage: "linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="font-mono text-xs text-primary tracking-widest uppercase">Логистика</span>
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase">
              Доставка<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                по России и СНГ
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {DELIVERY_ITEMS.map((item) => (
              <div key={item.title} className="border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40">
                <div className="w-10 h-10 border border-primary/30 bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-oswald text-sm font-semibold uppercase text-foreground mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="font-ibm text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="border border-border bg-card overflow-hidden">
            <div className="border-b border-border px-6 py-4 flex items-center gap-2">
              <Icon name="Table" size={14} className="text-primary" />
              <span className="font-oswald text-sm font-semibold uppercase tracking-wider">Условия доставки</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    {["Способ", "Регион", "Сроки", "Стоимость"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["ТК СДЭК", "По России", "2–7 дней", "По тарифу ТК"],
                    ["Деловые Линии", "По России", "3–10 дней", "По тарифу ТК"],
                    ["ПЭК", "По России и СНГ", "5–14 дней", "По тарифу ТК"],
                    ["Самовывоз", "Краснодар", "В день заказа", "Бесплатно"],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-secondary/20 transition-colors">
                      {row.map((cell, j) => (
                        <td key={j} className={`px-6 py-4 font-ibm text-sm ${j === 3 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="font-mono text-xs text-primary tracking-widest uppercase">Связь</span>
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase">
              Отдел продаж<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                и поддержки
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              {[
                { icon: "Phone", label: "Отдел продаж", value: "+7 (800) 123-45-67", sub: "Бесплатно по России" },
                { icon: "Wrench", label: "Техподдержка", value: "+7 (861) 234-56-78", sub: "Пн–Пт 8:00–18:00" },
                { icon: "Mail", label: "Email", value: "sales@selkhozmarket.ru", sub: "Ответ в течение 2 часов" },
                { icon: "MapPin", label: "Склад и офис", value: "г. Краснодар, ул. Промышленная, 15", sub: "Пн–Пт 8:00–18:00, Сб 9:00–15:00" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 border border-border bg-background p-4">
                  <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
                    <div className="font-oswald text-base font-semibold text-foreground mt-0.5">{item.value}</div>
                    <div className="font-ibm text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-border bg-background p-8">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="font-oswald text-sm font-semibold uppercase tracking-wider">Запрос коммерческого предложения</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Организация
                  </label>
                  <input
                    type="text"
                    placeholder="ООО «Агрохолдинг»"
                    className="w-full bg-card border border-border px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Контактное лицо
                  </label>
                  <input
                    type="text"
                    placeholder="Иванов Иван Иванович"
                    className="w-full bg-card border border-border px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-card border border-border px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@company.ru"
                      className="w-full bg-card border border-border px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1.5">
                    Что нужно найти
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Опишите необходимое оборудование, укажите количество и технические параметры..."
                    className="w-full bg-card border border-border px-4 py-3 font-ibm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                  />
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-oswald tracking-widest uppercase hover:bg-amber-500 transition-all text-sm">
                  <Icon name="Send" size={14} />
                  Отправить запрос
                </button>
                <p className="font-mono text-[10px] text-muted-foreground text-center">
                  Ответим в течение 2 рабочих часов
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary flex items-center justify-center">
                <Icon name="Wheat" size={12} className="text-primary-foreground" />
              </div>
              <span className="font-oswald text-sm font-bold tracking-widest uppercase text-muted-foreground">
                Сельхозмаркет
              </span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              © 2024 Сельхозмаркет. Все права защищены.
            </div>
            <div className="flex items-center gap-4">
              {["Каталог", "Доставка", "Контакты"].map((link, i) => (
                <button
                  key={link}
                  onClick={() => scrollTo(["catalog", "delivery", "contacts"][i] as ActiveSection)}
                  className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}