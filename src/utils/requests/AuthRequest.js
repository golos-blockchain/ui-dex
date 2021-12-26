import Request from "./Request";

export class AuthRequest extends Request{
    type = "auth";

    generateKeys = ({name, priv}) => (
        this.request("generateKeys", name, priv, ['owner', 'active', 'posting', 'memo'])
    );

    login = ({name, activeKey}) => (
        this.asyncRequest("login", name, activeKey).then(keys => {
            let error = '';

            if (!keys.active) {
                error = 'Авторизоваться не удалось! Неверный пароль (Переданная строка не является ни posting-ключом, ни паролем.)';
            }

            if(error) throw new Error(error);

            return keys;
        })
    );
}