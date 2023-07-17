export interface ICodeSnippet {
  id: string;
  name: string;
  description: string;
  content: string;
  isFavourite: boolean;
  programmingLanguage: string;
  type: string;
  addedFrom: string;
  addedDate: string;
  tags: Array<ITag>;
  img?: string;
}

export interface ITag {
  id: string;
  name: string;
  addedDate: string;
}
