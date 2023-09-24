import { QuestionBody, QuestionFooter, QuestionModalContainer } from './question-modal.jss';

import CustomDivider from 'src/components/custom-divider/custom-divider';
import { FC } from 'react';
import MuiButton from 'src/components/buttons/button';

interface IQuestionModalProps {
  content: string;
  onClickCancel: () => void;
  onClickOk: () => void;
}

const QuestionModal: FC<IQuestionModalProps> = ({ content, onClickCancel, onClickOk }) => {
  return (
    <QuestionModalContainer>
      <QuestionBody>{content}</QuestionBody>
      <CustomDivider />
      <QuestionFooter>
        <MuiButton text="Ok" onClick={onClickOk} variant="contained" />
        <MuiButton text="Cancel" onClick={onClickCancel} variant="outlined" />
      </QuestionFooter>
    </QuestionModalContainer>
  );
};

export default QuestionModal;
