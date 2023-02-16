import { EmptyQueryException } from "../exceptions/empty-query.exceptions"

const validate = (str?: any) => {
    if (!str) throw new EmptyQueryException('Parameter required')
}
export default validate