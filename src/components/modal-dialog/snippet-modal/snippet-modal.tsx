import { FC, PropsWithChildren, forwardRef } from 'react';

import { SnippetDialogContent } from './snippet-modal.jss';

const SnippetModal: FC<PropsWithChildren> = forwardRef(({ children }, ref) => {
  return <SnippetDialogContent ref={ref}>{children}</SnippetDialogContent>;
});

export default SnippetModal;
