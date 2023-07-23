export interface ICodeSnippet {
  id?: string;
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

export const defaultCodeSnippet: ICodeSnippet = {
  name: '',
  description: '',
  content: '',
  isFavourite: false,
  programmingLanguage: '',
  type: '',
  addedFrom: '',
  addedDate: '',
  tags: [],
};

export interface ITag {
  id?: string;
  name: string;
  addedDate?: string;
}
