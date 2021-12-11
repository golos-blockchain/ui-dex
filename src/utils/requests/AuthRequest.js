import Request from "./Request";

export class AuthRequest extends Request{
    type = "auth";

    generateKeys = ({name, priv}) => (
        this.request("generateKeys", name, priv, ['owner', 'active', 'posting', 'memo'])
    );

    login = ({name, priv}) => (
        this.asyncRequest("login", name, priv).then(keys => {
            let error = '';

            if (keys.active && !keys.password) {
                error = 'Авторизоваться не удалось! Не рекомендуется авторизовать пользователей на сайте с active ключом. Active-ключ следует вводить только непосредственно перед вызовом операций, для отправки которых он требуется, а не хранить его как сессию авторизации.';
            } else if (!keys.posting) {
                error = 'Авторизоваться не удалось! Неверный пароль (Переданная строка не является ни posting-ключом, ни паролем.)';
            }

            if(error) throw new Error(error);

            return keys;
        })
    );
}