import {body} from 'express-validator'

 export const loginValidation=[
    body('email', 'Incorrect Email format').isEmail(),
    body('password', 'The Password must be at least 5 symbols').isLength({min: 5}),
];

export const registerValidation=[
    body('email', 'Incorrect Email format').isEmail(),
    body('password', 'The Password must be at least 5 symbols').isLength({min: 5}),
    body('fullName', 'Please enter your Name').isLength({min: 3}),
    body('avatarUrl', 'Incorrect Image Url').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  ];


