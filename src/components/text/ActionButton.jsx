const ActionButton = ({
  name,
  customFunction,
  disabled,
  dataNosound,
  style,
  label,buttonRef,onBlur
}) =>  {

  return (
    <>
      <button
        data-nosound={dataNosound || false}
        key={name}
        ref={buttonRef}
      onClick={customFunction}
      onBlur={onBlur}
        disabled={disabled}
        style={style}
      >
        {label || name}
      </button>
    </>
  );
}

export default ActionButton;
