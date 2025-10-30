import Rate from "../../rate/Rate";

function Options({ writeSpeed, setWriteSpeed }) {
  return (
    <>
      <Rate writeSpeed={writeSpeed} setWriteSpeed={setWriteSpeed} />
    </>
  );
}

export default Options;
