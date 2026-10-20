import { FC, PropsWithChildren, Ref } from 'react';

import { SnippetDialogContent } from './snippet-modal.jss';

interface ISnippetModalProps extends PropsWithChildren {
  ref?: Ref<HTMLDivElement>;
}

const SnippetModal: FC<ISnippetModalProps> = ({ children, ref }) => {
  return <SnippetDialogContent ref={ref}>{children}</SnippetDialogContent>;
};

export default SnippetModal;
