import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'
import { useEffect } from 'react';
  function DebateFinishModal({handleCloseDebate}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(()=>{
        onOpen()
    },[])

    const handleOnClose=async()=>{
       await handleCloseDebate();
        onClose()
    }

    return (
      <>
       
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={"red"} letterSpacing={"1px"}>DEBATE COMPLETED !!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>   
                Debate has been completed . Hope everyone liked it .
            </ModalBody>
  
            <ModalFooter>
       
              <Button variant='ghost' onClick={handleOnClose}>Go Back !!</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default DebateFinishModal