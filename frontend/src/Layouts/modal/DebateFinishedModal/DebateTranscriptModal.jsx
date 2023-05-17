import {
    Modal,
    ModalOverlay,
    ModalContent,

    ModalBody,
    ModalCloseButton,

    useDisclosure,
    ModalHeader,
    Button,
  } from '@chakra-ui/react'
  import {RxSpeakerLoud} from "react-icons/rx"
  import styles from "./DebateFinishModal.module.css"
import { AiOutlineCloudDownload } from 'react-icons/ai';

  function DebateTranscriptModal({ children  }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const handleOnClose=async()=>{
        onClose()
    }

    return (
      <>
      <span onClick={onOpen}>{children}</span>
        <Modal isOpen={isOpen}   onClose={onClose}>

          <ModalOverlay />
          <ModalContent  className={styles.finishModalContainer}>
            <ModalCloseButton />
            <ModalHeader display={"flex"} gap={"10px"}>

            <Button className={styles.speakButton}>
              <RxSpeakerLoud/>
              <p>


              Speak it
              </p>
            </Button>
            <Button className={styles.downloadButton}>
              <AiOutlineCloudDownload/>
              <p>

              Download 
              </p>
            </Button>

            </ModalHeader>
            <ModalBody P={"0px"} >   

            <div className={styles.transcript_content} >
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos enim similique nobis placeat! Impedit consequatur doloremque ipsum facere voluptatibus ipsam dolor deserunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus expedita nisi soluta veritatis provident, deserunt hic inventore quibusdam debitis, amet minima, aliquid ipsam iusto? Quisquam quis doloremque quasi maxime accusamus voluptatum, voluptates illo temporibus, placeat eius asperiores. Delectus quasi facere nostrum! Eum, quis vel laborum odit nemo quae, numquam quam, nesciunt nisi dolor ratione odio.</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos enim similique nobis placeat! Impedit consequatur doloremque ipsum facere voluptatibus ipsam dolor deserunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus expedita nisi soluta veritatis provident, deserunt hic inventore quibusdam debitis, amet minima, aliquid ipsam iusto? Quisquam quis doloremque quasi maxime accusamus voluptatum, voluptates illo temporibus, placeat eius asperiores. Delectus quasi facere nostrum! Eum, quis vel laborum odit nemo quae, numquam quam, nesciunt nisi dolor ratione odio.</p>
      <br />
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos enim similique nobis placeat! Impedit consequatur doloremque ipsum facere voluptatibus ipsam dolor deserunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus expedita nisi soluta veritatis provident, deserunt hic inventore quibusdam debitis, amet minima, aliquid ipsam iusto? Quisquam quis doloremque quasi maxime accusamus voluptatum, voluptates illo temporibus, placeat eius asperiores. Delectus quasi facere nostrum! Eum, quis vel laborum odit nemo quae, numquam quam, nesciunt nisi dolor ratione odio.</p>
            </div>
          
            </ModalBody>
  
       
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default DebateTranscriptModal