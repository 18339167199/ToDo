type Group = {
  id: number,
  name: string,
  type: number,
  icon: string,
  count: number,
  folderId: number | null
}

type Folder = {
  id: number,
  ownerId: number,
  name: string
}

type BG = {
  background: string,
  image: string,
}

type Sort = {
  label: string,
  value: string | number
}

type Task = {
  id: string,
  content: string,
  expire: string,
  done: boolean,
  star: boolean,
  step: [
    {
      seqNo: number,
      content: string,
      done: boolean,
    }
  ]
}

export {
  Group,
  Folder,
  BG,
  Sort,
  Task
}