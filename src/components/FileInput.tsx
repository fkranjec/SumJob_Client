import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Code, Icon } from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useController } from "react-hook-form";
import { useRef } from "react";

const FileUpload = ({ name, placeholder, acceptedFileTypes, control, children, isRequired = false }) => {
    const inputRef = useRef();
    const {
        field: { ref, value, ...inputProps },
        formState,
    } = useController({
        name,
        control,
        rules: { required: isRequired },
    });

    return (
        <FormControl isInvalid={!formState.isValid} isRequired>
            <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={FiFile} />}
                />
                <Input type='file' accept={acceptedFileTypes} name={name} ref={inputRef} {...inputProps} style={{ display: 'none' }}></Input>
                <Input
                    placeholder={placeholder || "Your file ..."}
                    onClick={() => inputRef.current ? inputRef.current["click"] : undefined}
                    value={value}
                />
            </InputGroup>
            <FormErrorMessage>
                {formState.isValid}
            </FormErrorMessage>
        </FormControl>
    );
}

export default FileUpload;