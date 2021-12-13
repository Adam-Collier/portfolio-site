import { useState, useEffect } from 'react';
import { styled } from 'goober';
import Text from '../Text';
import Stack from '../Stack';
import { X } from 'react-feather';
import { queries } from '../../config';

const Divider = styled('div')`
  width: 100%;
  border-bottom: 1px dashed var(--foreground-low);
`;

const Wrapper = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.75);
  z-index: 12;
`;

const Overlay = styled('div')`
  width: 100%;
  height: 100%;
`;

const Content = styled(Stack)`
  padding: 1rem 1.5rem 1.5rem;
  background: var(--foreground-min);
  border-radius: var(--border-radius);
  max-width: var(--width-sm);
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
  color: var(--primary-foreground);

  @media ${queries.sm} {
    transform: translateY(0);
    top: 64px;
    left: 0;
    padding: 1rem;
  }
`;

const CloseIcon = styled(X)`
  cursor: pointer;
`;

const Trigger = ({onClick, children}) => {
    return <div onClick={onClick}>{children}</div>
}

const Dialog = ({ headerText, trigger, children }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      setShowDialog(false);
    }
  };

  useEffect(() => {
    if (showDialog === true) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDialog]);

  return (
    <div>
      <div onClick={() => setShowDialog(true)}>{trigger}</div>
      {showDialog && (
        <Wrapper>
          <Overlay onClick={() => setShowDialog(false)} />
          <Content gap={0.375}>
            <Stack direction="row" justify="space-between" align="center">
              <Text size="md" weight={550}>
                {headerText}
              </Text>
              <CloseIcon
                size={18}
                onClick={() => setShowDialog(false)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    setShowDialog(false);
                  }
                }}
                tabIndex={0}
              />
            </Stack>
            <Divider />
            {children}
          </Content>
        </Wrapper>
      )}
    </div>
  );
};

Dialog.Trigger = Trigger;

export default Dialog;
