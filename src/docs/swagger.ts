import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";


const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.3",
    info: {
        title: "Documentación API-RES",
        description: "Api-res sistema de camiones",
        version: "0.0.1"
    },
    servers: [
        {
            url: "http://localhost:5000/api",
            description: 'url para desarrollo'
        },
        {
            url: "https://pruebasbackenddattatech.online/api",
            description: "url para desarrollo"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },
        schemas: {
            auth: {
                type: "object",
                required: ["user", "password"],
                properties: {
                    user: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                }
            },
            updatePassword: {
                type: "object",
                required: ["newPassword", "password"],
                properties: {
                    newPassword: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    }
                }
            },
            recoverPassword: {
                type: "object",
                required: ["email"],
                properties: {
                    email: {
                        type: "string"
                    },
                }
            },
            InputOwner: {
                type: "object",
                required: ["email", "password", "name", "confirmPass"],
                properties: {
                    name: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    },
                    confirmPass: {
                        type: "string"
                    }
                }
            },
            InputDrive: {
                type: "object",
                required: ["email", "password", "name", "confirmPass"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string"
                    },
                    dni: {
                        type: "string"
                    },
                    device: {
                        type: "string"
                    },
                    phone: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    },
                    confirmPass: {
                        type: "string"
                    }
                }
            },
            InputCustomer: {
                type: "object",
                required: ["email", "password", "name", "confirmPass", "dni", "phone", "address"],
                properties: {
                    name: {
                        type: "string",
                    },
                    email: {
                        type: "string"
                    },
                    dni: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    },
                    phone: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    },
                    confirmPass: {
                        type: "string"
                    }
                }
            }
        }
    },
}

const swaggerOption: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']
}

export default swaggerJSDoc(swaggerOption);