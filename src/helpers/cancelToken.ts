import { CancelTokenInterface } from "../interfaces/Utils"
import TokenList from "../stores/CancelTokenList"


export default function CancelToken() {
  const tokenList = new TokenList()

  const cancelToken: CancelTokenInterface = {
    id: tokenList.add(),
    token: tokenList.get(tokenList.add()),
    remove: (id) => tokenList.remove(id)
  }

  return cancelToken
}