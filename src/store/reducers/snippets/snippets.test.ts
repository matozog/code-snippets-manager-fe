import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { ICodeSnippet, defaultCodeSnippet } from 'src/types/models';
import { addNewSnippet, removeSnippet, toRequestBody, updateSnippet } from './snippets.thunks';

import { createAppStore } from 'src/store/config/store';
import { requestAxios } from 'src/store/services/http.service';

const snippet = (idSnippet: number, name: string): ICodeSnippet => ({ ...defaultCodeSnippet, idSnippet, name });

const response = <T>(data: T) => ({ data, status: 200 }) as AxiosResponse<T>;

const badRequest = (data: unknown) =>
  new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, undefined, {
    data,
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: { headers: new AxiosHeaders() },
  } as AxiosResponse);

const storeWithSnippets = (snippets: ICodeSnippet[]) =>
  createAppStore({
    snippetsData: { isLoading: false, snippets, snippet: defaultCodeSnippet, error: null },
  });

afterEach(() => {
  vi.restoreAllMocks();
});

describe('snippets thunks', () => {
  test('update replaces only the edited snippet and notifies the user', async () => {
    vi.spyOn(requestAxios, 'put').mockResolvedValue(response(snippet(2, 'second edited')));
    const store = storeWithSnippets([snippet(1, 'first'), snippet(2, 'second'), snippet(3, 'third')]);

    await store.dispatch(updateSnippet({ id: 2, snippet: snippet(2, 'second edited') }));

    const { snippetsData, common } = store.getState();
    expect(snippetsData.isLoading).toBe(false);
    expect(snippetsData.snippets.map((s) => s.name)).toEqual(['first', 'second edited', 'third']);
    expect(common.notifyProps).toEqual({ isOpen: true, type: 'success', message: 'Updated snippet!' });
  });

  test('add sends the request body without client-side ids and dates', async () => {
    const post = vi.spyOn(requestAxios, 'post').mockResolvedValue(response(snippet(7, 'new')));
    const store = storeWithSnippets([]);

    await store.dispatch(addNewSnippet({ ...snippet(123, 'new'), tags: [{ idTag: 5, name: 'js' }] }));

    expect(post.mock.calls[0][1]).toEqual(expect.objectContaining({ idSnippet: undefined, tags: [{ name: 'js' }] }));
    expect(store.getState().snippetsData.snippets).toEqual([snippet(7, 'new')]);
  });

  test('a failed request keeps the list and shows the error from the API', async () => {
    vi.spyOn(requestAxios, 'delete').mockRejectedValue(badRequest({ detail: 'Snippet 1 not found.' }));
    const store = storeWithSnippets([snippet(1, 'first')]);

    const result = await store.dispatch(removeSnippet(1));

    expect(removeSnippet.rejected.match(result)).toBe(true);
    const { snippetsData, common } = store.getState();
    expect(snippetsData.snippets).toHaveLength(1);
    expect(snippetsData.isLoading).toBe(false);
    expect(snippetsData.error).toBe('Snippet 1 not found.');
    expect(common.notifyProps).toEqual({ isOpen: true, type: 'error', message: 'Snippet 1 not found.' });
  });
});

describe('toRequestBody', () => {
  test('drops client-side id, dates and tag metadata', () => {
    const body = toRequestBody({
      ...snippet(1760980000000, 'debounce'),
      addedDate: '2026-10-20T10:00:00Z',
      tags: [{ idTag: 5, name: 'js', addedDate: '2026-10-20T10:00:00Z' }],
    });

    expect(JSON.parse(JSON.stringify(body))).toEqual({
      ...defaultCodeSnippet,
      name: 'debounce',
      tags: [{ name: 'js' }],
    });
  });
});
