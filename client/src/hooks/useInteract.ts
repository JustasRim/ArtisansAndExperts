export const useInteractions = () => {
  const registerInteraction = (onClickAction: () => void) => {
    const onClick = () => {
      onClickAction();
    };

    const onKeyDown = (event: any) => {
      if (event.key === 'Enter') {
        onClickAction();
      }
    };

    return { onClick, onKeyDown };
  };

  return { registerInteraction };
};
