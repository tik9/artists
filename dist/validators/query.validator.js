import { EmptyQueryException } from "../exceptions/empty-query.exceptions";
const validate = (str) => {
    if (!str) {
        throw new EmptyQueryException('Parameter required');
    }
};
export default validate;
