# 🎂 Birthday Surprise

Угадайте у кого сегодня день рождения?! — клик → фото → Шер.

Нарочито яркий и всратный одностраничник для **Cloudflare Pages**.

## Быстрый старт

1. Положите в `assets/` файлы `mystery.jpg`, `reveal.jpg`, `song.mp3` (см. `assets/README.md`).
2. Откройте `index.html` в браузере для проверки.

## GitHub

```bash
git init
git add .
git commit -m "Birthday surprise site"
gh repo create birthday-surprise --public --source=. --push
```

Или создайте репозиторий на [github.com/new](https://github.com/new) и:

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/birthday-surprise.git
git branch -M main
git push -u origin main
```

## Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Выберите репозиторий GitHub.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** (пусто)
   - **Build output directory:** `/`
4. Deploy.

Сайт будет на `https://ваш-проект.pages.dev`.

## Структура

```
birthday-surprise/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── mystery.jpg   ← вы добавляете
│   ├── reveal.jpg    ← вы добавляете
│   └── song.mp3      ← вы добавляете
└── README.md
```
