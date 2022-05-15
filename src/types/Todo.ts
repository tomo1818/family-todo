import { Timestamp } from "firebase/firestore"

export type Todo = {
  id: string
  name: string
  date: Timestamp
  memo: string
  isComplete: boolean
}
