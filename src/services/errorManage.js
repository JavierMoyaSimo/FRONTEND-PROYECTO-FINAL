export const errorCheck = (value, type) => {
    switch (type) {
        case "text":
            if (!/[a-z]/gi.test(value)) {
                return "*Formato no válido, por favor use caracteres";
            } else {
                return "";
            }

        case "email":
            if (
                !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                )
            ) {
                return "Formato incorrecto de email.";
            } else {
                return "";
            }

        case "phone":
            if (!/(?=.*?[0-9])/.test(value)) {
                return "Formato incorrecto, solo números";
            } else {
                return "";
            }

        case "password":
        case "password2":
            if (value.length < 8) {
                return "Escribe al menos 8 caracteres";
            } else {
                //Checking the password format....

                if (!/[\d()+-]/g.test(value)) {
                    return "*Escribe al menos un número, una letra minúscula y una letra mayúscula.";
                } else {
                    return "";
                }
            }
        case "dni":
            if (
                !/^[0-9]{8,8}[A-Za-z]$/gi.test(
                    value
                ) /*&& /["!@#$%^&*()+=-\\\';,./{}|\":<>?]/gi.test(value)*/
            ) {
                return "*Por favor, introduzca su número y letra del DNI";
            } else {
                return "";
            }

        default:
            console.log("Algunos errores no se han tenido en cuenta");

            break;
    }
};
