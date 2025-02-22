import { useModal } from '../../context/Modal';
import { CiCirclePlus } from "react-icons/ci";

function PlusButton({
  modalComponent, // component to render inside the modal
  // buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  setClass = null
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return < CiCirclePlus onClick={onClick} className={setClass}/>;
}

export default PlusButton;
