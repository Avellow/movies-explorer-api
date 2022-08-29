<h1 align="center"> Movie explorer. Backend </h1>

<p align="center" >Серверное приложение на Express. </p>


## Описание
Backend часть приложения 'Movies-Explorer'. Формирование ответов и отправка данных на клиентские запросы. Хранение информации в базе данных MongoBD о пользователях и их фильмах.

Приложение со следующими особенностями: 
 - Описание полей схем пользователей и фильмов
 - Роуты и контроллеры
 - Регистрация и авторизация пользователей
    - работа с персональным jwt
    - сохранение, проверка, редактирование и получение данных пользователя
 - Сохранение, поиск и отображение сохраненной коллекции фильмов 
 - Изменение профиля
 - Валидация данных
 - Логировани

### Link
[https://api.movies-expl.nomoredomains.work/](https://api.movies-expl.nomoredomains.work/)

### Запросы
Регистрация и авторизация
- регистраци `POST /signup` ответ - JSON { name, email }
- логин `POST /signin` ответ - JSON { token }

Пользовательская информация
- обновить `PATCH /users/me` ответ - JSON { name, email }
- получить `GET /users/me` ответ - JSON { name, email }

Фильмы
- получить сохраненные фильмы `GET /movies` ответ - JSON { movie[] }
- удалить `DELETE /movies/:id` ответ - JSON { deletedMovieProps }
- сохранить `POST /movies` ответ - JSON { movieProps }


## Технологический стек

- Node.js
- Express
- MongoBD
- Mongoose
- ESLint

Так же в проекте использованы следующие библиотеки:
- Joi
- Celebrate
- Validator
- body-parser
- bcryptjs

## Локальная установка проекта
Вам понадобится установить MongoDB: https://mongodb.prakticum-team.ru/docs/manual/tutorial/install-mongodb-on-ubuntu/

1) Выполните в локальном терминале команду `git clone https://github.com/Avellow/movies-explorer-api/`
2) Внутри клонированного проекта введите в терминале `npm install`
3) Для запуска проекта в режиме разработки введите `npm run dev`

* По-умолчанию приложение запустится на 3000 порту, измените в /app.js (15 строчка) порт, если потребуется. Если вы используете front-end часть приложения,
не забудьте изменить адрес обращения на бекенд и там.
* При обращении с front-end'а может быть CORS-ошибка. Чтобы её исправить, измените в /app.js код на 21 строчке:
`app.use(cors({ origin: true, credentials: true }));`
