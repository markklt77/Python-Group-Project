import { useModal } from '../../../context/Modal';
import { HiDotsHorizontal } from "react-icons/hi";


function DeleteSong({
    modalComponent, // component to render inside the modal
    // buttonText, // text of the button that opens the modal
    onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onButtonClick === "function") onButtonClick();
    };

    return < HiDotsHorizontal onClick={onClick} />;
}

export default DeleteSong;
