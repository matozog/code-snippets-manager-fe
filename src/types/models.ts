export interface ICodeSnippet {
  idSnippet?: string;
  name: string;
  description: string;
  content: string;
  isFavourite: boolean;
  programmingLanguage: string | null;
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
  programmingLanguage: null,
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
