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

export {
  Group,
  Folder
}