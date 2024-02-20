# Бэкенд Диплома Movies Explorer API
### *Учебный проект от [Яндекс.Практикум](https://practicum.yandex.ru/web/)*

## Описание проекта
Репозиторий для дипломной работы Movies Explorer, включающий бэкенд часть приложения.

## Функционал:
- Роуты для пользователей:
  - GET /users/me — возвращает информацию о пользователе;
  - PATCH /users/me — обновляет информацию о пользователе.

- Роуты для фильмов:
  - GET /movies — возвращает все фильмы из базы;
  - POST /movies — создаёт фильм с переданными в теле запроса country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU и nameEN;
  - DELETE /movies/:_id — удаляет фильм по _id.

## Стек технологий:
- JavaScript:
  - Промисы (Promise);
  - Асинхронность и оптимизация;
  - Rest API;
- Node.js;
- Express;
- MongoDB;
- Сelebrate;
- Winston.

## Установка и запуск проекта:
Клонировать репозиторий:

    git clone https://github.com/Dimitry364/movies-explorer-api.git

Установить зависимости:

    npm install

Запустить сервер:

    npm run start

Запустить сервер с hot-reload:

    npm run dev

# Ссылки:
- Backend: https://api.yarushkin.nomoredomainswork.ru/
