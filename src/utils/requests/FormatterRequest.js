import Request from "./Request";

export class FormatterRequest extends Request{
    type = "formatter";

    generatePassword = () => (
        this.request("createSuggestedPassword")
    );
}