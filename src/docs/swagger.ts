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
            },
            municipio: {
                type: "object",
                required: ["name"],
                properties: {
                    name: {
                        type: "string",
                    }
                }
            },
            path: {
                type: "object",
                required: ["name", "municipioId"],
                properties: {
                    name: {
                        type: "string",
                    },
                    municipioId: {
                        type: "number",
                    },
                    status: {
                        type: "number",
                        "enum": [ "active", "deleted"],
                    }
                }
            },
            truck: {
                type: "object",
                required: ["color", "model", "serial", "lts", "status"],
                properties: {
                    color: {
                        type: "string",
                    },
                    model: {
                        type: "string",
                    },
                    serial: {
                        type: "string"
                    },
                    lts: {
                        type: "number"
                    },
                    status: {
                        type: "string",
                        "enum": [ "avaible", "disabled", "working", "deleted"],
                    }
                }
            },
            dayStatus: {
                type: "object",
                required: ["status"],
                properties: {
                    status: {
                        type: "string",
                        "enum": [ "wait", "charging", "dispatching", "end"],
                    }
                }
            },
            dayEnd: {
                type: "object",
                required: ["status"],
                properties: {
                    dateEnd: {
                        type: "string",
                    }
                }
            },
            day: {
                type: "object",
                required: ["iddrive", "idtruck", "idpath", "iduser", "lts", "dateStart"],
                properties: {
                    iddrive: {
                        type: "number",
                    },
                    idtruck: {
                        type: "number",
                    },
                    idpath: {
                        type: "number"
                    },
                    iduser: {
                        type: "number"
                    },
                    lts: {
                        type: "string"
                    },
                    dateStart: {
                        type: "string"
                    }
                }
            },
            payment: {
                type: "object",
                required: ["type", "reference", "file", "amount"],
                properties: {
                    reference: {
                        type: "number"
                    },
                    file: {
                        type: "number"
                    },
                    amount: {
                        type: "number"
                    },
                    type: {
                        type: "string",
                        "enum": [ "cash", "transfer", "mobile"],
                    }
                }
            },
            paymentStatus: {
                type: "object",
                required: ["status"],
                properties: {
                    status: {
                        type: "string",
                        "enum": [ "wait", "paid", "reject", "aproved", "cancel"],
                    }
                }
            },
            // reportClients: {
            //     type: "object",
            //     properties: {
            //         id: {
            //             type: "number"
            //         },
            //         name: {
            //             type: "string"
            //         },
            //         lastName: {
            //             type: "string"
            //         },
            //         email: {
            //             type: "string"
            //         },
            //         dni: {
            //             type: "string"
            //         },
            //         phone: {
            //             type: "string"
            //         },
            //         device: {
            //             type: "string"
            //         },
            //         address: {
            //             type: "string"
            //         },
            //         type: {
            //             type: "string"
            //         },
            //         status: {
            //             type: "string"
            //         },
            //         total: {
            //             type: "number"
            //         },
            //         totalAmount: {
            //             type: "number"
            //         }
            //     }
            // },
        }
    },
}

const swaggerOption: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']
}

export default swaggerJSDoc(swaggerOption);