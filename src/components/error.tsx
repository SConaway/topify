import { Modal, Text, useModal } from '@geist-ui/core';

function Error({
  error,
  title,
  retryAction,
}: {
  error: string;
  title: string;
  retryAction: () => void;
}) {
  const { bindings } = useModal(true);

  return (
    <Modal {...bindings} disableBackdropClick keyboard={false}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Subtitle>Something went wrong.</Modal.Subtitle>
      <Modal.Content>
        <Text>Please try again.</Text>
        <Text small>{error}</Text>
      </Modal.Content>
      <Modal.Action onClick={retryAction}>Try Again</Modal.Action>
    </Modal>
  );
}

export default Error;
