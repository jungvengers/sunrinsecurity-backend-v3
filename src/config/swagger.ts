const swaggerDefinition = {
    info: {
        title: 'TS-EXPRESS-MONGOOSE-USER-BOILERPLATE',
        version: '1.0.0',
        description: 'Backend REST API server',
        contact: {
            name: "YeonGyu Kim",
            email: "code.yeon.gyu@gmail.com",
        },
    },
    securityDefinitions: {
        oAuth: {
            type: 'oauth2',
            authorizationUrl: "/user/auth/token"
        }
    },
    basePath: '/'
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']
};

export default options
